export function sortJSON(arr, key) {
  return arr.sort(function (a, b) {
    var x = a[key];
    var y = b[key];

    return x > y ? -1 : x < y ? 1 : 0;
  });
}
