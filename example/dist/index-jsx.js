"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConditionalExpression = exports.ThemeConsumer = exports.PropertyAccessExpression = exports.ExtendStyledButton = exports.StyledButton = exports.ArrowFunctionExpressionWithBlockBody = exports.MixinsButton = exports.GlobalStyle = exports.ArrowFunctionExpression = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Animation = (0, _styledComponents.keyframes)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  from {\n    transform: translateX(13.33333vw);\n  }\n\n  to {\n    transform: translateX(-13.33333vw);\n  }\n"])));

var ArrowFunctionExpression = _styledComponents["default"].input.attrs(function (props) {
  return {
    type: 'password',
    size: props.size || '16px',
    width: props.width || 100
  };
})(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  color: palevioletred;\n  font-size: 1.86667vw;\n  border: 1px solid palevioletred;\n  border-radius: 8px;\n  width: ", ";\n  padding: ", ";\n"])), function (props) {
  return _px2vw(props.width);
}, function (props) {
  return props.size;
});

exports.ArrowFunctionExpression = ArrowFunctionExpression;
var fontSize = 18;
var GlobalStyle = (0, _styledComponents.createGlobalStyle)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  html body {\n    font-size: ", ";\n    width: 136.53333vw;\n    min-height: 106.66667vw;\n  }\n"])), _px2vw(fontSize));
exports.GlobalStyle = GlobalStyle;

function getHeight() {
  var height = 100;
  return height / 2;
}

var mixins = (0, _styledComponents.css)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  padding: 0 2.13333vw;\n  margin: 2.13333vw 4.26667vw 2.13333vw 4.26667vw;\n"])));

var MixinsButton = _styledComponents["default"].button(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  ", ";\n  display: block;\n  width: 100%;\n  height: ", ";\n  line-height: 4.26667vw;\n"])), mixins, _px2vw(getHeight()));

exports.MixinsButton = MixinsButton;
var lineHeight = '44';

var ArrowFunctionExpressionWithBlockBody = _styledComponents["default"].button(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  width: ", ";\n  line-height: ", ";\n"])), function (props) {
  return _px2vw(function () {
    if (props.width) {
      return props.width;
    } else {
      return 0;
    }
  });
}, _px2vw(lineHeight));

exports.ArrowFunctionExpressionWithBlockBody = ArrowFunctionExpressionWithBlockBody;

var StyledButton = _styledComponents["default"].button(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n  width: 16vw;\n  height: 4.26667vw;\n  font-size: 1.86667vw;\n"])));

exports.StyledButton = StyledButton;
var ExtendStyledButton = (0, _styledComponents["default"])(StyledButton)(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["\n  padding: ", ";\n"])), function (props) {
  return _px2vw(props.padding);
});
exports.ExtendStyledButton = ExtendStyledButton;

var PropertyAccessExpression = _styledComponents["default"].button(function (props) {
  return "\n  display: inline;\n  width: ".concat(_px2vw(props.width), ";\n  height: ").concat(props.height, ";\n  font-size: 2.13333vw;\n");
});

exports.PropertyAccessExpression = PropertyAccessExpression;

var ThemeConsumer = _styledComponents["default"].div(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["\n  font-size: ", ";\n  color: ", ";\n"])), function (props) {
  return _px2vw(props.theme.fontSize);
}, function (props) {
  return props.theme.color;
});

exports.ThemeConsumer = ThemeConsumer;

var ConditionalExpression = function ConditionalExpression() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      fontSize = _ref.fontSize;

  var StyledButton = _styledComponents["default"].button(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["\n    font-size: ", ";\n  "])), typeof fontSize === 'number' ? _px2vw(fontSize) : function (props) {
    return _px2vw(props === null || props === void 0 ? void 0 : props.theme.fontSize);
  });

  return /*#__PURE__*/_react["default"].createElement(StyledButton, null);
};

exports.ConditionalExpression = ConditionalExpression;

function _px2vw(input) {
  if (typeof input === 'function') return _px2vw(input());
  var value = typeof input === 'string' ? parseFloat(input) : typeof input === 'number' ? input : 0;
  var pixels = Number.isNaN(value) ? 0 : value;

  if (pixels < 1) {
    return "".concat(pixels, "px");
  }

  var mul = Math.pow(10, 5 + 1);
  return "".concat(Math.round(Math.floor(pixels * 100 / 750 * mul) / 10) * 10 / mul, "vw");
}
