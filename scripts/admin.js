'use strict';
//ссылка на базу данных
const db = firebase.database();

const page = {
	post: document.getElementById("post_type"),
    ref: db.ref(`main/city_name_info`),
    //task: document.getElementsByClassName('task')[0],
    show: function(item) {
        switch (item.key) {
            case "name":
				document.getElementById("post_name").value = item.val();
                break;
            case "text":
                //document.getElementById("post_text").value = item.val();
				tinymce.get('post_text').setContent(item.val());
                break;
              }
    },
    createOptions: function(item){
		this.post.innerHTML = "<option selected>Оберіть назву поста</option>";
        for (let i in item){
            this.post.innerHTML+= `<option value="${i}">${item[i].name}</option>`;
        }
    }
};

page.post.onchange = function(){
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
	 db.ref(`main/`+page.post.value).set({
		name: document.getElementById("post_name").value,
		desc: tinymce.get('post_text').getContent(),
		/*sights: document.getElementById('sights').value*/
  });
}

document.getElementById("delete").onclick = function(){
	 db.ref(`main/`+page.post.value).remove();
	 page.ref.on('child_removed', function (data) {
		page.show(data);
	});
} 

let main1 = db.ref('main');
/*ways.on('child_added', function (data) {
    page.showLinks(data);
	});
ways.on('child_changed', function (data) {
    page.showLinks(data);
	});*/
let list = [];
main1.on('value', function(snap) {
	list = snap.val(); console.log(list);
	page.createOptions(list);
});