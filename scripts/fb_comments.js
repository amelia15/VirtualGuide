//ссылка на базу данных
    var db = firebase.database();
	
	var listRef = db.ref('ways/way1/comments');
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
	//var id = getUrlVars()["id"];
	const page = {
	 createOptions: function(item){
		var wayJson =  getQueryVariable('way');
		console.log(wayJson);
		for (let i in item){
            //this.post.innerHTML+= `{item[i].name}`;
			if (item[i].json == wayJson) {
				listRef = db.ref('ways/'+ i+'/comments');
				console.log(i);
				break;
			}
        }
	}
	};
	db.ref('ways').on('value', function(data) {
		page.createOptions(data.val());
		listRef.on('child_added', function (data) {
        addItem(data);
    });
	})
    //получим нужный нам список в бд (по его ключу) - получить нужный путь из бд по json
  //  var listRef = db.ref('ways/'+ x);
	//if 
   //page.createOptions();

   //добавление элемента в отображение
    function addItem(item) {
	
        //cоздадим новый элемент списка с данными из аргумента (каждый item состоит из ключа и значения)
        var newItem = '<div 1class="comBlok"><h1>'+item.val().name+'</h1><p>'+item.val().text+' </p></div>';
        //добавление элемента списка в список
        document.querySelector('.com_field').innerHTML += newItem;
    }
	
	//добавление "слушателей" событий
    //если в бд что-то добавили
    /*listRef.on('child_added', function (data) {
        addItem(data);
    });
    //если в бд что-то изменили
    listRef.on('child_changed', function(data) {
        changeItem(data);
    });*/
	
	document.getElementById('comment').onclick = function(){
	 var newComment = listRef.push();
	 newComment.set({
		name: document.getElementById("author").value,
		text: document.getElementById("text").value,
	  });
}