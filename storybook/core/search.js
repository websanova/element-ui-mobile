export function fuzzysearch(pattern, str) {
    const newPattern = pattern.split('').reduce((a, b) => `${a}.*${b}`);
    const result = (new RegExp(pattern)).test(str);
    return result;
}
