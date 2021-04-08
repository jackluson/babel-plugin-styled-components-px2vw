import styled, { css, createGlobalStyle, keyframes } from 'styled-components';
export const GlobalStyleV = createGlobalStyle`
  html, body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    padding-top: ${StyleConstants.NAV_BAR_HEIGHT};
    background-color: ${(p) => p.theme.background};
  }
  body.fontLoaded {
    font-size: 128px;
    font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  @media (orientation: landscape) {
    body {
      flex-direction: row;
      width: 168px;
      font-size: 23px;
      section{width: 568px;
        font-size: 23px;
      }
    }
    .div {
      font-size: 23px;
      width: 568px;
    }
  }
  p {
    line-height: 11.5px;
  }

  input, select, button {
    font-family: inherit;
    font-size: inherit;
  }

  .icon {
     //next
    background: url("http://ji"); /*j:// */
    width: 24px; //hui
    height: 23px; //78
  }
`;

const mixins = css`
  padding: 0 18px;
  margin: 16px 32px 16px 32em;
  padding-top: 10px;
  padding-bottom: 10px;
  border: 2px solid black;
`;

const Animation = keyframes`
  from {
    transform: translateX(100px);
  }

  to {
    transform: translateX(-100px);
  }
`;

const Input = styled.input.attrs((props) => ({
  type: 'password',
  size: props.size || '1em',
}))`
  color: palevioletred;
  font-size: 14px;
  border: 1px solid palevioletred;
  border-radius: 8px;
  margin: ${(props) => props.size}px;
  padding: ${(props) => props.size};
`;

const GlobalStyle = createGlobalStyle`
  section {
      font-size: 16px;
  }

  html body {
    font-size: 18px;
    section {
      font-size: 16px
    }
  }
`;

const BlockButton = styled.button`
  ${mixins};
  display: block;
  width: 100%;
  height: 96px;
  line-height: 96px;
`;

const lineHeight = '44';
const InlineButton = styled.button`
  display: inline;
  width: ${(props) => {
    if (props.width) {
      return props.width;
    } else {
      return 0;
    }
  }}px;
  height: ${props.height}px;
  line-height: ${lineHeight}px;
`;

const ExtendedButton = styled(InlineButton)`
  width: 120px;
  height: 32px;
  line-height: 32px;
  font-size: 14px;
`;

const SizeableButton = styled.button(
  (props) => `
  display: inline;
  width: ${props.width}px;
  height: ${props.height}px;
  line-height: ${props.height}px;
  font-size: 18px;
`,
);
