var loaderUtils = require('loader-utils');

module.exports = function(source) {
  var query = loaderUtils.parseQuery(this.query);
  var props = query.props || {};

  //if class name was passed explicitly
  if (query.component) {
    var clazz = query.component;
  } else {
    var clazz = 'exports.__esModule ? exports.default : module.exports';
  }

  var getClazz = 'var clazz = ' + clazz + ';';
  var checkClazz = 'if (!clazz || clazz.prototype.render === undefined) { throw new Error("no valid component specified"); }'
  var componentElement = 'require("react").createElement(clazz,' + JSON.stringify(props) + ')';
  var render = 'require("react-dom").render(' + componentElement + ', document.getElementById("' + query.id  + '"));';

  var doRender = '{(function() {' + getClazz + checkClazz + render + '})();}';

  // if there is no `ReactDOM.render`
  // inject doRender piece
  var regex = /\bReactDOM\.render\((.*)\)/;
  if (source.match(regex)) {
    return source;
  } else {
    return source + doRender;
  }
};
