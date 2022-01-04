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
  switch (action.type) {
    case ActionTypes.Loading:
      return { ...state, loading: action.payload };
    case ActionTypes.Success:
      return { ...state, data: action.payload, loading: false };
    case ActionTypes.Failure:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
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
      if (!cancel.current) dispatch({ type: ActionTypes.Loading, payload: true });
      try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error(response.statusText);
        if (![204, 205].includes(response.status)) {
          const data = (await (/^application\/json/.test(response.headers.get('content-type') || '') ? response.json() : response.text())) as T;
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
