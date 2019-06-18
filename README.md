## Overview

React HOC that passes the output of a custom hook as props to a presentational component.
The idea is that we can utilize hooks in an idiomatic way and still get reasonable separation of concerns between stateful logic and UI. This pattern allows us to easily inject the output of a custom hook into any component.

`withCustomHook` is written in Typescript so you will get type inference out of the box for props passed to the resutling HOC

NOTE: There is currently a limitation on how parameters must be passed to the custom hooked passed into the HOC. 
The hook must accept a single arugment in the form of an object. Future versions will hopefully lift this constraint and provide an even more flexible API but for now, passing a config object is a pretty standard JS/TS practice.

### Installation

```
  yarn add with-custom-hook
```

### Example Usage

```
  import withHook from 'with-custom-hook';

  // Our custom hook. The returned values will be passed as props to our wrapped Presentational Component
  interface HookConfig {
    initialValue?: number
  }
  
  function useCount({initialValue}: HookConfig) {
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
