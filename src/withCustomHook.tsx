import * as React from 'react';
import { mapPropsToParams } from './helpers';
import { CustomHook } from './types';

// type for our HOC that receives a component and injects the result of our hook call
interface HookHOC<TInjectedProps, TParamProps> {
  <P extends TInjectedProps>(component: React.ComponentType<P>): React.FC<
    Omit<P, keyof TInjectedProps> & TParamProps
  >;
}

export const withCustomHook = <TParams, TInjectedProps, TParamProps>(
  useCustomHook: CustomHook<TParams, TInjectedProps>,
): HookHOC<TInjectedProps, TParamProps> => WrappedComponent => props => {
  const params = props as TParamProps;
  const rest = props as any;

  const injectedProps = useCustomHook(
    ...mapPropsToParams<TParamProps, TParams, TInjectedProps>(
      params,
      useCustomHook,
    ),
  );

  return <WrappedComponent {...injectedProps} {...rest} />;
};
