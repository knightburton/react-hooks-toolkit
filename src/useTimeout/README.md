## useTimeout

This allows you to use the well known [setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout) method inside a React Functional Component. Very similar to the `useInterval` hook. When the `delay` reached, the callback is executed. Could be great to hide or display something with delay.

### Args and return value

```tsx
const useTimeout = (callback: () => void, delay: number | null): void => {
  // ....
};
```

### Usage

```tsx
import React, { useState } from 'react';
import { useTimeout } from '@knightburton/react-hooks-toolkit';

const App = () => {
  const [visible, setVisible] = useState<boolean>(false);

  useTimeout(() => setVisible(false), 1000);

  return (
    <p>
      The following message is important, you must remember to it!
      <strong>{visible ? 'The naswer is 42.' : 'I hope you catched it ;)'}</strong>
    </p>
  );
};

export default App;
```
