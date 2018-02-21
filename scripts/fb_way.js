//ссылка на базу данных
    var db = firebase.database();
  
    //получим нужный нам список в бд (по его ключу)
    var listRef = db.ref('ways');
   

   //добавление элемента в отображение
    function addItem(item) {
	
        //cоздадим новый элемент списка с данными из аргумента (каждый item состоит из ключа и значения)
        var newItem = '<a href="map.html?way='+item.val().json+'" target="_blank" name="'+item.key+'"><div class="field_way"><h2 class="way">'+item.val().name+' </h2>' +'<p class="desc">'+item.val().desc+' </p><p>'+item.val().sights+'</p></div></a>';
        //добавление элемента списка в список
        document.querySelector('.ways').innerHTML += newItem;
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