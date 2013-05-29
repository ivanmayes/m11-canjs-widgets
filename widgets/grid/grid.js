steal('//libs/canjs/can.construct.proxy.js').then(function() {

Grid = can.Control({
      init: function(){
		this.update();
      },
      "{items} change": "update",
      update: function(){
		var items;

		try {
			items = this.options.items();
		}catch(e) {
			items = this.options.items;
		}

		if(can.isDeferred( items )){
			items.then(this.proxy('draw'));
		} else {
			this.draw(items);
		}
      },
      "{paginate}.count change" : function(){
      	console.log("COUNT CHANGED!");
      },
      draw: function(items){
		var data = $.extend({}, this.options,{items: items});
		this.element.html( can.view(this.options.template, data) );
      }
    });

});