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

  // if `replace` is set to true
  // or if there is no reactDOM render
  // inject doRender
  var regex = /\bReactDOM\.render\((.*)\)/;
  if(query.replace !== 'false' || !source.match(regex)){
    source = source.replace(regex,'');
    return source + doRender;
  }
  else {
    return source;
  }
};
