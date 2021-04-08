import { px2vw as _px2vw } from "babel-plugin-styled-components-px2rem/lib/px2vw";
var _OPTIONS = {
  viewportWidth: 750,
  unitPrecision: 3,
  minPixelValue: 1
};
import styled, { css, createGlobalStyle, keyframes } from 'styled-components';
export const GlobalStyleV = createGlobalStyle`
  html, body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    padding-top: ${StyleConstants.NAV_BAR_HEIGHT};
    background-color: ${p => p.theme.background};
  }
  body.fontLoaded {
    font-size: 17.067vw;
    font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  @media (orientation: landscape) {
    body {
      flex-direction: row;
      width: 22.4vw;
      font-size: 3.067vw;
      section{width: 75.733vw;
        font-size: 3.067vw;
      }
    }
    .div {
      font-size: 3.067vw;
      width: 75.733vw;
    }
  }
  p {
    line-height: 1.533vw;
  }

  input, select, button {
    font-family: inherit;
    font-size: inherit;
  }

  .icon {
     //next
    background: url("http://ji"); /*j:// */
    width: 3.2vw; //hui
    height: 3.067vw;
  }
`;
const mixins = css`
  padding: 0 2.4vw;
  margin: 2.133vw 4.267vw 2.133vw 32em;
  padding-top: 1.333vw;
  padding-bottom: 1.333vw;
  border: 0.267vw solid black;
`;
const Animation = keyframes`
  from {
    transform: translateX(13.333vw);
  }

  to {
    transform: translateX(-13.333vw);
  }
`;
const Input = styled.input.attrs(props => ({
  type: 'password',
  size: props.size || '1em'
}))`
  color: palevioletred;
  font-size: 1.867vw;
  border: 1px solid palevioletred;
  border-radius: 8px;
  margin: ${props => _px2vw(props.size, _OPTIONS)};
  padding: ${props => props.size};
`;
const GlobalStyle = createGlobalStyle`
  section {
      font-size: 2.133vw;
  }

  html body {
    font-size: 2.4vw;
    section {
      font-size: 2.133vw
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
}, _OPTIONS)};
  height: ${_px2vw(props.height, _OPTIONS)};
  line-height: ${_px2vw(lineHeight, _OPTIONS)};
`;
const ExtendedButton = styled(InlineButton)`
  width: 16vw;
  height: 4.267vw;
  line-height: 4.267vw;
  font-size: 1.867vw;
`;
const SizeableButton = styled.button(props => `
  display: inline;
  width: ${_px2vw(props.width, _OPTIONS)};
  height: ${_px2vw(props.height, _OPTIONS)};
  line-height: ${_px2vw(props.height, _OPTIONS)};
  font-size: 2.4vw;
`);
