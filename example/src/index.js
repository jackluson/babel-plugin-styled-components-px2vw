import styled, { css, createGlobalStyle, keyframes } from 'styled-components';

export const GlobalStyle1 = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    line-height: 1.5;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    background-color: ${(p) => p.theme.background};
    font-size: 18px;
    &.fontLoaded {
      font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-size: 18px;
    }
  }
`;

const mixins = css`
  padding: 0 16px;
  margin: 16px 32px 16px 32px;
`;

const Animation = keyframes`
  from {
    transform: translateX(100px);
  }

  to {
    transform: translateX(-100px);
  }
`;

export const Input = styled.input.attrs((props) => ({
  type: 'password',
  size: props.size || '16px',
  width: props.width || 100,
}))`
  color: palevioletred;
  font-size: 14px;
  border: 1px solid palevioletred;
  border-radius: 8px;
  width: ${(props) => props.width}px;
  padding: ${(props) => props.size};
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
const btnHeight = 40;
export const MixinsButton = styled.button`
  ${mixins};
  display: block;
  width: 100%;
  font-size: ${btnHeight > 40 ? 40 : (btnHeight) => btnHeight * 1.5}px;
  height: ${getHeight()}px;
  line-height: 32px;
`;

const lineHeight = '44';
export const LineHeightButton = styled.button`
  width: ${(props) => {
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

export const ExtendButton = styled(StyledButton)`
  padding: ${(props) => (typeof props.padding === 'number' ? props.padding : 16)}px;
`;

export const SizeableButton = styled.button(
  (props) => `
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
  font-size: ${(props) => props.theme.fontSize}px;
  color: ${(props) => props.theme.color};
`;
