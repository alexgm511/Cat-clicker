$(function(){

    var model = {
		currCat: null,
		cats: 	[ 
				{
					"name": "Gray", 
					"imgSrc": "gray.png",
					"clickCount": 0
				},
				{
					"name": "Dusk",
					"imgSrc": "dusk.png",
					"clickCount": 0
				},
				{
					"name": "Red",
					"imgSrc": "red.png",
					"clickCount": 0
				},
				{
					"name": "Misty",
					"imgSrc": "misty.png",
					"clickCount": 0
				},
				{
					"name": "Blondie",
					"imgSrc": "blondie.png",
					"clickCount": 0
				},
				{
					"name": "Chocolate",
					"imgSrc": "chocolate.png",
					"clickCount": 0
				}
		],
        init: function() {
			if (!localStorage.currCat) {
				localStorage.currCat = JSON.stringify([]);
			}
			localStorage.setItem("cats", JSON.stringify(model.cats));
        },
		getAllCats: function() {
            var cats = JSON.parse(localStorage.cats);
			return cats;
		},
		setAllCats: function(cats) {
			localStorage.cats = JSON.stringify(cats);
		},
 		getCurrCat: function() {
            var cat = JSON.parse(localStorage.currCat);
			return cat;
		},
		setCurrCat: function(cat) {
			localStorage.currCat = JSON.stringify(cat);
		}
    };


    var octopus = {
		getCatNames: function() {
            var cats = model.getAllCats();
			var names = [];
			cats.forEach(function (cat) {
				names.push(cat.name);
			})
			return names;
		},
		setCurrCat: function(name) {
			var cat = model.currCat(name);
			return cat;
		},
		currCat: function(name) {
			var newCat = {};	
			if (name) {
				var cats = model.getAllCats();
				cats.forEach(function (cat) {
					if (cat.name == name) {
						model.setCurrCat(cat);
						newCat = cat;
					}
				})
			} else {
				newCat = model.getCurrCat();
			}
			return newCat;
		},
		upCount: function(name) {
            var cats = model.getAllCats();
			cats.forEach(function (cat) {
				if (cat.name == name) {
					cat.clickCount++;
					view.render(cat);
				}
			})
			model.setAllCats(cats);
		},
		chgInfo: function(name, newName, newImg, newCount) {
			model.chgCatInfo(name, newName, newImg, newCount);
			view.renderBtns();
		},
		showCat: function(cat) {
			view.render(cat);
		},
		chgCatInfo: function(newName, newImg, newCount) {
			var currCat = octopus.currCat();
			var cats = model.getAllCats();
			cats.forEach(function (cat) {
				if (cat.name == currCat.name) {
					if (newName.length > 0) {
						cat.name = newName;
						}
					if (newImg.length > 0) {
						cat.imgSrc = newImg;
						}
					if (newCount > 0) { 
						cat.clickCount = newCount;
						}
					octopus.currCat(cat);
					view.render(cat);
				}
			})
			model.setAllCats(cats);
			view.renderBtns();
		},

        init: function() {
            model.init();
            view.init();
        }
    };


    var view = {
        init: function() {
            this.catList = $('#catList');
			this.catShow = $('#cat');
			this.catName = $('#cat .name h2');
			this.catImg = $('#cat img');
			this.catClicks = $('#cat .score h2');
			var catInfo = $('form#chgCatInfo');
			var newName = $('#newName');
			var newImg = $('#newImg');
			var newCount = $('#newCount');
            view.renderBtns();
			this.catList.on('click', 'button', function(e) {
				var catName = $(this).attr('data-name');
				//var cat = octopus.setCurrCat(catName);
				var cat = octopus.currCat(catName);
				view.render(cat);
			});

			this.catShow.on('click', 'img', function(e) {
				var myName = $( this ).attr('id');
				octopus.upCount(myName);
			});
			
			$('button#admin').click( function() {
				catInfo.show();
			});
			
			$('button#submit, button#cancel').click(function(e) {
				e.preventDefault();
				if ($(this).attr('id') == 'submit') {
					octopus.chgCatInfo(newName.val(), newImg.val(), newCount.val());
				}
				catInfo.each(function(){
					this.reset();
				});
				catInfo.hide();
			});
						
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
			console.log(cat);
			this.catName.html( cat.name );
			this.catImg.attr('id', cat.name).attr('src', 'images/'+cat.imgSrc).attr('alt', 'Cat called '+cat.name);
			this.catClicks.html( 'Clicks: '+cat.clickCount );
        }
		
    };

    octopus.init();
});
