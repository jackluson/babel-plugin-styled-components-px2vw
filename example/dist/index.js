import styled, { css, createGlobalStyle, keyframes } from 'styled-components';
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
  margin: ${props => props.size};
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
const InlineButton = styled.button`
  ${mixins};
  display: inline;
  width: ${props => props.width}px;
  height: 12.8vw;
  line-height: 12.8vw;
`;
const ExtendedButton = styled(InlineButton)`
  width: 16vw;
  height: 4.267vw;
  line-height: 4.267vw;
  font-size: 1.867vw;
`;
const SizeableButton = styled.button(props => `
  display: inline;
  width: ${props.width}px;
  height: ${props.height}px;
  line-height: ${props.height}px;
  font-size: 2.133vw;
`);
