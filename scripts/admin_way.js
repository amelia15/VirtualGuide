//ссылка на базу данных
const db = firebase.database();

const page = {
	post: document.getElementById("post_type"),
    ref: db.ref(`ways/way1`),
    show: function(item) {
        switch (item.key) {
            case "name":
				document.getElementById("way_name").value = item.val();
                break;
            case "desc":
               	tinymce.get('desc').setContent(item.val());
                break;
			case "sights":
               	document.getElementById('sights').value = item.val();
                break;
              }
    },
	 createOptions: function(item){
		this.post.innerHTML = "<option value='add_new' selected>Додати новий маршрут</option>";
        for (let i in item){
            this.post.innerHTML+= `<option value="${i}">${item[i].name}</option>`;
		}
		listRef = db.ref(`ways/way3`);
    }
    
};

page.post.onchange = function(){
	document.getElementById("way_name").value = "";
	document.getElementById('sights').value = "";
	try {
		tinymce.get('desc').setContent("");
	}
	catch(e) 
	{
		console.log('no mce');
	}
	page.ref = db.ref('ways/'+page.post.value);
	page.ref.on('child_added', function (data) {
    page.show(data);
	});
	page.ref.on('child_changed', function (data) {
		page.show(data);
	});
}

page.post.onchange();

public.onclick = function(){
	var tmp = {
		name: document.getElementById("way_name").value,
		desc: tinymce.get('desc').getContent(),
		sights: document.getElementById('sights').value,
	  };
	if (page.post.value=='add_new') {
		var newPost = db.ref('ways').push();
		newPost.set(tmp);
	}
	else {
		db.ref('ways/'+page.post.value).set(tmp);
  }
}

document.getElementById("delete").onclick = function(){

	 db.ref('ways/'+page.post.value).remove();
	 page.ref.on('child_removed', function (data) {
		page.show(data);
	});	
	document.getElementById("way_name").value = "";
	document.getElementById('sights').value = "";
	try {
		tinymce.get('desc').setContent("");
	}
	catch(e) 
	{
		console.log('no mce');
	}
} 

let ways = db.ref('ways');
let list = [];
ways.on('value', function(snap) {
	list = snap.val(); console.log(list);
	page.createOptions(list);
});
