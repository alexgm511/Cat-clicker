$(function(){

    var model = {
		cats: { 
			"Gray": {
				"img": "gray.jpg",
				"count": 0
			},
			"Dusk": {
				"img": "dusk.jpg",
				"count": 0
			},
			"Red": {
				"img": "red.jpg",
				"count": 0
			},
			"Misty": {
				"img": "misty.jpg",
				"count": 0
			},
			"Blondie": {
				"img": "blondie.jpg",
				"count": 0
			},
			"Chocolate": {
				"img": "chocolate.jpg",
				"count": 0
			}
		},
        init: function() {
			if (!localStorage.currCat) {
				localStorage.currCat = JSON.stringify([]);
			}
			localStorage.setItem("cats", JSON.stringify(model.cats));
        },
        addClick: function(name) {
            var cats = JSON.parse(localStorage.cats);
			cats[name].count++;
            localStorage.cats = JSON.stringify(cats);
			var cat = cats[name];
			cat["name"] = name;
			return cat;
        },
        currCat: function(name) {
			var cats = JSON.parse(localStorage.cats);
			var cat = cats[name];
			cat["name"] = name;
			localStorage.currCat = JSON.stringify(cat);
            return cat;
        },
		catNames: function() {
            var cats = JSON.parse(localStorage.cats);
			return Object.keys(cats);
		},
		chgCatInfo: function(newName, newImg, newCount) {
			
		}
    };


    var octopus = {
		getCatNames: function() {
			return model.catNames();
		},
		setCurrCat: function(name) {
			return model.currCat(name);
		},
		upCount: function(name) {
			var cat = model.addClick(name);
			view.render(cat);
		},
		chgInfo: function() {
			
		},

        init: function() {
            model.init();
            view.init();
        }
    };


    var view = {
        init: function() {
			console.log();
            this.catList = $('#catList');
			this.catShow = $('#cat');
			var catInfo = $('form#chgCatInfo');
			var newName = $('#newName');
			var newImg = $('#newImg');
			var newCount = $('#newCount');
            view.renderBtns();
			this.catList.on('click', 'button', function(e) {
				var catName = $(this).attr('data-name');
				var cat = octopus.setCurrCat(catName);
				view.render(cat);
			});

			this.catShow.on('click', 'img', function(e) {
				var myName = $( this ).attr('id');
				octopus.upCount(myName);
			});
			
			$('button#admin').click( function() {
				catInfo.show();
			});
			
			catInfo.submit(function(e) {
				console.log('submitted!')
				octopus.chgInfo(newName.val(), newImg.val(), newCount.val());
				//e.preventDefault();
			})
			
			
			this.catList.find('button:first').click();
			
			
        },
        renderBtns: function(){
            var htmlStr = '';
			octopus.getCatNames().forEach(function(name) {
				htmlStr += '<li><button data-name="'+name+'">'+name+'</button></li>';
			});
            this.catList.html( htmlStr );
        },
        render: function(cat){
			this.catShow.find('h3.name').html( cat.name );
			this.catShow.find('img').attr('id', cat.name).attr('src', 'images/'+cat.img).attr('alt', 'Cat called '+cat.name);
			this.catShow.find('h3.score').html( cat.name+' clicks: '+cat.count );
        }
		
    };

    octopus.init();
});
