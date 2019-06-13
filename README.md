## Overview

React HOC that passes the output of a custom hook as props to a presentational component

### Installation

```
  yarn add withHook
```

### Example Usage

```
  import {withHook} from 'withHook';

  // Our custom hook. The returned values will be passed as props to our wrapped Presentational Component
  function useCount(initialValue?: number) {
    const [count, setCount] = React.useState(initialValue || 0);

    const increment = React.useCallback(() => setCount(x => x + 1), []);
    const decrement = React.useCallback(() => setCount(x => x - 1), []);

    return { count, increment, decrement };
  }

  interface CounterProps {
    count: number;
    increment: () => void;
    decrement: () => void;
  }

  // presentational component - props => UI
  const Counter: React.FC<CounterProps> = ({ count, increment, decrement }) => (
    <>
      <button onClick={increment}>increment</button>
      <button onClick={decrement}>decrement</button>
      <div>Count: {count}</div>
    </>
  );

  // Wrap our Counter presentational component with our HOC
  const WrappedCounter = withCustomHook(useCount)(Counter);

  // You can pass the custom hook's params as props on the wrapped components

  <WrappedCounter initialValue={10}>
```
