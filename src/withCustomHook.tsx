import * as React from 'react';
import {mapPropsToParams} from './helpers';

// Omit taken from https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

// signature for custom hook that accepts arbitrary params and returns some object
type CustomHook<TParams, TResult> = (...args: TParams[]) => TResult;

// type for our HOC that receives a component and injects the result of our hook call
interface HookHOC<TInjectedProps, TNeedsProps = {}> {
  <P extends TInjectedProps>(
    component: React.ComponentType<P>,
  ): React.ComponentType<Omit<P, keyof TInjectedProps> & TNeedsProps>;
}

export const withCustomHook = <TParams, TInjected, TNeedsProps>(
  useCustomHook: CustomHook<TParams, TInjected>,
): HookHOC<TInjected, TNeedsProps> => (
  WrappedComponent: React.ComponentType<TInjected>,
) => (props: TParams & TNeedsProps) => {
  const injectedProps = useCustomHook(
    mapPropsToParams(props as TParams, useCustomHook),
  );

  return <WrappedComponent {...injectedProps} {...props as TNeedsProps} />;
};
