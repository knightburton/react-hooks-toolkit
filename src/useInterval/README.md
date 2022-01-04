## useInterval

This allows you to use the well known [setInterval](https://developer.mozilla.org/en-US/docs/Web/API/setInterval) method inside a React Functional Component. When the `delay` reached, the callback is executed, and again, and again... This could be great to polling for example.

### Args and return value

```tsx
const useInterval = (callback: () => void, delay: number | null): void => {
  // ....
};
```

### Usage

```tsx
import React, { useState } from 'react';
import { useInterval } from '@knightburton/react-hooks-toolkit';

const App = () => {
  const [list, setList] = useState<string[]>([]);

  const apiFetch = async (): void => {
    // Minimal fetch... you get the idea ;)
    const response = await fetch(/* ... */);
    const result = (await response.json()) as string[];
    setList(result);
  });

  // useInterval for polling an API endpoint every 15 seconds
  useInterval(() => {
    apiFetch();
  }, 15000);

  return (
    <ul>
      {list.map(item => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
};

export default App;
```
