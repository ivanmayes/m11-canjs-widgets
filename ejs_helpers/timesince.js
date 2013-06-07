// Creates a way to get pretty time since dates

var dateObserve = new can.Observe({
        now : new Date()
    })

can.EJS.Helpers.prototype.timeSince = function(date,zone){
	// compare the date passed in with 'now'
	d = new Date();

    // convert to msec
    // add local time zone offset
    // get UTC time in msec
    utc = dateObserve.attr('now').getTime() + (dateObserve.attr('now').getTimezoneOffset() * 60000);

    // create new Date object for different city
    // using supplied offset
    if(zone && zone.length > 0){
	    var split = zone.split(':');
	    var offset  =split[0]+'.'+split[1];
	    nd = new Date(utc + (3600000* offset));
    }else {
    	nd =  dateObserve.attr('now');
    }
	var difference = (nd - new Date(date)) / 1000;

	var s;
	if(difference < 1.2){
		return "a second ago";
	} else if (difference < 5) {
		return Math.round(difference)+" seconds ago";
	} else if (difference < 30 ) {
		return "a few seconds ago";
	}  else if (difference < 60 ) {
		return "a half min ago";
	} else if (difference < 3600 ) {
		var minutes = Math.round(difference/60);
		s = minutes < 2 ? '' : 's';
		return 'about '+minutes+" minute"+s+" ago";
	} else if (difference < 86400 ) {
		var hours = Math.round(difference/3600);
		s = hours < 2 ? '' : 's';
		return 'about '+hours+" hour"+s+" ago";
	} else if (difference < 2628000) {
		var days = Math.round(difference/86400);
		s = days < 2 ? '' : 's';
		return 'about '+days+" day"+s+" ago";
	} else if(difference < 31536000) {
		var months = Math.round(difference/2628000);
		s = months < 2 ? '' : 's';
		return 'about '+months+" month"+s+" ago";
	}else{
		var years = Math.round(difference/31536000);
		s = years < 2 ? '' : 's';
		return 'about '+years+" year"+s+" ago";
	}
};

// Update our 'now' var each second to count
// time on the app
// update that property every second
setTimeout(function(){
        dateObserve.attr('now',new Date() );
        setTimeout(arguments.callee, 1000);
    },1000)