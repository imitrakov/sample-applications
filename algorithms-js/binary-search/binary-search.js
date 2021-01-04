
// O(logN)
export function binarySearch(arr, target) {
  let left = -1;
  let rigth = arr.length;

  while (rigth - left > 1) {
    const mid = Math.floor((left + rigth) / 2);

    if (arr[mid] === target) {
      return mid;
    }

    if (arr[mid] > target) {
      right = mid;
    } else {
      left = mid;
    }
  }

  return -1;
}

// O(K*logN)
export function countFreq(arr, target) {
  const _arr = arr.sort((a, b) => a - b);
  const posEl = binarySearch(_arr, target);

  if (posEl === -1) {
    return 0;
  }

  let i = posEl;
  let j = posEl;
  while (arr[i] === target) {
    i--;
  }

  while (arr[j] === target) {
    j++;
  }

  return j - i - 1;
}
