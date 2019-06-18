import * as React from 'react';
import { mapPropsToParams } from './helpers';
// import { CustomHook } from './types';

// type for our HOC that receives a component and injects the result of our hook call
interface HookHOC<TInjectedProps, TParamProps> {
  <P extends TInjectedProps>(component: React.ComponentType<P>): React.FC<
    Omit<P, keyof TInjectedProps> & TParamProps
  >;
}

type Hook<T extends (...args: any[]) => any> = (
  ...args: Parameters<T>
) => ReturnType<T>;

/**
 * TODO: using Parameters<T> isn't going to work by itself to get us the type
 * we need to use for the parameter props on our wrapper component.
 *
 * If we want this to work with named params, we are going to have to create
 * a function to get the param names from the hook and then generate a type
 * dynamically using the param names + the types from the result of Parameters<T>
 *
 * I think this can be accomplished but need to think about whether it's worth
 * it to add to the api.
 *
 * Ideally, our hook could take named params or a config object so the user would have the choice.
 *
 * Also, for the most flexibility, we should probably add an overload for withCustomHook that allows passing the hook
 * params as the second argument(as in the original POC)
 */

export const withCustomHook = <T extends (...args: any[]) => any>(
  useCustomHook: Hook<T>,
): HookHOC<ReturnType<T>, Parameters<T>> => WrappedComponent => props => {
  const injectedProps = useCustomHook(
    ...(mapPropsToParams(props, useCustomHook) as Parameters<T>), // TODO: mapPropsToParams types
  );

  return <WrappedComponent {...injectedProps} {...props} />;
};
