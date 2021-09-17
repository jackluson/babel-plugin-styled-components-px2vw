# babel-plugin-styled-components-px2vw

[![npm version](https://badge.fury.io/js/babel-plugin-styled-components-px2vw.svg)](https://badge.fury.io/js/babel-plugin-styled-components-px2vw)
![NPM Downloads](https://badgen.net/npm/dt/babel-plugin-styled-components-px2vw)
[![Build Status](https://travis-ci.com/jackluson/babel-plugin-styled-components-px2vw.svg?branch=main)](https://travis-ci.com/jackluson/babel-plugin-styled-components-px2vw)
[![codecov](https://codecov.io/gh/jackluson/babel-plugin-styled-components-px2vw/branch/main/graph/badge.svg)](https://codecov.io/gh/jackluson/babel-plugin-styled-components-px2vw)
[![MIT](https://img.shields.io/github/license/jackluson/babel-plugin-styled-components-px2vw?style=plastic)](https://github.com/jackluson/babel-plugin-styled-components-px2vw/blob/main/LICENSE)

[English](README.md) | 中文

[Babel 插件](https://babeljs.io/) 的主要功能是将 [styled-components](https://www.styled-components.com/)中的 px 单位转成 vw 单位。

1. 使用 [postcss-px-to-viewport](https://github.com/evrone/postcss-px-to-viewport) 处理模板字符串中的所有 css 文本。
2. 在启用[transformRuntime](#transform-runtime)选项时将运行时`px2vw`函数 把嵌入在模板字符串中的 px 单位转成 vw 单位。

它的灵感来自 [babel-plugin-styled-components-px2rem](https://github.com/xuyuanxiang/babel-plugin-styled-components-px2rem). 特此鸣谢

## 开始

### 安装

via npm

`$ npm install babel-plugin-styled-components-px2vw --save-dev`

or yarn

`$ yarn add -D babel-plugin-styled-components-px2vw`

### 配置

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

### postcss 配置

注意在配置 postcss 时把它放在 styled-components 前面 [babel-plugin-styled-components](https://github.com/styled-components/babel-plugin-styled-components#readme)

```json
{
  "plugins": ["styled-components-px2vw", "styled-components"]
}
```

see [example](example)

1. `npm install`
2. Typing: `npm test` to run unit tests
3. Typing: `npm run build` to compile `src/index.jsx` to `dist/index-jsx.js`

### Online Demo

点击
[react-boilerplate-typescript-mobile](https://jackluson.github.io/react-boilerplate-typescript-mobile/) 切换到移动端设备，或者改变设备宽度，查看页面元素样式代码，这是 demo 源码参数[repo](https://github.com/jackluson/react-boilerplate-typescript-mobile)

### 配置选项

> 配置选项参数与 [postcss-px-to-viewport](https://github.com/evrone/postcss-px-to-viewport)大致一样, 有少量选项参数不支持, 例如 `mediaQuery`、`landscape`

| name             |        type        | required | default                                             |                                                                                                                                                                                                                                                                                                       description |
| :--------------- | :----------------: | :------: | :-------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| tags             |      string[]      |  false   | ["styled", "css", "createGlobalStyle", "keyframes"] |                                                                                                                                            [styled-components](https://www.styled-components.com/) template literal [tagged](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) |
| unitToConvert    |       string       |  false   | px                                                  |                                                                                                                                                                                                                                                                                        需要转换的单位，默认为"px" |
| viewportWidth    |       number       |  false   | 750                                                 |                                                                                                                                                                                                                                                                                                  设计稿的视口宽度 |
| unitPrecision    |       number       |  false   | 5                                                   |                                                                                                                                                                                                                                                                                              单位转换后保留的精度 |
| propList         |      string[]      |  false   | ["*"]                                               |                                                                                                                                                               能转化为 vw 的属性列表.详细可看 [postcss-px-to-viewport propList opions](https://github.com/evrone/postcss-px-to-viewport/blob/master/README_CN.md) |
| viewportUnit     |       string       |  false   | vw                                                  |                                                                                                                                                                                                                                                                                                希望使用的视口单位 |
| fontViewportUnit |       string       |  false   | vw                                                  |                                                                                                                                                                                                                                                                                                字体使用的视口单位 |
| minPixelValue    |       number       |  false   | 1                                                   |                                                                                                                                                                                                                                                        设置最小的转换数值，如果为 1 的话，只有大于 1 的值会被转换 |
| replace          |      boolean       |  false   | false                                               |                                                                                                                                                                                                                                                                              是否直接更换属性值，而不添加备用属性 |
| exclude          | regexp or regexp[] |  false   | undefined                                           |                                                                                                                                                                Ignore some files like 'node_modules', If value is regexp, will ignore the matches files. if value is array, the elements of the array are regexp. |
| include          | regexp or regexp[] |  false   | undefined                                           | (Regexp or Array of Regexp) If include is set, only matching files will be converted, for example, only files under src/mobile/ (include: /\/src\/mobile\//), If the value is regexp, the matching file will be included, otherwise it will be excluded. If value is array, the elements of the array are regexp. |
| transformRuntime |      boolean       |  false   | false                                               |                                                                                                                                                                                                                      自从 1.1.0 版本之后，设置 `transformation:true` 之后，可以转换被字符串模板嵌套的字符串表达式 |

## Demo

### Transform Runtime

开启`transformRuntime` 选项, 在字符串模板中所支持的表达式将按照如下处理:

**Note:** 仅以 `px`结尾的将被处理

#### 函数表达式

source code:

```javascript
import styled from 'styled-components';

export const FunctionExpression = styled.button`
  height: ${function (props) {
    return props.height;
  }}px;
`;
```

compiled:

```javascript
import styled from 'styled-components';

export const FunctionExpression = styled.button`
  height: ${(...args) =>
    _px2rem(function (props) {
      return props.height;
    }, ...args)};
`;

function _px2rem(input, ...args) {
  if (typeof input === 'function') return _px2rem(input(...args), ...args);
  var value = typeof input === 'string' ? parseFloat(input) : typeof input === 'number' ? input : 0;
  var pixels = Number.isNaN(value) ? 0 : value;
  if (Math.abs(pixels) < 0) return pixels + 'px';
  var mul = Math.pow(10, 5 + 1);
  return (Math.round(Math.floor(((pixels * 1) / 100) * mul) / 10) * 10) / mul + 'rem';
}
```

#### 箭头函数表达式

source code:

```javascript
export const ArrowFunction = styled.input.attrs((props) => ({
  type: 'password',
  size: props.size || '16px',
  width: props.width || 100,
}))`
  color: palevioletred;
  font-size: 14px;
  border: 1px solid palevioletred;
  border-radius: 8px; /* setting propList: ['*', '!border-*'] */
  width: ${(props) => props.width}px; /* PropertyAccess Body */
  height: ${() => height}px; /* Identifier Body */
  line-height: ${() => '44'}px; /* StringLiteral Body */
  margin: ${() => 32}px; /* NumericLiteral Body */
  padding: ${(props) => props.size};
`;

export const ArrowFunctionWithBlockBody = styled.button`
  width: ${(props) => {
    if (props.width) {
      return props.width;
    } else {
      return 0;
    }
  }}px; /* Block Body */

  ${(props) => (props.disabled ? 'height: 400px' : 'height: 200px')}
`;
export const ArrowFunctionWithBinaryBody = styled.button`
  ${(props) =>
    props.disabled &&
    `
      width: 200px;
      font-size: 14px;
    `};
  height: ${(props) => !props.disabled && props.height}px; /* ArrowFunction with a LogicalExpression Body */
  width: ${() => 44 + 50}px; /* ArrowFunction with a BinaryExpression Body */
`;
export const ArrowFunctionWithConditionalBody = styled.button`
  height: ${(props) => (props.height ? height : 100)}px; /* ArrowFunction with a ConditionalExpression Body */
`;
```

compiled:

```javascript
export const ArrowFunction = styled.input.attrs((props) => ({
  type: 'password',
  size: props.size || '16px',
  width: props.width || 100,
}))`
  color: palevioletred;
  font-size: 1.86667vw;
  border: 1px solid palevioletred;
  border-radius: 8px; /* setting propList: ['*', '!border-*'] */
  width: ${(props) => _px2vw(props.width)}; /* PropertyAccess Body */
  height: ${() => _px2vw(height)}; /* Identifier Body */
  line-height: ${() => _px2vw('44')}; /* StringLiteral Body */
  margin: ${() => _px2vw(32)}; /* NumericLiteral Body */
  padding: ${(props) => props.size};
`;

export const ArrowFunctionWithBlockBody = styled.button`
  width: ${(props) =>
    _px2vw(() => {
      if (props.width) {
        return props.width;
      } else {
        return 0;
      }
    })}; /* Block Body */

  ${(props) => (props.disabled ? 'height: 53.33333vw' : 'height: 26.66667vw')}
`;
export const ArrowFunctionWithBinaryBody = styled.button`
  ${(props) =>
    props.disabled &&
    `
      width: 26.66667vw;
      font-size: 1.86667vw;
    `};
  height: ${(props) => _px2vw(!props.disabled && props.height)}; /* ArrowFunction with a LogicalExpression Body */
  width: ${() => _px2vw(44 + 50)}; /* ArrowFunction with a BinaryExpression Body */
`;
export const ArrowFunctionWithConditionalBody = styled.button`
  height: ${(props) =>
    props.height ? _px2vw(height) : _px2vw(100)}; /* ArrowFunction with a ConditionalExpression Body */
`;
```

#### 条件表达式

source code

```javascript
export const ConditionalExpression = function ({ fontSize, spacing } = {}) {
  const StyledButton = styled.button`
    font-size: ${typeof fontSize === 'number' ? fontSize : (props) => props.theme.fontSize}px;
    ${spacing
      ? `
     padding: 8px 16px 0 32px;
     margin: 16px 0;
  `
      : ''}
  `;

  return <StyledButton />;
};
export const ConditionalExpressionWhenTrue = function ({ fontSize } = {}) {
  const StyledButton = styled.button`
    font-size: ${typeof fontSize !== 'number' ? (props) => props.theme.fontSize : fontSize}px;
  `;

  return <StyledButton />;
};
export const ConditionalExpressionWhenFalse = function ({ fontSize } = {}) {
  const StyledButton = styled.button`
    font-size: ${typeof fontSize === 'number' ? fontSize : 16}px;
  `;

  return <StyledButton />;
};
```

compiled:

```javascript
export const ConditionalExpression = function ({ fontSize, spacing } = {}) {
  const StyledButton = styled.button`
    font-size: ${typeof fontSize === 'number' ? _px2vw(fontSize) : (props) => _px2vw(props.theme.fontSize)};
    ${spacing
      ? `
     padding: 1.06667vw 2.13333vw 0 4.26667vw;
     margin: 2.13333vw 0;
  `
      : ''}
  `;
  return /*#__PURE__*/ React.createElement(StyledButton, null);
};
export const ConditionalExpressionWhenTrue = function ({ fontSize } = {}) {
  const StyledButton = styled.button`
    font-size: ${typeof fontSize !== 'number' ? (props) => _px2vw(props.theme.fontSize) : _px2vw(fontSize)};
  `;
  return /*#__PURE__*/ React.createElement(StyledButton, null);
};
export const ConditionalExpressionWhenFalse = function ({ fontSize } = {}) {
  const StyledButton = styled.button`
    font-size: ${typeof fontSize === 'number' ? _px2vw(fontSize) : _px2vw(16)};
  `;
  return /*#__PURE__*/ React.createElement(StyledButton, null);
};
const condition = false;
```

#### 其他表达式

Identifier, CallExpression, BinaryExpress, StringLiteral, NumericLiteral, MemberExpression, LogicalExpression...

### 禁用 transformRuntime (默认)

如果设置`transformRuntime:false`,所有被字符串模板嵌套的表达式都不被处理，代码如下:

<details>
  <summary>
   the input code show as below
  </summary>

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
  (props) =>
    ` display: inline; width: ${props.width}px; height: ${props.height}px; line-height: ${props.height}px; font-size: 16px;`,
);
```

</details>

<details>
  <summary>
   the output code show as below
  </summary>

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

</details>

### License

This project is licensed under the [MIT License](https://github.com/jackluson/babel-plugin-styled-components-px2vw/blob/master/LICENSE).
