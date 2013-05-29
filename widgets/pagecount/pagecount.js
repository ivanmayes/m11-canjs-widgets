var PageCount = can.Control({
	defaults : {
		view : null		// Template
	}
},{
	init: function(){
		this.element.html(can.view(this.options.view,this.options));
	}
});