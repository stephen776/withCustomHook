"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;
var ARGUMENT_NAMES = /([^\s,]+)/g;
function getParamNames(func) {
    var fnStr = func.toString().replace(STRIP_COMMENTS, '');
    var result = fnStr
        .slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')'))
        .match(ARGUMENT_NAMES);
    if (result === null)
        return [];
    return result;
}
function mapPropsToParams(props, hook) {
    return getParamNames(hook).map(function (name) { return props[name] || undefined; });
}
exports.mapPropsToParams = mapPropsToParams;
