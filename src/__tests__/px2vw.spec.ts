import { px2vw } from '../px2vw';

describe('px2vw()', () => {
  it('should work', function () {
    expect(px2vw(7.5)).toBe('1vw');
    expect(px2vw(16)).toBe('2.13333vw');
    expect(px2vw(null)).toBe('0px');
    expect(px2vw(undefined)).toBe('0px');
    expect(px2vw('px')).toBe('0px');
  });
});
