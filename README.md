# react-hooks-toolkit

[![Development Workflow](https://github.com/knightburton/react-hooks-toolkit/actions/workflows/development.yml/badge.svg)](https://github.com/knightburton/react-hooks-toolkit/actions/workflows/development.yml)
![npm](https://img.shields.io/npm/v/@knightburton/react-hooks-toolkit)
![npm](https://img.shields.io/npm/dt/@knightburton/react-hooks-toolkit)

The most commonly used custom react hooks in one place.

Unlike the other packages like this, it only targets core custom hooks to keep everything on minimal.
These core custom hooks are the following:
- [useDebounce](/src/useDebounce/README.md)
- [useInterval](/src/useInterval/README.md)
- [usePrevious](/src/usePrevious/README.md)
- [useTimeout](/src/useTimeout/README.md)

### Getting started
#### Compatibility
Your project needs to use [React.js](https://reactjs.org/) 16.9 or later.

#### Installation
```bash
$ npm i @knightburton/react-hooks-toolkit
```
or
```bash
yarn add @knightburton/react-hooks-toolkit
```

### Usage
Here's an example of basic usage:
```jsx
import { useState } from 'react';
import { usePrevious } from '@knightburton/react-hooks-toolkit';

const App = () => {
  const [text, setText] = useState('some text');
  const previousText = usePrevious(text);

  return (
    <div>
      <p>Previous text is: <span>{previousText}</span></p>
      <p>Current text is: <span>{text}</span></p>
    </div>
  );
};

export default App;
```
For more example visit each hooks own documentation.

### Development
Run rollup to watch your `src/` module and automatically recompile it into `dist/` whenever you make changes.
```bash
# Assume that you are in the project main folder
$ npm i
$ npm start
```

### Contributing
First off all, thanks for taking the time to contribute! :muscle:

Before any action, please visit the [Code of Conduct](https://github.com/knightburton/react-hooks-toolkit/blob/main/CODE_OF_CONDUCT.md) and [Contributing guideline](https://github.com/knightburton/react-hooks-toolkit/blob/main/CONTRIBUTING.md) for more information.

### License

`react-hooks-toolkit` is Open Source software under the MIT license. Complete license and copyright information can be found within the [license](https://github.com/knightburton/react-hooks-toolkit/blob/main/LICENSE).
