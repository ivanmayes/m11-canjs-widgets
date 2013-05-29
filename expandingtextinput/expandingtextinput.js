var ExpandingTextInput = can.Control({
	defaults : {
		view : null		// Template
	}
},{
	init: function(){
		
	},
	"keyup" : function(el,ev)
	{
		el.height( 0 );
		var padding = parseInt(el.css('padding-top').replace('px', '')) + parseInt(el.css('padding-bottom').replace('px', ''));
    	console.log(el[0].scrollHeight, padding, el[0].scrollHeight-padding);
    	el.css('overflow','hidden');
    	el.height( el[0].scrollHeight-padding);
	},
	"keydown" : function(el,ev)
	{
		// Check for Enter without Shift
		if(ev.keyCode == "13" && !ev.shiftKey) {
			if(el.val().length < 1) return false;

			this.element.trigger('submit');

			ev.preventDefault();
		}
	}
});