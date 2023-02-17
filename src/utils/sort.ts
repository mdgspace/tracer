import mockdatatypes from '../models/mockDataTypes';
export function sortJSON(
  arr: Array<mockdatatypes>,
  key: string
): Array<mockdatatypes> {
  return arr.sort(function (a, b) {
    if (key === 'PR') {
      const x = a[key];
      const y = b[key];
      return x > y ? -1 : x < y ? 1 : 0;
    }
    return 0;
  });
}
