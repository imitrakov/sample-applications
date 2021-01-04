import { binarySearch, countFreq } from "./binary-search";

const source = [1, 2, 3, 4, 5, 6, 7, 8];
const sourceCountFreq = [1,4,3,2,4,4,5,8,7,5,3,3,6,8,9,3,4];

test("find index for target === 7", () => {
  expect(binarySearch(source, 7)).toBe(6);
});

test("not finded target in arr", () => {
  expect(binarySearch(source, 10)).toBe(-1);
});

test("find count frequency for target === 4", () => {
    expect(countFreq(sourceCountFreq, 4)).toBe(4)
}) 

test("find count frequency for target === 10", () => {
    expect(countFreq(sourceCountFreq, 10)).toBe(0)
}) 