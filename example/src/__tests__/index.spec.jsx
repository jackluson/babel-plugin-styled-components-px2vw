import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import { ThemeProvider } from 'styled-components';
import {
  MemberExpression,
  ArrowFunctionExpressionWithBlockBody,
  StyledButton,
  MixinsButton,
  GlobalStyle,
  ExtendStyledButton,
  ThemeConsumer,
  ConditionalExpression,
} from '../index.jsx';

const div = document.createElement('div');

beforeEach(() => {
  document.body.appendChild(div);
});

afterEach((...args) => {
  ReactDOM.unmountComponentAtNode(div);
  document.body.removeChild(div);
});


it("should transform <ConditionalExpression/> with ThemeProvider's fontSize", function() {
  TestUtils.act(() => {
    ReactDOM.render(
      <ThemeProvider theme={{ fontSize: 48 }}>
        <ConditionalExpression />
      </ThemeProvider>,
      div,
    );
  });
  const button = div.querySelector('button');
  if (button) {
    const style = getComputedStyle(button);
    expect(style.fontSize).toBe('6.4vw');
  } else {
    throw new Error('ConditionalExpression should be render');
  }
});

it('should transform <ConditionalExpression/> with self fontSize', function() {
  TestUtils.act(() => {
    ReactDOM.render(
      <ThemeProvider theme={{ fontSize: 48 }}>
        <ConditionalExpression fontSize={24} />
      </ThemeProvider>,
      div,
    );
  });
  const button = div.querySelector('button');
  if (button) {
    const style = getComputedStyle(button);
    expect(style.fontSize).toBe('3.2vw');
  } else {
    throw new Error('ConditionalExpression should be render');
  }
});

it('should render <GlobalStyle/>', function () {
  TestUtils.act(() => {
    ReactDOM.render(
      <>
        <GlobalStyle />
      </>,
      div,
    );
  });
  const style = getComputedStyle(document.body);
  expect(style.fontSize).toBe('2.4vw');
  expect(style.width).toBe('136.53333vw');
});

it('should render <MixinsButton/>', function () {
  TestUtils.act(() => {
    ReactDOM.render(<MixinsButton id="btnId" />, div);
  });
  const button = div.querySelector('button#btnId');
  if (button) {
    const style = getComputedStyle(button);
    expect(style.display).toBe('block');
    expect(style.padding).toBe('-1px 2.13333vw');
    expect(style.margin).toBe('2.13333vw 4.26667vw 2.13333vw 4.26667vw');
    expect(style.lineHeight).toBe('4.26667vw');
    expect(style.width).toBe('100%');
    expect(style.height).toBe('6.66667vw');
  } else {
    throw new Error('MixinsButton should be render');
  }
});

it('should render <StyledButton/>', function () {
  TestUtils.act(() => {
    ReactDOM.render(<StyledButton id="btnId" />, div);
  });
  const button = div.querySelector('button#btnId');
  if (button) {
    const style = getComputedStyle(button);
    expect(style.fontSize).toBe('1.86667vw');
    expect(style.height).toBe('4.26667vw');
    expect(style.width).toBe('16vw');
  } else {
    throw new Error('StyledButton should be render');
  }
});

it('should render <ExtendStyledButton/>', function () {
  TestUtils.act(() => {
    ReactDOM.render(<ExtendStyledButton id="btnId" padding={64} />, div);
  });
  const button = div.querySelector('button#btnId');
  if (button) {
    const style = getComputedStyle(button);
    expect(style.fontSize).toBe('1.86667vw');
    expect(style.height).toBe('4.26667vw');
    expect(style.width).toBe('16vw');
    expect(style.padding).toBe('8.53333vw');
  } else {
    throw new Error('ExtendStyledButton should be render');
  }
});

it('should transform MemberExpression/>', function() {
  TestUtils.act(() => {
    ReactDOM.render(<MemberExpression id="btnId" width={200} height="44px" />, div);
  });
  const button = div.querySelector('button#btnId');
  if (button) {
    const style = getComputedStyle(button);
    expect(style.display).toBe('inline');
    expect(style.fontSize).toBe('2.13333vw');
    expect(style.height).toBe('44px');
    expect(style.width).toBe('26.66667vw');
  } else {
    throw new Error('PropertyAccessExpression should be render');
  }
});


it('should render <ThemeConsumer/>', function () {
  TestUtils.act(() => {
    ReactDOM.render(
      <ThemeProvider theme={{ fontSize: 18, color: '#000000' }}>
        <ThemeConsumer id="consumer" />
      </ThemeProvider>,
      div,
    );
  });
  const consumer = div.querySelector('div#consumer');
  if (consumer) {
    const style = getComputedStyle(consumer);
    expect(style.fontSize).toBe('2.4vw');
    expect(style.color).toBe('rgb(0, 0, 0)');
  } else {
    throw new Error('ThemeConsumer should be render');
  }
});
