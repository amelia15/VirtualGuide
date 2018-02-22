//ссылка на базу данных
    var db = firebase.database();
  
    //получим нужный нам список в бд (по его ключу)
    var listRef = db.ref('main');

   //добавление элемента в отображение
    function addItem(item) {
        //cоздадим новый элемент списка с данными из аргумента (каждый item состоит из ключа и значения)
        var newItem = '<div class="general_facts"><div class="name" onclick="show(this)"> <h2>'+item.val().name+' </h2></div><div class="text_info">'+item.val().text+' </div></div>';
        //добавление элемента списка в список
        document.querySelector('.info').innerHTML += newItem;
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
