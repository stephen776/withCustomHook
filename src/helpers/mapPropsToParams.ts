// import { CustomHook } from '../types';

const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;
const ARGUMENT_NAMES = /([^\s,]+)/g;

function getParamNames(hook: Function) {
  const fnStr = hook.toString().replace(STRIP_COMMENTS, '');

  const result = fnStr
    .slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')'))
    .match(ARGUMENT_NAMES);

  if (result === null) return [];

  return result;
}

export function mapPropsToParams(props: any, hook: Function) {
  return getParamNames(hook).map(name => props[name] || undefined);
}
