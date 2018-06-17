//ссылка на базу данных
    var db = firebase.database();
	
	var listRef = db.ref('ways/way1/comments');
	var wayRef = db.ref('ways/way1/');
	function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            if(pair[0] == variable){return pair[1];}
        }
        return(false);
    }
	const page = {
	 createOptions: function(item){
		var wayJson =  getQueryVariable('way');
		console.log(wayJson);
		
		for (let i in item){
            if (item[i].json == wayJson) {
				wayRef = db.ref('ways/'+ i);
				wayRef.on('value', function(data) {
					getSights(data);
				});
				listRef = db.ref('ways/'+ i+'/comments');
				console.log(i);
				break;
			}
        }
	}};
	db.ref('ways').on('value', function(data) {
		page.createOptions(data.val());
		listRef.on('child_added', function (data) {
			addItem(data);
		});
	})
	
      
   function getSights(item) {
		var newItem2 = '<!--<div class="sight_list" >--><p>'+item.val().sights+' </p><!--</div>-->';
		var tmp1 = newItem2.split(',').join('<br/>');
		var tmp2 = tmp1.split('span').join('a');
        document.querySelector('#sight_list').innerHTML = tmp2;
    }
		
    function addItem(item) {
	    var newItem1 = '<div class="comText" ><h1>'+item.val().name+'</h1><p>'+item.val().text+' </p></div>'; //добавление элемента списка в список
        document.querySelector('.com_field').innerHTML += newItem1;
    }
	
	document.getElementById('public').onclick = function(){
		document.querySelectorAll('.mistake')[0].innerHTML = "";
		document.querySelectorAll('.mistake')[1].innerHTML = "";
		if (!autor.checkValidity()) {
			var newItem3 = '<p> Має бути довше двох символів!</p>'; //добавление элемента списка в список
			document.querySelectorAll('.mistake')[0].innerHTML += newItem3;
		}
		if (!comment.checkValidity()) {
			var newItem4 = '<p> Має бути довше двох символів!</p>'; //добавление элемента списка в список
			document.querySelectorAll('.mistake')[1].innerHTML += newItem4;
		}
		 else{
			var newComment = listRef.push();
			newComment.set({
				name: document.getElementById("author").value,
				text: document.getElementById("text").value,
			});
			document.querySelector('.com_field').innerHTML = "";
			document.getElementById("author").value = "";
			document.getElementById("text").value = "";
			listRef.on('child_added', function (data) {
			   addItem(data);
			});
		}
	}

	var autor = document.getElementById("author");
	var comment = document.getElementById("text");
