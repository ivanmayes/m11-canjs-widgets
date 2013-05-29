can.EJS.Helpers.prototype.shortenText = function(text,maxChars,ellipsis){
	if(!ellipsis) ellipsis = true;
	var returnText = text;

	if(text.length > maxChars) {
		returnText = text.substr(0, maxChars);
		returnText.substr(0, Math.min(returnText.length, returnText.lastIndexOf(" ")));
		if(ellipsis) returnText += '...';
	}

	return returnText;
};