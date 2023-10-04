## usePrevious

This allows you to archive almost the same behavior like the old class component lifecycle method `componentDidUpdate` give you. Store a value previous state and use it for anything that you want.

### Args and return value

```tsx
const usePrevious = <T>(value: T): MutableRefObject<T | undefined>['current'] => {
  // ....
};
```
Where `MutableRefObject` comes form `React`.

### Usage

```tsx
import React, { useState } from 'react';
import { usePrevious } from '@knightburton/react-hooks-toolkit';

const App = () => {
  const [value, setValue] = useState<number>(0);
  const previousValue = usePrevious<number>(value);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setValue(Math.floor(Math.random() * 101));
  };

  return (
    <>
      <p>The previous random number <strong>{previousValue || 0}</strong></p>
      <p>The current random number <strong>{value}</strong></p>
      <input type="button" value="Random" onClick={handleClick} />;
    </>
  );
};

export default App;
```
