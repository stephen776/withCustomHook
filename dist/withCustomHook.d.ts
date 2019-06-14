import * as React from 'react';
import { CustomHook } from './types';
interface HookHOC<TInjectedProps, TParamProps> {
    <P extends TInjectedProps>(component: React.ComponentType<P>): React.FC<Exclude<P, TInjectedProps> & TParamProps>;
}
export declare const withCustomHook: <TParams, TInjectedProps, TParamProps>(useCustomHook: CustomHook<TParams, TInjectedProps>) => HookHOC<TInjectedProps, TParamProps>;
export {};
