import React from 'react';
import styled, { css, createGlobalStyle, keyframes } from 'styled-components';
const Animation = keyframes`
  from {
    transform: translateX(13.33333vw);
  }

  to {
    transform: translateX(-13.33333vw);
  }
`;
const height = '44';
export const ArrowFunction = styled.input.attrs(props => ({
  type: 'password',
  size: props.size || '16px',
  width: props.width || 100
}))`
  color: palevioletred;
  font-size: 1.86667vw;
  border: 1px solid palevioletred;
  border-radius: 8px;
  width: ${props => _px2vw(props.width)}; /* PropertyAccess Body */
  height: ${() => _px2vw(height)}; /* Identifier Body */
  line-height: ${() => _px2vw('44')}; /* StringLiteral Body */
  margin: ${() => _px2vw(32)}; /* NumericLiteral Body */
  padding: ${props => props.size};
`;
export const ArrowFunctionWithBlockBody = styled.button`
  width: ${props => _px2vw(() => {
  if (props.width) {
    return props.width;
  } else {
    return 0;
  }
})}; /* Block Body */

  ${props => props.disabled ? "height: 53.33333vw" : "height: 26.66667vw"}
`;
export const ArrowFunctionWithBinaryBody = styled.button`
  ${props => props.disabled && `
    width: 26.66667vw;
    font-size: 1.86667vw;
  `};
  height: ${props => _px2vw(!props.disabled && props.height)}; /* ArrowFunction with a LogicalExpression Body */
  width: ${() => _px2vw(44 + 50)}; /* ArrowFunction with a BinaryExpression Body */
`;
export const ArrowFunctionWithConditionalBody = styled.button`
  height: ${props => props.height ? _px2vw(height) : _px2vw(100)}; /* ArrowFunction with a ConditionalExpression Body */
`;
const fontSize = 18;
export const GlobalStyle = createGlobalStyle`
  html body {
    font-size: ${_px2vw(fontSize)};
    width: 136.53333vw;
    min-height: 106.66667vw;
  }
`;

function getHeight() {
  const height = 100;
  return height / 2;
}

const mixins = css`
  padding: 0 2.13333vw;
  margin: 2.13333vw 4.26667vw 2.13333vw 4.26667vw;
`;
export const MixinsButton = styled.button`
  ${mixins};
  display: block;
  width: 100%;
  height: ${_px2vw(getHeight())};
  line-height: 4.26667vw;
`;
const lineHeight = '44';
export const ArrowFunctionExpressionWithBlockBody = styled.button`
  width: ${props => _px2vw(() => {
  if (props.width) {
    return props.width;
  } else {
    return 0;
  }
})};
  line-height: ${_px2vw(lineHeight)};
`;
export const StyledButton = styled.button`
  width: 16vw;
  height: 4.26667vw;
  font-size: 1.86667vw;
`;
export const ExtendStyledButton = styled(StyledButton)`
  padding: ${props => 3 > 2 ? _px2vw(3) : _px2vw(props.padding)};
  margin: ${(...args) => _px2vw(function (props) {
  return props.margin;
}, ...args)};
`;
export const PropertyAccessExpression = styled.button(props => `
  display: inline;
  width: ${_px2vw(props.width)};
  height: ${props.height};
  font-size: 2.13333vw;
`);
export const ThemeConsumer = styled.div`
  background: url('http://baid.com') 4.53333vw 6vw;
  padding: 1.6vw; //urji
  font-size: ${props => _px2vw(props.theme.fontSize)};
  color: ${props => props.theme.color};
`;
export const ConditionalExpression = function ({
  fontSize
} = {}) {
  const StyledButton = styled.button`
    font-size: ${typeof fontSize === 'number' ? _px2vw(fontSize) : props => _px2vw(props?.theme.fontSize)};
  `;
  return /*#__PURE__*/React.createElement(StyledButton, null);
};

function _px2vw(input, ...args) {
  if (typeof input === 'function') return _px2vw(input(...args), ...args);
  var value = typeof input === 'string' ? parseFloat(input) : typeof input === 'number' ? input : 0;
  var pixels = Number.isNaN(value) ? 0 : value;

  if (Math.abs(pixels) < 1) {
    return `${pixels}px`;
  }

  var unit = "vw";
  var mul = Math.pow(10, 5 + 1);
  return `${Math.round(Math.floor(pixels * 100 / 750 * mul) / 10) * 10 / mul}${unit}`;
}
