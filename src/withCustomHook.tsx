import * as React from 'react';
import {mapPropsToParams} from './helpers';

type CustomHook = (...args: any[]) => any;

export const withCustomHook = (useCustomHook: CustomHook) => (
  WrappedComponent: React.ComponentType,
) => props => {
  const injectedProps = useCustomHook(mapPropsToParams(props, useCustomHook));
  return <WrappedComponent {...injectedProps} />;
};
