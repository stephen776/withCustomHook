interface IDictionary<TValue> {
    [id: string]: TValue;
}
export declare function mapPropsToParams<TProps>(props: IDictionary<TProps>, hook: (...args: any[]) => any): (TProps | undefined)[];
export {};
