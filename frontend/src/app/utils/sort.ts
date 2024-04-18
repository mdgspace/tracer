import mockdatatypes from '../models/mockDataTypes';
export function sortJSON(arr: Array<mockdatatypes>): Array<mockdatatypes> {
  return arr.sort(function (a, b) {
    const x = a['Rank'];
    const y = b['Rank'];
    if (x == y) return 0;
    return x > y ? 1 : -1;
  });
}
