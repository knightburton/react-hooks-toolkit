## useDebounce

This allows you to debounce a fast chaning value with the help of an internal timer. The given `value` will be returned after the timer hits the given `delay` (if there is no new change on value). This can be usefule when you need to hit an API endpoint with a fast changing value (a live search for example).

### Usage

```tsx
import React, { useState, useEffect } from 'react';
import { useDebounce } from '@knightburton/react-hooks-toolkit';

const App = () => {
  const [value, setValue] = useState<string>('');
  // Note: the default delay value is 500.
  const debouncedValue = useDebounce<string>(value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    // Call API endpoint / dispatch action here with the debounced value...
  }, [debouncedValue]);

  return <input type="text" value={value} onChange={handleChange} />;
};

export default App;
```
