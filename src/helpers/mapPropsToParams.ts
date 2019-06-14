const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;
const ARGUMENT_NAMES = /([^\s,]+)/g;

interface IDictionary<TValue> {
  [id: string]: TValue;
}

function getParamNames(func: Function): string[] {
  const fnStr = func.toString().replace(STRIP_COMMENTS, '');
  const result = fnStr
    .slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')'))
    .match(ARGUMENT_NAMES);
  if (result === null) return [];
  return result;
}

export function mapPropsToParams<TProps>(
  props: IDictionary<TProps>,
  hook: (...args: any[]) => any,
) {
  return getParamNames(hook).map(name => props[name] || undefined);
}
