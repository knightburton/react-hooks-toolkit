## useFetch

Lightweight native [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) functionality for Functional Components. The fetch is executed when the component is mounted and if the url changes.

### Args and return value
```tsx
const useFetch = <T extends unknown>(url?: string, options?: RequestInit): State<T> => {
  // ...
};
```
Where `RequestInit` is a "native" interface and the returned `State` is
```tsx
interface State<T> {
  data?: T;
  loading: boolean;
  error?: Error;
}
```

### Usage

```tsx
import { useFetch } from '@knightburton/react-hooks-toolkit';

const App = () => {
  const { data, loading, error } = useFetch<string>('https://loripsum.net/api/1/long/plaintext');

  return (
    <div>
      {loading && <p>Be patient...</p>}
      {error && <p>Okay, you have a problem: {error.message}</p>}
      {data && (
        <div>
          <p>You have to memorize the following text:</p>
          <p>{data}</p>
        </div>
      )}
    </div>
  );
};

export default App;
```
