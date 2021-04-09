import styled, { css, createGlobalStyle, keyframes } from 'styled-components';
export const GlobalStyleV = createGlobalStyle`
  html, body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    padding-top: ${StyleConstants.NAV_BAR_HEIGHT};
    background-color: ${p => p.theme.background};
  }
  body.fontLoaded {
    font-size: 17.06667vw;
    font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  @media (orientation: landscape) {
    body {
      flex-direction: row;
      width: 22.4vw;
      font-size: 3.06667vw;
      section{width: 568px;
        font-size: 3.06667vw;
      }
    }
    .div {
      font-size: 3.06667vw;
      width: 75.73333vw;
    }
  }
  p {
    line-height: 1.53333vw;
  }

  input, select, button {
    font-family: inherit;
    font-size: inherit;
  }

  .icon {
     //next
    background: url("http://ji"); /*j:// */
    width: 3.2vw; //hui
    height: 23px; //78
  }
`;
const mixins = css`
  padding: 0 2.4vw;
  margin: 2.13333vw 4.26667vw 2.13333vw 32em;
  padding-top: 1.33333vw;
  padding-bottom: 1.33333vw;
  border: 0.26667vw solid black;
`;
const Animation = keyframes`
  from {
    transform: translateX(13.33333vw);
  }

  to {
    transform: translateX(-13.33333vw);
  }
`;
const Input = styled.input.attrs(props => ({
  type: 'password',
  size: props.size || '1em'
}))`
  color: palevioletred;
  font-size: 1.86667vw;
  border: 1px solid palevioletred;
  border-radius: 8px;
  margin: ${props => _px2vw(props.size)};
  padding: ${props => props.size};
`;
const GlobalStyle = createGlobalStyle`
  section {
      font-size: 2.13333vw;
  }

  html body {
    font-size: 2.4vw;
    section {
      font-size: 2.13333vw
    }
  }
`;
const BlockButton = styled.button`
  ${mixins};
  display: block;
  width: 100%;
  height: 12.8vw;
  line-height: 12.8vw;
`;
const lineHeight = '44';
const InlineButton = styled.button`
  display: inline;
  width: ${props => _px2vw(() => {
  if (props.width) {
    return props.width;
  } else {
    return 0;
  }
})};
  height: ${_px2vw(props.height)};
  line-height: ${_px2vw(lineHeight)};
`;
const ExtendedButton = styled(InlineButton)`
  width: 16vw;
  height: 4.26667vw;
  line-height: 4.26667vw;
  font-size: 1.86667vw;
`;
const SizeableButton = styled.button(props => `
  display: inline;
  width: ${_px2vw(props.width)};
  height: ${_px2vw(props.height)};
  line-height: ${_px2vw(props.height)};
  font-size: 2.4vw;
`);

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
