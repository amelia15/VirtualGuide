'use strict';
const db = firebase.database();//ссылка на базу данных

const page = {
	post: document.getElementById("post_type"),
    ref: db.ref(`main/city_name_info`),
    show: function(item) {
        switch (item.key) {
            case "name":
				document.getElementById("post_name").value = item.val();
                break;
            case "text":
                tinymce.get('post_text').setContent(item.val());
                break;
              }
    },
    createOptions: function(item){
		this.post.innerHTML = "<option value='add_new' selected>Додати новий пост</option>";
        for (let i in item){
            this.post.innerHTML+= `<option value="${i}">${item[i].name}</option>`;
       }
	}
};

page.post.onchange = function(){
	document.getElementById("post_name").value = "";
	try {
		tinymce.get('post_text').setContent("");
	}
	catch(e) {
		console.log('no mce');
	}
	
	page.ref = db.ref(`main/`+page.post.value);
	page.ref.on('child_added', function (data) {
    page.show(data);
	});

	page.ref.on('child_changed', function (data) {
		page.show(data);
	});
}

page.post.onchange();

document.getElementById('public').onclick = function(){
	var tmp={
		name: document.getElementById("post_name").value,
		text: tinymce.get("post_text").getContent(),
	  };
	if (page.post.value=='add_new') {
		var newPost = db.ref('main').push();
		newPost.set(tmp);
	}
	else {
		db.ref(`main/`+page.post.value).set(tmp);
	}
}

document.getElementById("delete").onclick = function(){
	 db.ref(`main/`+page.post.value).remove();
	 page.ref.on('child_removed', function (data) {
		page.show(data);
	});
	
	document.getElementById("post_name").value = "";
	try {
		tinymce.get('post_text').setContent("");
	}
	catch(e) {
		console.log('no mce');
	}
} 

let main1 = db.ref('main');
let list = [];
main1.on('value', function(snap) {
	list = snap.val(); console.log(list);
	page.createOptions(list);
});
