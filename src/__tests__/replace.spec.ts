import { replace } from '../replace';

describe('replace()', () => {
  it('should work', function () {
    expect(
      replace(
        `
          display: block;
          margin: 0 18px;
          width: 200px;
          height: 44px;
          line-height: 44px;
          border: 1px solid red;
          border-radius:8px;
          padding: 8px 16px 32px 40px;
          font-size: 14px;
          transform: translate(100px, 200px);`,
      ),
    ).toBe(
      `
          display: block;
          margin: 0 2.4vw;
          width: 26.66667vw;
          height: 5.86667vw;
          line-height: 5.86667vw;
          border: 1px solid red;
          border-radius:1.06667vw;
          padding: 1.06667vw 2.13333vw 4.26667vw 5.33333vw;
          font-size: 1.86667vw;
          transform: translate(13.33333vw, 26.66667vw);`,
    );

    expect(replace(`div {font-size: 23px`)).toBe(`div {font-size: 3.06667vw`);
    expect(
      replace(
        `.icon {
          background: url("http://ji"); /*:// */
          width: 24px;
          height: 23px;
        }`,
      ),
    ).toBe(
      `.icon {
          background: url("http://ji"); /*:// */
          width: 3.2vw;
          height: 3.06667vw;
        }`,
    );

    expect(replace('\nhtml body {\n  font-size: 16px;\n}\n')).toBe('\nhtml body {\n  font-size: 2.13333vw;\n}\n');

    expect(replace('\n  &:last-child {\n    border: none')).toBe('\n  &:last-child {\n    border: none');
  });
  it('should support multi-level code blocks', () => {
    expect(
      replace(`
  & {
    footer {
      height: 80px;
      background: green;
    }

    header {
      height: 45px;
      background: yellow;
    }
  }`),
    ).toBe(`
  & {
    footer {
      height: 10.66667vw;
      background: green;
    }

    header {
      height: 6vw;
      background: yellow;
    }
  }`);
    expect(
      replace(`
    & footer {
      height: 80px;
      background: green;
    }

    & header {
      height: 45px;
      background: yellow;
    }`),
    ).toBe(`
    & footer {
      height: 10.66667vw;
      background: green;
    }

    & header {
      height: 6vw;
      background: yellow;
    }`);
  });
});
