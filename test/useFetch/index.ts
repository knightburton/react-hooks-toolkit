import { renderHook, cleanup } from '@testing-library/react-hooks';
import fetchMock from 'jest-fetch-mock';
import useFetch from '../../src/useFetch';

const mockPlainText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
const mockUrl = 'https://loripsum.net/api/1/short/plaintext';
const mockError = new Error('No!');
const mockErrorStatusText = 'Next time mate...';

describe('useFetch', (): void => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach((): void => {
    cleanup();
    fetchMock.resetMocks();
    jest.useRealTimers();
  });

  test('should do nothing since url is undefined', async (): Promise<void> => {
    const { result } = renderHook(() => useFetch<string>());

    expect(result.current.data).toEqual(undefined);
    expect(result.current.loading).toEqual(false);
    expect(result.current.error).toEqual(undefined);
  });

  test('should return data as usual', async (): Promise<void> => {
    fetchMock.mockResponseOnce(mockPlainText);
    const { result, waitForNextUpdate } = renderHook(() => useFetch<string>(mockUrl));

    expect(fetch).toHaveBeenCalledWith(mockUrl, undefined);
    expect(result.current.data).toEqual(undefined);
    expect(result.current.loading).toEqual(true);
    expect(result.current.error).toEqual(undefined);
    await waitForNextUpdate();
    expect(result.current.data).toEqual(mockPlainText);
    expect(result.current.loading).toEqual(false);
    expect(result.current.error).toEqual(undefined);
  });

  test('should return data as application/json', async (): Promise<void> => {
    fetchMock.mockResponseOnce(() => new Promise(resolve => resolve({ body: JSON.stringify({ mockPlainText }), headers: { 'content-type': 'application/json' } })));
    const { result, waitForNextUpdate } = renderHook(() => useFetch<string>(mockUrl));

    await waitForNextUpdate();
    expect(result.current.data).toEqual({ mockPlainText });
    expect(result.current.loading).toEqual(false);
    expect(result.current.error).toEqual(undefined);
  });

  test('should return data as text with missing content-type', async (): Promise<void> => {
    fetchMock.mockResponseOnce(() => new Promise(resolve => resolve({ body: JSON.stringify({ mockPlainText }), headers: {} })));
    const { result, waitForNextUpdate } = renderHook(() => useFetch<string>(mockUrl));

    await waitForNextUpdate();
    expect(result.current.data).toEqual(JSON.stringify({ mockPlainText }));
    expect(result.current.loading).toEqual(false);
    expect(result.current.error).toEqual(undefined);
  });

  test('should return error', async (): Promise<void> => {
    fetchMock.mockRejectOnce(mockError);
    const { result, waitForNextUpdate } = renderHook(() => useFetch<string>(mockUrl));

    await waitForNextUpdate();
    expect(result.current.data).toEqual(undefined);
    expect(result.current.loading).toEqual(false);
    expect(result.current.error).toEqual(mockError);
  });

  test('should return not ok response', async (): Promise<void> => {
    fetchMock.mockResponseOnce(() => new Promise(resolve => resolve({ status: 400, statusText: mockErrorStatusText })));
    const { result, waitForNextUpdate } = renderHook(() => useFetch<string>(mockUrl));

    await waitForNextUpdate();
    expect(result.current.data).toEqual(undefined);
    expect(result.current.loading).toEqual(false);
    expect(result.current.error).toStrictEqual(new Error(mockErrorStatusText));
  });

  test('should return with not ok response', async (): Promise<void> => {
    fetchMock.mockRejectOnce(mockError);
    const { result, waitForNextUpdate } = renderHook(() => useFetch<string>(mockUrl));

    await waitForNextUpdate();
    expect(result.current.data).toEqual(undefined);
    expect(result.current.loading).toEqual(false);
    expect(result.current.error).toEqual(mockError);
  });

  test('should skip the response parse', async (): Promise<void> => {
    fetchMock.mockResponseOnce(mockPlainText, { status: 204 });
    const { result, waitForNextUpdate } = renderHook(() => useFetch<string>(mockUrl));

    expect(result.current.data).toEqual(undefined);
    expect(result.current.loading).toEqual(true);
    expect(result.current.error).toEqual(undefined);
    await waitForNextUpdate();
    expect(result.current.data).toEqual(undefined);
    expect(result.current.loading).toEqual(false);
    expect(result.current.error).toEqual(undefined);
  });
});
