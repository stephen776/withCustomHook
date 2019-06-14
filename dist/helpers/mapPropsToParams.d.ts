import { CustomHook } from '../types';
export declare function mapPropsToParams<TParamProps extends {
    [key: string]: any;
}, TParams, TResult>(props: TParamProps, hook: CustomHook<TParams, TResult>): any[];
