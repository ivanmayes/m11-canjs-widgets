// All calls reponses are converted into model instances or attributes are applied to current instance
var Api = can.Model('Api', {
  callEndpoint: function(url) {
    var ajax    = this._ajax({}, url).call(this),
        def     = new can.Deferred(),
        promise = def.promise(),
        self    = this;

    promise.abort = ajax.abort

    ajax
      .done(function(data, status, xhr) {
        def.resolveWith(self, [self._getModelsFromResponse(data), status, xhr])
      })
      .fail(function() {
        def.rejectWith(self, arguments)
      })

    return promise;
  },
  _getModelsFromResponse: function(response) {
    if(can.isArray(response)) {
      return this.models(response)
    }

    return response
  }
},{
  _getModelFromResponse: function(response) {
    var data;

    if(can.isPlainObject(response)) {
      this.attr(response)
      return this
    }

    return response
  },
  callEndpoint: function(url) {
    var ajax  = this.constructor._ajax({}, url).call(this),
        def     = new can.Deferred(),
        promise = def.promise(),
        self    = this;

    promise.abort = ajax.abort

    ajax
      .done(function(data, status, xhr) {
        def.resolveWith(self, [self._getModelFromResponse(data), status, xhr])
      })
      .fail(function() {
        def.rejectWith(self, arguments)
      })

    return promise;
  }
})