import * as React from 'react';

// hook to be passed as argument. Parameters must be defined as a single config object for props
// to be inferred on the wrapper component
type Hook<TConfig extends { [key in keyof TConfig]: TConfig[key] }, TReturn> = (
  config: TConfig,
) => TReturn;

// type for our HOC that receives a component and injects the result of our hook call
interface HookHOC<TInjectedProps, TParamProps> {
  <P extends TInjectedProps>(component: React.ComponentType<P>): React.FC<
    Omit<P, keyof TInjectedProps> & TParamProps
  >;
}

export const withCustomHook = <TConfig, TInjectedProps>(
  useCustomHook: Hook<TConfig, TInjectedProps>,
): HookHOC<TInjectedProps, TConfig> => WrappedComponent => props => {
  const injectedProps = useCustomHook(props as TConfig);

  const passedProps = {
    ...(props as any),
    ...injectedProps,
  };
  return <WrappedComponent {...passedProps} />;
};
