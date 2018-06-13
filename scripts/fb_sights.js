//ссылка на базу данных
    var db = firebase.database();
    function getQueryVariable(variable) //get a variable from url
    {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            if(pair[0] == variable){return pair[1];}
        }
        return(false);
    }
		
             
    //получим нужный нам список в бд (по его ключу)
    var listRef = db.ref('sights/sight'+getQueryVariable("p"));
   

   //добавление элемента в отображение
    function addItem(item) {
		var pictures = item.val().images;
		var arr = pictures.split(' ');
		var imgStr ="";
		for (let i in arr){
			imgStr += '<li><img src="images/'+arr[i]+'" alt="'+item.val().name+'" /></li>';
		}
		console.log(imgStr);
		
        //cоздадим новый элемент списка с данными из аргумента (каждый item состоит из ключа и значения)
		var newItem = '<div class="top"><h1 class="sightName">'+item.val().name+'</h1><div id="together"><div id="carousel" class="carousel"><button class="arrow prev">⇦</button><div class="gallery"><ul class="images">'+imgStr+'</ul></div><button class="arrow next">⇨</button></div><div class="adress">'+item.val().short_info+'</div></div><div class="info">'+item.val().general_info+'</div><div class="exhibition">'+item.val().exhibition+'</div></div>';
        //добавление элемента списка в список
        document.querySelector('.container').innerHTML = newItem;
		slider();
    }
	
	
    //изменение отображения элемента 
    function changeItem(item) {
        //получили измененный элемент
        var element = document.querySelector('#list li[name="'+item.key+'"]');
        //удалили его предыдущее отображение
        element.parentElement.removeChild(element);
        //добавили заново
        addItem(item);
    }
    
	//добавление "слушателей" событий
    //если в бд что-то добавили
    listRef.on('value', function (data) {
        addItem(data);
    });
 
	function slider(){
		var lis = document.getElementsByTagName('li');
		for (var i = 0; i < lis.length; i++) {
			lis[i].style.position = 'relative';
			var span = document.createElement('span');
			// обычно лучше использовать CSS-классы,
			// но этот код - для удобства разработки, так что не будем трогать стили
			span.style.cssText = 'position:absolute;left:0;top:0';
			span.innerHTML = i + 1;
			lis[i].appendChild(span);
		}
		/* конфигурация */
		var width = 600; // ширина изображения
		var count = 1; // количество изображений

		var carousel = document.getElementById('carousel');
		var list = carousel.querySelector('ul');
		//var list = carousel.querySelector(".images");
		var listElems = carousel.querySelectorAll('li');

		var position = 0; // текущий сдвиг влево

		carousel.querySelector('.prev').onclick = function() {
		  // сдвиг влево
		  // последнее передвижение влево может быть не на 3, а на 2 или 1 элемент
		  position = Math.min(position + width * count, 0)
		  list.style.marginLeft = position + 'px';
		};

		carousel.querySelector('.next').onclick = function() {
		  // сдвиг вправо
		  // последнее передвижение вправо может быть не на 3, а на 2 или 1 элемент
		  position = Math.max(position - width * count, -width * (listElems.length - count));
		  list.style.marginLeft = position + 'px';
		};
	}