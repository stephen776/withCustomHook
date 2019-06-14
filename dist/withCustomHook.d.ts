import * as React from 'react';
declare type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
declare type CustomHook<TParams, TResult> = (...args: TParams[]) => TResult;
interface HookHOC<TInjectedProps, TNeedsProps = {}> {
    <P extends TInjectedProps>(component: React.ComponentType<P>): React.FC<Omit<P, keyof TInjectedProps> & TNeedsProps>;
}
export declare const withCustomHook: <TParams, TInjected, TNeedsProps>(useCustomHook: CustomHook<TParams, TInjected>) => HookHOC<TInjected, TNeedsProps>;
export {};
