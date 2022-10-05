import { act, renderHook } from '@testing-library/react-hooks';
import useDebounceFunction from '../../src/useDebounceFunction';

describe('useDebounceFunction', () => {
  const callback = jest.fn();
  const callbackTheSecond = jest.fn();

  beforeAll(() => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');
    jest.spyOn(global, 'clearTimeout');
  });

  afterEach(() => {
    jest.clearAllTimers();
    callback.mockClear();
  });

  afterAll(() => {
    jest.useRealTimers();
    callback.mockClear();
  });

  test('should return a normal debounce callback function', () => {
    const { result, unmount } = renderHook(() => useDebounceFunction(callback));

    expect(setTimeout).toHaveBeenCalled();
    expect(callback).not.toHaveBeenCalled();
    expect(typeof result.current).toEqual('function');
    act(() => {
      result.current();
    });
    expect(callback).not.toHaveBeenCalled();
    act(() => {
      jest.runAllTimers();
    });
    expect(callback).toHaveBeenCalled();
    unmount();
  });

  test('should call the unmount clear timeout', () => {
    const { result, unmount } = renderHook(() => useDebounceFunction(callback));

    expect(callback).toHaveBeenCalledTimes(0);
    expect(typeof result.current).toEqual('function');
    unmount();
    expect(clearTimeout).toHaveBeenCalledTimes(1);
  });

  test('should use debounce function with custom delay', () => {
    const { result, unmount } = renderHook(() => useDebounceFunction(callback, 32));

    expect(typeof result.current).toEqual('function');
    expect(callback).toHaveBeenCalledTimes(0);
    act(() => {
      result.current();
    });
    expect(callback).toHaveBeenCalledTimes(0);
    act(() => {
      jest.advanceTimersByTime(31);
    });
    expect(callback).toHaveBeenCalledTimes(0);
    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(callback).toHaveBeenCalledTimes(1);
    unmount();
  });

  test('should use debounce function with custom delay and adjusted delay', () => {
    const { result, rerender, unmount } = renderHook(({ cb, delay }) => useDebounceFunction(cb, delay), {
      initialProps: { cb: callback, delay: 64 },
    });

    act(() => {
      result.current();
    });
    expect(callback).toHaveBeenCalledTimes(0);
    act(() => {
      jest.advanceTimersByTime(64);
    });
    expect(callback).toHaveBeenCalledTimes(1);
    act(() => {
      rerender({ cb: callback, delay: 128 });
    });
    expect(callback).toHaveBeenCalledTimes(1);
    act(() => {
      result.current();
      jest.advanceTimersByTime(64);
    });
    expect(callback).toHaveBeenCalledTimes(1);
    act(() => {
      jest.runAllTimers();
    });
    expect(callback).toHaveBeenCalledTimes(2);
    unmount();
  });

  test('should use an updated debounce function', () => {
    const { result, rerender, unmount } = renderHook(({ cb, delay }) => useDebounceFunction(cb, delay), {
      initialProps: { cb: callback, delay: 256 },
    });

    act(() => {
      result.current();
    });
    expect(callback).toHaveBeenCalledTimes(0);
    act(() => {
      jest.advanceTimersByTime(256);
    });
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callbackTheSecond).toHaveBeenCalledTimes(0);
    act(() => {
      rerender({ cb: callbackTheSecond, delay: 256 });
      result.current();
    });
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callbackTheSecond).toHaveBeenCalledTimes(0);
    act(() => {
      jest.runAllTimers();
    });
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callbackTheSecond).toHaveBeenCalledTimes(1);
    unmount();
  });
});
