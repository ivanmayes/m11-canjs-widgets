var NextPrev = can.Control({
  defaults : {
    paginate : null,   // Pagination Observe
    item_name : 'item', // Noun for items
    view : null       // Template for buttons
  }
},{
  init: function(){
    this.element.html( can.view(this.options.view,this.options) );
  },
  ".next click" : function(el,ev){
    if(el.hasClass('disabled')) return false;
    var paginate = this.options.paginate;
    paginate.attr('offset', paginate.offset+paginate.limit);
  },
  ".prev click" : function(el,ev){
    if(el.hasClass('disabled')) return false;
    var paginate = this.options.paginate;
    paginate.attr('offset', paginate.offset-paginate.limit );
  }
});