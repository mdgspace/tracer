import mockdatatypes from 'frontend/app/models/mockDataTypes';

export function sortJSON(arr: Array<mockdatatypes>): Array<mockdatatypes> {
  return arr.sort(function (a, b) {
    const x = a['Rank'];
    const y = b['Rank'];
    return x > y ? 1 : 0;
  });
}
