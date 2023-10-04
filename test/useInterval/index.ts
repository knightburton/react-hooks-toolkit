import { renderHook } from '@testing-library/react-hooks';
import useInterval from '../../src/useInterval';

const callback = jest.fn(() => {});

describe('useInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setInterval');
    jest.spyOn(global, 'clearInterval');
  });

  afterEach(() => {
    jest.clearAllTimers();
    callback.mockClear();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should do nothing when delay is null', () => {
    const { unmount } = renderHook(() => useInterval(callback, null));

    expect(setInterval).not.toHaveBeenCalled();
    expect(callback).not.toHaveBeenCalled();
    unmount();
    expect(clearInterval).not.toHaveBeenCalled();
  });

  test('should call the callback after delay and clear the interval after unmount', () => {
    const { unmount } = renderHook(() => useInterval(callback, 500));

    expect(setInterval).toHaveBeenCalled();
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(500);
    expect(callback).toHaveBeenCalled();
    unmount();
    expect(clearInterval).toHaveBeenCalled();
  });

  test('should call the callback multiple times', () => {
    const { unmount } = renderHook(() => useInterval(callback, 200));

    expect(setInterval).toHaveBeenCalled();
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(600);
    expect(callback).toHaveBeenCalledTimes(3);
    unmount();
    expect(clearInterval).toHaveBeenCalled();
  });
});
