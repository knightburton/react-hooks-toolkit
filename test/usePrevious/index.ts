import { renderHook } from '@testing-library/react-hooks';
import usePrevious from '../../src/usePrevious';

describe('usePrevious', () => {
  test('should return undefined for first', () => {
    const { result, rerender, unmount } = renderHook(() => usePrevious<string>('amIPrevious'));

    expect(result.current).toEqual(undefined);
    rerender();
    expect(result.current).toEqual('amIPrevious');
    unmount();
  });

  test('should return previous veluas after each rerender', () => {
    const { result, rerender, unmount } = renderHook(({ value }) => usePrevious<string>(value), { initialProps: { value: 'firstValue' } });

    expect(result.current).toEqual(undefined);
    rerender();
    expect(result.current).toEqual('firstValue');
    rerender({ value: 'secondValue' });
    expect(result.current).toEqual('firstValue');
    rerender({ value: 'thirdValue' });
    expect(result.current).toEqual('secondValue');
    unmount();
  });
});
