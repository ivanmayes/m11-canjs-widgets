SmartDropDown = can.Control({
	defaults : {
		attrib : 'field',	// Default HTML5 Data attribute to look for
		caret : true,		//  Whether or not to add a caret to toggle
		title : null,		// Default title of the dropdown button
		toggle : null,		// Triggers drop down
		watch : null		// Observe to watch for changes to dropdown
	}
},{
	init: function(){
		console.log("init Smart Dropdown on", this.element);
		this.options.toggle = this.element.find('.dropdown-toggle');
		// Get default text, replace ellipsis
		this.options.title = this.options.toggle.text().replace("...","");
		// Check for caret
		this.options.caret = this.options.toggle.find('.caret').length;

		if(this.options.watch) {
			this.changeDropDownState(this.options.watch());
		}
	},

	changeDropDownState : function(val)
	{
		var self = this, el = null;
		// Find an element with the same value attribute as what was passed in
		this.element.find('.dropdown-menu li').each(function() {
			if($(this).find('a').attr('data-'+self.options.attrib) == val) {
				el = $(this);
			}
		});

		if(el) {
			// Change toggle title
			var title = this.options.title;
			if(!el.find('a').attr('data-'+self.options.attrib)) {
				title += '...';
			}else{
				title += el.text();
			}
			if(this.options.caret) title += ' <span class="caret"></span>';
			this.options.toggle.html(title);

			// Reset disabled
			this.element.find('.dropdown-menu li').removeClass('disabled');
			el.addClass('disabled');
		}

	},

	".dropdown-menu li click" : function(el,ev)
	{
		if(el.hasClass('disabled')) return false;
		ev.preventDefault();
		this.options.watch(el.find('a').attr('data-'+this.options.attrib));
	},

	"{watch} change": function(el,ev,newVal,oldVal){
		this.changeDropDownState(newVal);
	}
});