var mod = {
  curCat: null,
  adminMode: false,
  cats: [
      {
          clicks : 0,
          name : 'Tabby',
          imgSrc : 'img/cat.jpg',
      },
      {
          clicks : 0,
          name : 'Tiger',
          imgSrc : 'img/cat2.jpg',
      },
      {
          clicks : 0,
          name : 'Scaredy',
          imgSrc : 'img/cat3.jpg',
      },
      {
          clicks : 0,
          name : 'Shadow',
          imgSrc : 'img/cat4.jpg',
      },
      {
          clicks : 0,
          name : 'Sleepy',
          imgSrc : 'img/cat5.jpg',
      }
  ]
};

var obj = {
  init: function(){
    mod.curCat = mod.cats[0];

    view.init();
    list.init();
    adminView.init();
  },
  getCurCat: function(){
    return mod.curCat;
  },

  getAllCats: function() {
    return mod.cats;
  },
  setCurCat: function(cat){
    mod.curCat=cat;
  },
  countInc: function(){
    mod.curCat.clicks++;
    view.execute();
  },

  displayAdmin: function(){
    if (mod.adminMode === false){
      mod.adminMode = true;
      adminView.show();
    }
  },
  cancelAdmin: function(){
    if (mod.adminMode === true) {
      mod.adminMode = false;
      adminView.hide();
    }
  },
  saveAdmin: function(){
    var catNewName = $('#chname').val();
    var newClicks = $('#clic').val();
    var newImgUrl = $('#imageURL').val();
    mod.curCat.name = catNewName;
    mod.curCat.clicks = newClicks;
    if (newImgUrl){
    mod.curCat.imgSrc = newImgUrl;
   }
    view.execute();
    list.execute();
    adminView.execute();
    mod.adminMode = false;

  }
};

var view = {
  init: function(){

    $('#imgs').click(function(){
      obj.countInc();
    });
    this.execute();
  },

  execute: function(){
    var currCat = obj.getCurCat();
    $('#name').html(currCat.name);
    $('#count').html(currCat.clicks);
    $('#imgs').attr('src', currCat.imgSrc);
  }
};

var list = {
  init: function(){

    this.execute();
  },

  execute: function(){
    var cat;
    var sel = $('#list');
    var cats = obj.getAllCats();
    sel.html('');
    for(var x = 0; x<cats.length;x++){
      cat = cats[x];
      sel.append("<li id=lis"+x+">"+cat.name+"</li>");
      $("#lis"+x).click((function(catCopy,id){
        return function(){
          obj.setCurCat(catCopy);
          view.execute();
        };
      })(cat,x));
    }
  }
};

var adminView = {
  init: function(){
    $('#adminButton').click(function(){
      obj.displayAdmin();
    });
    $('#save-btn').click(function(){
      obj.saveAdmin();
    });
    $('#cancel-btn').click(function(){
      obj.cancelAdmin();
    });
    this.execute();
  },

  execute: function(){
     $('#adminDiv').hide();
     $('#adminButton').show();

   },

    show: function(){
      $('#adminDiv').show();
      $('#adminButton').hide();
    },
    hide: function(){
      $('#adminDiv').hide();
      $('#adminButton').show();
    }
};

obj.init();
