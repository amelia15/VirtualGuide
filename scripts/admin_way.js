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
		this.post.innerHTML = "<option selected>Оберіть новий маршрут</option>";
        for (let i in item){
            this.post.innerHTML+= `<option value="${i}">${item[i].name}</option>`;
        }
    }
    
};

page.post.onchange = function(){
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
	 db.ref('ways/'+page.post.value).set({
		name: document.getElementById("way_name").value,
		desc: tinymce.get('desc').getContent(),
		sights: document.getElementById('sights').value
  });
}

document.getElementById("delete").onclick = function(){
	 db.ref('ways/'+page.post.value).remove();
	 page.ref.on('child_removed', function (data) {
		page.show(data);
	});
} 

let ways = db.ref('ways');
/*ways.on('child_added', function (data) {
    page.showLinks(data);
	});
ways.on('child_changed', function (data) {
    page.showLinks(data);
	});*/
let list = [];
ways.on('value', function(snap) {
	list = snap.val(); console.log(list);
	page.createOptions(list);
});
//list[i].name