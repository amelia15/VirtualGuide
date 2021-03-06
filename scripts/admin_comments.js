const db = firebase.database();//ссылка на базу данных
let listRef = db.ref('ways/way1/comments');
const page1 = {
		post: document.getElementById("post_type"),
		ref: db.ref('ways'),
		list: [],
		show: function(item) {
		},
	createOptions: function(item){
		this.post.innerHTML = "";
        for (let i in item){
            this.post.innerHTML+= `<option value="${i}">${item[i].name}</option>`;
		}
    }
};

page1.ref.on('value', function(snap) {
	this.list = snap.val(); 
	page1.createOptions(this.list);
});
page1.post.onchange = function(){
	document.querySelector('.com_field').innerHTML = "";
	
	listRef = db.ref('ways/'+page1.post.value+'/comments');
	listRef.on('child_added', function (data) {
        addItem(data);
    });
    
    listRef.on('child_changed', function(data) {//если в бд что-то изменили
        changeItem(data);
    });
	setOnclick();
}

listRef = db.ref('ways/way1/comments');
listRef.on('child_added', function (data) {
        addItem(data);
		setOnclick();
});
    
listRef.on('child_changed', function(data) {//если в бд что-то изменили
        changeItem(data);
});
setOnclick();

function addItem(item) {//добавление элемента в отображение
	//cоздадим новый элемент списка с данными из аргумента (каждый item состоит из ключа и значения)
    var newItem = '<div class="comm_block"><h2 class="user_name">'+item.val().name+'</h2><p class="commText">'+item.val().text+' </p><span class="delete buttonDel" id="'+item.key+'" >Видалити</span></div>';
    document.querySelector('.com_field').innerHTML += newItem;  //добавление элемента списка в список
}
	
	//добавление "слушателей" событий, eсли в бд что-то добавили
	function deleteComm(id) {
		var postV= page1.post.value;
		db.ref('ways/'+page1.post.value+'/comments/'+id).remove();
		page1.post.value = postV;
		page1.post.onchange();
	}
	
	function setOnclick() {
		var elements = document.getElementsByClassName("delete");
		for (let i in elements){
			elements[i].onclick=function(){
				deleteComm(this.id);
			};
		}
	}		//записать в массив каждой кнопке	
