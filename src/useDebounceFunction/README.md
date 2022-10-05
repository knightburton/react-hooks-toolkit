## useDebounceFunction

This allows you to debounce a function based on the given delay. The given `callback` will be executed after the timer hits the given `delay` . This can be usefule when you need to call a specific function as an event handler and you wants to prevent continous calls.

### Args and return value

```tsx
const useDebounceFunction = (callback: () => void, delay = 500): (() => void) => {
  // ...
};
```

### Usage

```tsx
import React, { useState, useEffect } from 'react';
import { useDebounceFunction } from '@knightburton/react-hooks-toolkit';

const App = (): JSX.Element => {
  const [value, setValue] = useState<string>('');
  // Note: the default delay value is 500.
  const debouncedLog = useDebounceFunction(console.log);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    // With this your console log will appear only when finished typing inside the input field.
    debouncedLog('Your new value is:', event.target.value);
  };

  return <input type="text" value={value} onChange={handleChange} />;
};

export default App;
```
