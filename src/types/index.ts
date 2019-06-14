// signature for custom hook that accepts arbitrary params and returns some object
export type CustomHook<TParams, TResult> = (...args: TParams[]) => TResult;
