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
export const ArrowFunctionExpression = styled.input.attrs(props => ({
  type: 'password',
  size: props.size || '16px',
  width: props.width || 100
}))`
  color: palevioletred;
  font-size: 1.86667vw;
  border: 1px solid palevioletred;
  border-radius: 8px;
  width: ${props => _px2vw(props.width)};
  padding: ${props => props.size};
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
  padding: ${props => _px2vw(props.padding)};
`;
export const PropertyAccessExpression = styled.button(props => `
  display: inline;
  width: ${_px2vw(props.width)};
  height: ${props.height};
  font-size: 2.13333vw;
`);
export const ThemeConsumer = styled.div`
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

function _px2vw(input) {
  if (typeof input === 'function') return _px2vw(input());
  var value = typeof input === 'string' ? parseFloat(input) : typeof input === 'number' ? input : 0;
  var pixels = Number.isNaN(value) ? 0 : value;

  if (pixels < 1) {
    return `${pixels}px`;
  }

  var mul = Math.pow(10, 5 + 1);
  return `${Math.round(Math.floor(pixels * 100 / 750 * mul) / 10) * 10 / mul}vw`;
}
