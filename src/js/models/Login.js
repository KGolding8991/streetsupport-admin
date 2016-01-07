var ajax = require('basic-ajax')
var endpoints = require('../api-endpoints')
var adminUrls = require('../admin-urls')
var browser = require('../browser')
var cookies = require('../cookies')

function LoginModel () {
  this.username = ''
  this.password = ''
  this.message = ''
}

LoginModel.prototype.submit = function () {
  var self = this
  ajax.postJson(endpoints.createSession, {
    'username': self.username,
    'password': self.password
  })
  .then(function (result) {
    if (result.status === 201) {
      cookies.set('session-token', result.json.sessionToken)
      browser.redirect(adminUrls.dashboard)
    } else {
      self.message = result.responseText
    }
  }, function(error) {
      self.message = error.responseText
  })
}

module.exports = LoginModel