import React from 'react';
import styled, { css, createGlobalStyle, keyframes } from 'styled-components';

const Animation = keyframes`
  from {
    transform: translateX(100px);
  }

  to {
    transform: translateX(-100px);
  }
`;


const height = '44';
export const ArrowFunction = styled.input.attrs(props => ({
  type: 'password',
  size: props.size || '16px',
  width: props.width || 100,
}))`
  color: palevioletred;
  font-size: 14px;
  border: 1px solid palevioletred;
  border-radius: 8px;
  width: ${props => props.width}px; /* PropertyAccess Body */
  height: ${() => height}px; /* Identifier Body */
  line-height: ${() => '44'}px; /* StringLiteral Body */
  margin: ${() => 32}px; /* NumericLiteral Body */
  padding: ${props => props.size};
`;

export const ArrowFunctionWithBlockBody = styled.button`
  width: ${props => {
    if (props.width) {
      return props.width;
    } else {
      return 0;
    }
  }}px; /* Block Body */

  ${props => (props.disabled ? 'height: 400px' : 'height: 200px')}
`;
export const ArrowFunctionWithBinaryBody = styled.button`
  ${props =>
    props.disabled &&
    `
    width: 200px;
    font-size: 14px;
  `};
  height: ${props =>
    !props.disabled &&
    props.height}px; /* ArrowFunction with a LogicalExpression Body */
  width: ${() => 44 + 50}px; /* ArrowFunction with a BinaryExpression Body */
`;
export const ArrowFunctionWithConditionalBody = styled.button`
  height: ${props =>
    props.height
      ? height
      : 100}px; /* ArrowFunction with a ConditionalExpression Body */
`;


const fontSize = 18;
export const GlobalStyle = createGlobalStyle`
  html body {
    font-size: ${fontSize}px;
    width: 1024px;
    min-height: 800px;
  }
`;

function getHeight() {
  const height = 100;

  return height / 2;
}
const mixins = css`
  padding: 0 16px;
  margin: 16px 32px 16px 32px;
`;
export const MixinsButton = styled.button`
  ${mixins};
  display: block;
  width: 100%;
  height: ${getHeight()}px;
  line-height: 32px;
`;

const lineHeight = '44';
export const ArrowFunctionExpressionWithBlockBody = styled.button`
  width: ${props => {
    if (props.width) {
      return props.width;
    } else {
      return 0;
    }
  }}px;
  line-height: ${lineHeight}px;
`;

export const StyledButton = styled.button`
  width: 120px;
  height: 32px;
  font-size: 14px;
`;

export const ExtendStyledButton = styled(StyledButton)`
  padding: ${props => 3 > 2 ? 3 : props.padding}px;
  margin: ${function(props){return props.margin}}px;
`;

export const PropertyAccessExpression = styled.button(
  props => `
  display: inline;
  width: ${props.width}px;
  height: ${props.height};
  font-size: 16px;
`,
);

export const ThemeConsumer = styled.div`
  //nextji
  background: url('http://baid.com') 34px 45px; //ji
  padding: 12px; //urji
  font-size: ${props => props.theme.fontSize}px;
  color: ${props => props.theme.color};
`;

export const ConditionalExpression = function({ fontSize } = {}) {
  const StyledButton = styled.button`
    font-size: ${typeof fontSize === 'number' ? fontSize : props => props?.theme.fontSize}px;
  `;

  return <StyledButton />;
};
