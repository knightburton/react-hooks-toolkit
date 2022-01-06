import { useReducer, Reducer, useEffect, useRef } from 'react';

interface State<T> {
  data?: T;
  loading: boolean;
  error?: Error;
}

enum ActionTypes {
  Loading = 'LOADING',
  Success = 'SUCCESS',
  Failure = 'FAILURE',
}

type Payload<T> = {
  [ActionTypes.Loading]: boolean;
  [ActionTypes.Success]: T;
  [ActionTypes.Failure]: Error;
};

type ActionMap<M extends { [key: string]: any }> = {
  [Key in keyof M]: { type: Key; payload: M[Key] };
};

type Actions<T> = ActionMap<Payload<T>>[keyof ActionMap<Payload<T>>];

const reducer = <T>(state: State<T>, action: Actions<T>): State<T> => {
  if (action.type === ActionTypes.Success) return { ...state, data: action.payload, loading: false, error: undefined };
  if (action.type === ActionTypes.Failure) return { ...state, error: action.payload, loading: false, data: undefined };
  return { ...state, loading: action.payload };
};

const useFetch = <T extends unknown>(url?: string, options?: RequestInit): State<T> => {
  const cancel = useRef<boolean>(false);
  const [state, dispatch] = useReducer<Reducer<State<T>, Actions<T>>>(reducer, {
    data: undefined,
    loading: false,
    error: undefined,
  });

  useEffect(() => {
    if (!url) return undefined;

    const execute = async () => {
      dispatch({ type: ActionTypes.Loading, payload: true });
      try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error(response.statusText);
        if (![204, 205].includes(response.status)) {
          const contentType: string | null = response.headers.get('content-type');
          const data = (await (contentType && /^application\/json/.test(contentType) ? response.json() : response.text())) as T;
          if (!cancel.current) dispatch({ type: ActionTypes.Success, payload: data });
        } else if (!cancel.current) {
          dispatch({ type: ActionTypes.Loading, payload: false });
        }
      } catch (error) {
        if (!cancel.current) dispatch({ type: ActionTypes.Failure, payload: error as Error });
      }
    };

    execute();

    return () => {
      cancel.current = true;
    };
  }, [url, options]);

  return state;
};

export default useFetch;
