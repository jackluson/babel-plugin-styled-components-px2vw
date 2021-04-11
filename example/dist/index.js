import styled, { css, createGlobalStyle, keyframes } from 'styled-components';
const mixins = css`
  padding: 0 2.13333vw;
  margin: 2.13333vw 4.26667vw 2.13333vw 4.26667vw;
`;
const Animation = keyframes`
  from {
    transform: translateX(13.33333vw);
  }

  to {
    transform: translateX(-13.33333vw);
  }
`;
export const Input = styled.input.attrs(props => ({
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
    width: 1024px;
    min-height: 800px;
  }
`;

function getHeight() {
  const height = 100;
  return height / 2;
}

const btnHeight = 40;
export const MixinsButton = styled.button`
  ${mixins};
  display: block;
  width: 100%;
  font-size: ${btnHeight > 40 ? _px2vw(40) : btnHeight => _px2vw(btnHeight * 1.5)};
  height: ${_px2vw(getHeight())};
  line-height: 4.26667vw;
`;
const lineHeight = '44';
export const LineHeightButton = styled.button`
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
export const ExtendButton = styled(StyledButton)`
  padding: ${props => _px2vw(typeof props.padding === 'number' ? props.padding : 16)};
`;
export const SizeableButton = styled.button(props => `
  display: inline;
  width: ${_px2vw(props.width)};
  height: ${props.height};
  font-size: 2.13333vw;
`);
export const ThemeConsumer = styled.div`
  //nextji
  background: url('http://baid.com') 34px 45px; //ji
  padding: 12px; //urji
  font-size: ${props => _px2vw(props.theme.fontSize)};
  color: ${props => props.theme.color};
`;

function _px2vw(input, ...args) {
  if (typeof input === 'function') return _px2vw(input(...args), ...args);
  var value = typeof input === 'string' ? parseFloat(input) : typeof input === 'number' ? input : 0;
  var pixels = Number.isNaN(value) ? 0 : value;

  if (Math.abs(pixels) < 1) {
    return `${pixels}px`;
  }

  var mul = Math.pow(10, 5 + 1);
  return `${Math.round(Math.floor(pixels * 100 / 750 * mul) / 10) * 10 / mul}vw`;
}
