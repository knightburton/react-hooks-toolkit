import { act, renderHook } from '@testing-library/react-hooks';
import useDebounce from '../../src/useDebounce';

describe('useDebounce', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');
    jest.spyOn(global, 'clearTimeout');
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should return the initial value', () => {
    const { result, unmount } = renderHook(({ value }) => useDebounce<number>(value), {
      initialProps: { value: 1 },
    });

    expect(setTimeout).toHaveBeenCalled();
    expect(result.current).toBe(1);
    unmount();
  });

  test('should call the unmount clear timeout', () => {
    const { result, unmount } = renderHook(({ value }) => useDebounce<number>(value), {
      initialProps: { value: 2 },
    });

    expect(result.current).toBe(2);
    unmount();
    expect(clearTimeout).toHaveBeenCalled();
  });

  test('should debounce the value with initial delay', () => {
    const { result, rerender, unmount } = renderHook(({ value }) => useDebounce<number>(value), {
      initialProps: { value: 3 },
    });

    expect(result.current).toBe(3);
    act(() => {
      rerender({ value: 3333 });
    });
    expect(result.current).toBe(3);
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(result.current).toBe(3333);
    unmount();
  });

  test('should debounce the value with custom delay', () => {
    const { result, rerender, unmount } = renderHook(({ value }) => useDebounce<number>(value, 763), {
      initialProps: { value: 4 },
    });

    expect(result.current).toBe(4);
    act(() => {
      rerender({ value: 4444 });
    });
    expect(result.current).toBe(4);
    act(() => {
      jest.advanceTimersByTime(760);
    });
    expect(result.current).toBe(4);
    act(() => {
      jest.advanceTimersByTime(3);
    });
    expect(result.current).toBe(4444);
    unmount();
  });
});
