// 代码生成时间: 2025-09-16 11:24:49
import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

// Define a function to perform a basic linear search on an array
function linearSearch<T>(array: T[], target: T): number {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === target) {
      return i;
    }
  }
  throw new Error('Target not found in the array');
}

// Define a function to perform a binary search on a sorted array
function binarySearch<T>(array: T[], target: T, compareFn?: (a: T, b: T) => number): number {
  if (!compareFn) {
    compareFn = (a, b) => a < b ? -1 : a > b ? 1 : 0;
  }
  let start = 0;
  let end = array.length - 1;
  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
    const comparison = compareFn(array[mid], target);
    if (comparison === 0) {
      return mid;
    } else if (comparison < 0) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
  throw new Error('Target not found in the array');
}

// Define a function to sort an array using quicksort algorithm
function quickSort<T>(array: T[], compareFn?: (a: T, b: T) => number): T[] {
  if (!compareFn) {
    compareFn = (a, b) => a < b ? -1 : a > b ? 1 : 0;
  }
  if (array.length <= 1) {
    return array;
  }
  const pivot = array[0];
  const left: T[] = [];
  const right: T[] = [];
  for (let i = 1; i < array.length; i++) {
    if (compareFn(array[i], pivot) < 0) {
      left.push(array[i]);
    } else {
      right.push(array[i]);
    }
  }
  return [...quickSort(left, compareFn), pivot, ...quickSort(right, compareFn)];
}

// Example usage of the algorithms with error handling
async function main() {
  try {
    // Example data:
    const data = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
    const target = 5;

    // Linear search example
    console.log('Linear search result:', linearSearch(data, target));

    // Binary search requires a sorted array, so we sort the data first
    const sortedData = quickSort([...data]);
    console.log('Binary search result:', binarySearch(sortedData, target));

    // To demonstrate the sorting, we print the sorted data
    console.log('Sorted data:', sortedData);

  } catch (error) {
    console.error('An error occurred:', error.message);
  }
}

// Run the main function
main();

// Unit tests
Deno.test('linearSearch should find the target in the array', () => {
  const array = [1, 3, 5, 7, 9];
  const result = linearSearch(array, 5);
  assertEquals(result, 2);
});

Deno.test('binarySearch should find the target in the sorted array', () => {
  const array = [1, 2, 3, 4, 5];
  const result = binarySearch(array, 3);
  assertEquals(result, 2);
});

Deno.test('quickSort should sort the array', () => {
  const array = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
  const sortedArray = quickSort(array);
  assertEquals(sortedArray, [1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9]);
});