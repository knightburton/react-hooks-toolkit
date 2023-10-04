import { renderHook } from '@testing-library/react-hooks';
import useTimeout from '../../src/useTimeout';

const callback = jest.fn(() => {});

describe('useTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.spyOn(global, 'clearTimeout');
  });

  afterEach(() => {
    jest.clearAllTimers();
    callback.mockClear();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should do nothing when delay is null', () => {
    const { unmount } = renderHook(() => useTimeout(callback, null));

    expect(callback).not.toHaveBeenCalled();
    unmount();
    expect(clearTimeout).not.toHaveBeenCalled();
  });

  test('should call the callback after delay and clear the interval after unmount', () => {
    const { unmount } = renderHook(() => useTimeout(callback, 200));

    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalled();
    unmount();
    expect(clearTimeout).toHaveBeenCalled();
  });

  test('should call the callback after delay change', () => {
    const { unmount, rerender } = renderHook(({ delay }) => useTimeout(callback, delay), { initialProps: { delay: 300 } });

    expect(callback).toHaveBeenCalledTimes(0);
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);
    rerender({ delay: 333 });
    jest.advanceTimersByTime(333);
    expect(callback).toHaveBeenCalledTimes(2);
    unmount();
    expect(clearTimeout).toHaveBeenCalled();
  });
});
