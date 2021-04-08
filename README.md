# babel-plugin-styled-components-px2vw

[![npm version](https://badge.fury.io/js/babel-plugin-styled-components-px2vw.svg)](https://badge.fury.io/js/babel-plugin-styled-components-px2vw)
![NPM Downloads](https://badgen.net/npm/dt/babel-plugin-styled-components-px2vw)
[![Build Status](https://travis-ci.com/jackluson/babel-plugin-styled-components-px2vw.svg?branch=main)](https://travis-ci.com/jackluson/babel-plugin-styled-components-px2vw)
[![codecov](https://codecov.io/gh/jackluson/babel-plugin-styled-components-px2vw/branch/main/graph/badge.svg)](https://codecov.io/gh/jackluson/babel-plugin-styled-components-px2vw)
[![MIT](https://img.shields.io/github/license/jackluson/babel-plugin-styled-components-px2vw?style=plastic)](https://github.com/jackluson/babel-plugin-styled-components-px2vw/blob/main/LICENSE)

[Babel](https://babeljs.io/) plugin for convert `px` to `vw` units of [styled-components](https://www.styled-components.com/). its inspiration comes from [babel-plugin-styled-components-px2rem](https://github.com/xuyuanxiang/babel-plugin-styled-components-px2rem)

1. Use [postcss-px-to-viewport](https://github.com/evrone/postcss-px-to-viewport) to process all css text in template strings.

## Getting Started

### Installation

Add via npm

`$ npm install babel-plugin-styled-components-px2vw --save-dev`

or yarn

`$ yarn add -D babel-plugin-styled-components-px2vw`

### Configuration

babel.config.js:

```javascript
module.exports = {
  plugins: [
    [
      'styled-components-px2vw',
      {
        unitToConvert: 'px',
        unitPrecision: 5,
        minPixelValue: 0,
      },
    ],
  ],
};
```

or .babelrc:

```javascript
{
  "plugins": [
    [
      "styled-components-px2vw",
      {
        "unitToConvert": 'px',
        "unitPrecision": 5,
        "minPixelValue": 0
      }
    ]
  ]
}
```

see [example](example)

### Options

> The options of the plugin are based on some of the option of [postcss-px-to-viewport](https://github.com/evrone/postcss-px-to-viewport)

| name             |   type   | required | default                                             |                                                                                                                                                            description |
| :--------------- | :------: | :------: | :-------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| tags             | string[] |  false   | ["styled", "css", "createGlobalStyle", "keyframes"] | [styled-components](https://www.styled-components.com/) template literal [tagged](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) |
| unitToConvert    |  string  |  false   | px                                                  |                                                                                                                                                        unit to convert |
| viewportWidth    |  number  |  false   | 750                                                 |                                                                                                                                             The width of the viewport. |
| unitPrecision    |  number  |  false   | 5                                                   |                                                                                                                  The decimal numbers to allow the vw units to grow to. |
| propList         | string[] |  false   | ["*"]                                               |               The properties that can change from px to vw. more detail see [postcss-px-to-viewport propList opions](https://github.com/evrone/postcss-px-to-viewport) |
| viewportUnit     |  string  |  false   | vw                                                  |                                                                                                                                                        Expected units. |
| fontViewportUnit |  string  |  false   | vw                                                  |                                                                                                                                               Expected units for font. |
| minPixelValue    |  number  |  false   | 1                                                   |                                                                                                                                Set the minimum pixel value to replace. |
| replace          | boolean  |  false   | false                                               |                                                                                                              replaces rules containing vw instead of adding fallbacks. |
| transformRuntime | boolean  |  false   | false                                               |                                                                                since 1.1.0，enable transformation of all expressions that embedded in template strings |

## Demo

### Input

```javascript
import styled, { css, createGlobalStyle, keyframes } from 'styled-components';

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
  margin: ${(props) => props.size};
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

const InlineButton = styled.button`
  ${mixins};
  display: inline;
  width: ${(props) => props.width}px;
  height: 96px;
  line-height: 96px;
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
  font-size: 16px;
`,
);
```

### Output

```javascript
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
const Input = styled.input.attrs((props) => ({
  type: 'password',
  size: props.size || '1em',
}))`
  color: palevioletred;
  font-size: 1.867vw;
  border: 1px solid palevioletred;
  border-radius: 8px;
  margin: ${(props) => props.size};
  padding: ${(props) => props.size};
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
  width: ${(props) => props.width}px;
  height: 12.8vw;
  line-height: 12.8vw;
`;
const ExtendedButton = styled(InlineButton)`
  width: 16vw;
  height: 4.267vw;
  line-height: 4.267vw;
  font-size: 1.867vw;
`;
const SizeableButton = styled.button(
  (props) => `
  display: inline;
  width: ${props.width}px;
  height: ${props.height}px;
  line-height: ${props.height}px;
  font-size: 2.133vw;
`,
);
```

### License

This project is licensed under the [MIT License](https://github.com/jackluson/babel-plugin-styled-components-px2vw/blob/master/LICENSE).
