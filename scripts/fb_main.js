//ссылка на базу данных
    var db = firebase.database();
  
    //получим нужный нам список в бд (по его ключу)
    var listRef = db.ref('main');
   

   //добавление элемента в отображение
    function addItem(item) {
	
        //cоздадим новый элемент списка с данными из аргумента (каждый item состоит из ключа и значения)
        var newItem = '<div class="general_facts"><h2 class="name">'+item.val().name+' </h2><p>'+item.val().text+' </p></div>';
        //добавление элемента списка в список
        document.querySelector('.info').innerHTML += newItem;
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
    listRef.on('child_added', function (data) {
        addItem(data);
    });
    //если в бд что-то изменили
    listRef.on('child_changed', function(data) {
        changeItem(data);
    });
