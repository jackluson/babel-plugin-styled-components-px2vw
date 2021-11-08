import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import { ThemeProvider } from 'styled-components';
import {
  StyledButton,
  SizeableButton,
  LineHeightButton,
  MixinsButton,
  GlobalStyle,
  ExtendButton,
  Input,
  ThemeConsumer,
} from '../index';

const div = document.createElement('div');

beforeEach(() => {
  document.body.appendChild(div);
});

afterEach((...args) => {
  ReactDOM.unmountComponentAtNode(div);
  document.body.removeChild(div);
});

it('should render <Input/>', function () {
  TestUtils.act(() => {
    ReactDOM.render(<Input id="inputId" width={320} />, div);
  });
  const input = div.querySelector('input#inputId');
  if (input) {
    const style = getComputedStyle(input);
    expect(style.color).toBe('palevioletred');
    expect(style.fontSize).toBe('1.86667vw');
    expect(style.border).toBe('1px solid palevioletred');
    expect(style.borderRadius).toBe('8px');
    expect(style.width).toBe('42.66667vw');
    expect(style.padding).toBe('16px');
  } else {
    throw new Error('Input should be render');
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
  expect(style.minHeight).toBe('106.66667vw');
});

it('should render <MixinsButton/>', function () {
  TestUtils.act(() => {
    ReactDOM.render(<MixinsButton id="btnId" />, div);
  });
  const button = div.querySelector('button#btnId');
  if (button) {
    const style = getComputedStyle(button);
    expect(style.display).toBe('block');
    expect(style.padding).toBe('0px 2.13333vw');
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

it('should render <ExtendButton/>', function () {
  TestUtils.act(() => {
    ReactDOM.render(<ExtendButton id="btnId" padding={64} />, div);
  });
  const button = div.querySelector('button#btnId');
  if (button) {
    const style = getComputedStyle(button);
    expect(style.fontSize).toBe('1.86667vw');
    expect(style.height).toBe('4.26667vw');
    expect(style.width).toBe('13.33333vw');
    expect(style.padding).toBe('8.53333vw');
    expect(style.marginTop).toBe('1.6vw');
  } else {
    throw new Error('ExtendButton should be render');
  }
});

it('should render <LineHeightButton/>', function () {
  TestUtils.act(() => {
    ReactDOM.render(<LineHeightButton id="btnId" width="160" />, div);
  });
  const button = div.querySelector('button#btnId');
  if (button) {
    const style = getComputedStyle(button);
    expect(style.lineHeight).toBe('5.86667vw');
    expect(style.width).toBe('21.33333vw');
  } else {
    throw new Error('LineHeightButton should be render');
  }
});

it('should render <SizeableButton/>', function () {
  TestUtils.act(() => {
    ReactDOM.render(<SizeableButton id="btnId" width={200} height="44px" />, div);
  });
  const button = div.querySelector('button#btnId');
  if (button) {
    const style = getComputedStyle(button);
    expect(style.display).toBe('inline');
    expect(style.fontSize).toBe('2.13333vw');
    expect(style.height).toBe('44px');
    expect(style.width).toBe('26.66667vw');
  } else {
    throw new Error('SizeableButton should be render');
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
