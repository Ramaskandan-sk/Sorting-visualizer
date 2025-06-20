export type Algorithm = "bubble" | "selection" | "insertion" | "merge" | "quick" | "heap";

type Animation = 
  | { type: "compare"; indices: number[] }
  | { type: "swap"; indices: number[] }
  | { type: "sorted"; indices: number[] }
  | { type: "overwrite"; index: number; value: number };

// Bubble Sort
export function bubbleSort(array: number[], animations: Animation[]): void {
  const n = array.length;
  const sortedIndices: number[] = [];
  
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    
    for (let j = 0; j < n - i - 1; j++) {
      // Compare
      animations.push({ type: "compare", indices: [j, j + 1] });
      
      if (array[j] > array[j + 1]) {
        // Swap
        animations.push({ type: "swap", indices: [j, j + 1] });
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        swapped = true;
      }
    }
    
    // Mark as sorted
    animations.push({ type: "sorted", indices: [n - i - 1] });
    sortedIndices.push(n - i - 1);
    
    if (!swapped) {
      // All remaining elements are sorted
      for (let j = 0; j < n - i - 1; j++) {
        if (!sortedIndices.includes(j)) {
          animations.push({ type: "sorted", indices: [j] });
        }
      }
      break;
    }
  }
  
  // Mark the first element as sorted if not already marked
  if (!sortedIndices.includes(0)) {
    animations.push({ type: "sorted", indices: [0] });
  }
}

// Selection Sort
export function selectionSort(array: number[], animations: Animation[]): void {
  const n = array.length;
  
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    
    for (let j = i + 1; j < n; j++) {
      // Compare
      animations.push({ type: "compare", indices: [minIdx, j] });
      
      if (array[j] < array[minIdx]) {
        minIdx = j;
      }
    }
    
    // Swap if needed
    if (minIdx !== i) {
      animations.push({ type: "swap", indices: [i, minIdx] });
      [array[i], array[minIdx]] = [array[minIdx], array[i]];
    }
    
    // Mark as sorted
    animations.push({ type: "sorted", indices: [i] });
  }
  
  // Mark the last element as sorted
  animations.push({ type: "sorted", indices: [n - 1] });
}

// Insertion Sort
export function insertionSort(array: number[], animations: Animation[]): void {
  const n = array.length;
  const tempArray = [...array]; // Create a copy to work with
  
  // Mark the first element as sorted
  animations.push({ type: "sorted", indices: [0] });
  
  for (let i = 1; i < n; i++) {
    const key = tempArray[i];
    let j = i - 1;
    
    // Compare with elements in the sorted region
    animations.push({ type: "compare", indices: [i, j] });
    
    // Move elements of arr[0..i-1] that are greater than key
    // to one position ahead of their current position
    while (j >= 0 && tempArray[j] > key) {
      animations.push({ type: "compare", indices: [j, j + 1] });
      animations.push({ type: "swap", indices: [j, j + 1] });
      
      // Update the visual array
      tempArray[j + 1] = tempArray[j];
      
      j--;
    }
    
    // Place key at its correct position
    tempArray[j + 1] = key;
    
    // Update the actual array to match tempArray
    for (let k = 0; k <= i; k++) {
      if (array[k] !== tempArray[k]) {
        array[k] = tempArray[k];
      }
    }
    
    // Mark the current index as sorted
    animations.push({ type: "sorted", indices: [i] });
  }
}

// Merge Sort
export function mergeSort(array: number[], animations: Animation[]): void {
  const aux = [...array];
  mergeSortHelper(array, aux, 0, array.length - 1, animations);
  
  // Mark all as sorted at the end
  animations.push({ type: "sorted", indices: Array.from(Array(array.length).keys()) });
}

function mergeSortHelper(
  array: number[],
  aux: number[],
  start: number,
  end: number,
  animations: Animation[]
): void {
  if (start >= end) return;
  
  const mid = Math.floor((start + end) / 2);
  mergeSortHelper(array, aux, start, mid, animations);
  mergeSortHelper(array, aux, mid + 1, end, animations);
  merge(array, aux, start, mid, end, animations);
}

function merge(
  array: number[],
  aux: number[],
  start: number,
  mid: number,
  end: number,
  animations: Animation[]
): void {
  // Copy values to auxiliary array
  for (let i = start; i <= end; i++) {
    aux[i] = array[i];
  }
  
  let i = start;
  let j = mid + 1;
  let k = start;
  
  while (i <= mid && j <= end) {
    // Compare values
    animations.push({ type: "compare", indices: [i, j] });
    
    if (aux[i] <= aux[j]) {
      animations.push({ type: "overwrite", index: k, value: aux[i] });
      array[k++] = aux[i++];
    } else {
      animations.push({ type: "overwrite", index: k, value: aux[j] });
      array[k++] = aux[j++];
    }
  }
  
  // Copy remaining elements
  while (i <= mid) {
    animations.push({ type: "overwrite", index: k, value: aux[i] });
    array[k++] = aux[i++];
  }
  
  while (j <= end) {
    animations.push({ type: "overwrite", index: k, value: aux[j] });
    array[k++] = aux[j++];
  }
}

// Quick Sort
export function quickSort(array: number[], animations: Animation[]): void {
  const sortedIndices = new Set<number>();
  quickSortHelper(array, 0, array.length - 1, animations, sortedIndices);
  
  // Mark any remaining indices as sorted
  for (let i = 0; i < array.length; i++) {
    if (!sortedIndices.has(i)) {
      animations.push({ type: "sorted", indices: [i] });
    }
  }
}

function quickSortHelper(
  array: number[],
  low: number,
  high: number,
  animations: Animation[],
  sortedIndices: Set<number>
): void {
  if (low < high) {
    const pivotIndex = partition(array, low, high, animations, sortedIndices);
    
    // Recursively sort elements before and after the pivot
    quickSortHelper(array, low, pivotIndex - 1, animations, sortedIndices);
    quickSortHelper(array, pivotIndex + 1, high, animations, sortedIndices);
  } else if (low === high) {
    // Single element is already sorted
    animations.push({ type: "sorted", indices: [low] });
    sortedIndices.add(low);
  }
}

function partition(
  array: number[],
  low: number,
  high: number,
  animations: Animation[],
  sortedIndices: Set<number>
): number {
  // Choose the rightmost element as pivot
  const pivot = array[high];
  let i = low - 1;
  
  // Compare all elements with pivot and put smaller elements before pivot
  for (let j = low; j < high; j++) {
    // Compare with pivot
    animations.push({ type: "compare", indices: [j, high] });
    
    if (array[j] <= pivot) {
      i++;
      if (i !== j) {
        animations.push({ type: "swap", indices: [i, j] });
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
  }
  
  // Place pivot at correct position
  const pivotFinalPos = i + 1;
  if (pivotFinalPos !== high) {
    animations.push({ type: "swap", indices: [pivotFinalPos, high] });
    [array[pivotFinalPos], array[high]] = [array[high], array[pivotFinalPos]];
  }
  
  // Mark pivot as sorted - it's in its final position
  animations.push({ type: "sorted", indices: [pivotFinalPos] });
  sortedIndices.add(pivotFinalPos);
  
  return pivotFinalPos;
}

// Heap Sort
export function heapSort(array: number[], animations: Animation[]): void {
  const n = array.length;
  
  // Build max heap (rearrange array)
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(array, n, i, animations);
  }
  
  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    // Move current root (maximum element) to end
    animations.push({ type: "swap", indices: [0, i] });
    [array[0], array[i]] = [array[i], array[0]];
    
    // Mark the element at position i as sorted (it's in its final position)
    animations.push({ type: "sorted", indices: [i] });
    
    // Call max heapify on the reduced heap
    heapify(array, i, 0, animations);
  }
  
  // Mark the first element as sorted (it's the minimum value and in its final position)
  animations.push({ type: "sorted", indices: [0] });
}

function heapify(
  array: number[],
  heapSize: number,
  rootIndex: number,
  animations: Animation[]
): void {
  let largest = rootIndex; // Initialize largest as root
  const left = 2 * rootIndex + 1; // Left child
  const right = 2 * rootIndex + 2; // Right child
  
  // Compare with left child
  if (left < heapSize) {
    animations.push({ type: "compare", indices: [left, largest] });
    
    if (array[left] > array[largest]) {
      largest = left;
    }
  }
  
  // Compare with right child
  if (right < heapSize) {
    animations.push({ type: "compare", indices: [right, largest] });
    
    if (array[right] > array[largest]) {
      largest = right;
    }
  }
  
  // If largest is not root, swap and continue heapifying
  if (largest !== rootIndex) {
    animations.push({ type: "swap", indices: [rootIndex, largest] });
    [array[rootIndex], array[largest]] = [array[largest], array[rootIndex]];
    
    // Recursively heapify the affected sub-tree
    heapify(array, heapSize, largest, animations);
  }
}

// Get pseudocode for the selected algorithm
export function getPseudocode(algorithm: Algorithm): string {
  switch (algorithm) {
    case "bubble":
      return `<span class="text-[#3949AB] font-medium">procedure</span> <span class="text-[#00ACC1] font-medium">bubbleSort</span>(A : list of sortable items)
    n = length(A)
    <span class="text-[#3949AB] font-medium">repeat</span>
        swapped = false
        <span class="text-[#3949AB] font-medium">for</span> i = 1 <span class="text-[#3949AB] font-medium">to</span> n-1 <span class="text-[#3949AB] font-medium">do</span>
            <span class="text-[#3949AB] font-medium">if</span> A[i-1] > A[i] <span class="text-[#3949AB] font-medium">then</span>
                swap(A[i-1], A[i])
                swapped = true
            <span class="text-[#3949AB] font-medium">end if</span>
        <span class="text-[#3949AB] font-medium">end for</span>
    <span class="text-[#3949AB] font-medium">until</span> not swapped
<span class="text-[#3949AB] font-medium">end procedure</span>`;
    
    case "selection":
      return `<span class="text-[#3949AB] font-medium">procedure</span> <span class="text-[#00ACC1] font-medium">selectionSort</span>(A : list of sortable items)
    n = length(A)
    <span class="text-[#3949AB] font-medium">for</span> i = 0 <span class="text-[#3949AB] font-medium">to</span> n-1 <span class="text-[#3949AB] font-medium">do</span>
        min_idx = i
        <span class="text-[#3949AB] font-medium">for</span> j = i+1 <span class="text-[#3949AB] font-medium">to</span> n-1 <span class="text-[#3949AB] font-medium">do</span>
            <span class="text-[#3949AB] font-medium">if</span> A[j] < A[min_idx] <span class="text-[#3949AB] font-medium">then</span>
                min_idx = j
            <span class="text-[#3949AB] font-medium">end if</span>
        <span class="text-[#3949AB] font-medium">end for</span>
        swap(A[i], A[min_idx])
    <span class="text-[#3949AB] font-medium">end for</span>
<span class="text-[#3949AB] font-medium">end procedure</span>`;
    
    case "insertion":
      return `<span class="text-[#3949AB] font-medium">procedure</span> <span class="text-[#00ACC1] font-medium">insertionSort</span>(A : list of sortable items)
    n = length(A)
    <span class="text-[#3949AB] font-medium">for</span> i = 1 <span class="text-[#3949AB] font-medium">to</span> n-1 <span class="text-[#3949AB] font-medium">do</span>
        key = A[i]
        j = i-1
        <span class="text-[#3949AB] font-medium">while</span> j >= 0 and A[j] > key <span class="text-[#3949AB] font-medium">do</span>
            A[j+1] = A[j]
            j = j-1
        <span class="text-[#3949AB] font-medium">end while</span>
        A[j+1] = key
    <span class="text-[#3949AB] font-medium">end for</span>
<span class="text-[#3949AB] font-medium">end procedure</span>`;
    
    case "merge":
      return `<span class="text-[#3949AB] font-medium">procedure</span> <span class="text-[#00ACC1] font-medium">mergeSort</span>(A : list of sortable items, start, end)
    <span class="text-[#3949AB] font-medium">if</span> end > start <span class="text-[#3949AB] font-medium">then</span>
        mid = (start + end) / 2
        mergeSort(A, start, mid)
        mergeSort(A, mid+1, end)
        merge(A, start, mid, end)
    <span class="text-[#3949AB] font-medium">end if</span>
<span class="text-[#3949AB] font-medium">end procedure</span>

<span class="text-[#3949AB] font-medium">procedure</span> <span class="text-[#00ACC1] font-medium">merge</span>(A, start, mid, end)
    create temp arrays L and R
    copy A[start..mid] to L
    copy A[mid+1..end] to R
    
    i = 0, j = 0, k = start
    while i < length(L) and j < length(R) do
        if L[i] <= R[j] then
            A[k] = L[i]
            i = i + 1
        else
            A[k] = R[j]
            j = j + 1
        end if
        k = k + 1
    end while
    
    // Copy remaining elements
    copy remaining elements of L to A
    copy remaining elements of R to A
<span class="text-[#3949AB] font-medium">end procedure</span>`;
    
    case "quick":
      return `<span class="text-[#3949AB] font-medium">procedure</span> <span class="text-[#00ACC1] font-medium">quickSort</span>(A : list of sortable items, low, high)
    <span class="text-[#3949AB] font-medium">if</span> low < high <span class="text-[#3949AB] font-medium">then</span>
        pivot_index = partition(A, low, high)
        quickSort(A, low, pivot_index - 1)
        quickSort(A, pivot_index + 1, high)
    <span class="text-[#3949AB] font-medium">end if</span>
<span class="text-[#3949AB] font-medium">end procedure</span>

<span class="text-[#3949AB] font-medium">procedure</span> <span class="text-[#00ACC1] font-medium">partition</span>(A, low, high)
    pivot = A[high]
    i = low - 1
    <span class="text-[#3949AB] font-medium">for</span> j = low <span class="text-[#3949AB] font-medium">to</span> high - 1 <span class="text-[#3949AB] font-medium">do</span>
        <span class="text-[#3949AB] font-medium">if</span> A[j] <= pivot <span class="text-[#3949AB] font-medium">then</span>
            i = i + 1
            swap(A[i], A[j])
        <span class="text-[#3949AB] font-medium">end if</span>
    <span class="text-[#3949AB] font-medium">end for</span>
    swap(A[i+1], A[high])
    <span class="text-[#3949AB] font-medium">return</span> i + 1
<span class="text-[#3949AB] font-medium">end procedure</span>`;
    
    case "heap":
      return `<span class="text-[#3949AB] font-medium">procedure</span> <span class="text-[#00ACC1] font-medium">heapSort</span>(A : list of sortable items)
    n = length(A)
    
    // Build max heap
    <span class="text-[#3949AB] font-medium">for</span> i = n/2 <span class="text-[#3949AB] font-medium">down to</span> 0 <span class="text-[#3949AB] font-medium">do</span>
        heapify(A, n, i)
    <span class="text-[#3949AB] font-medium">end for</span>
    
    // Extract elements from heap
    <span class="text-[#3949AB] font-medium">for</span> i = n-1 <span class="text-[#3949AB] font-medium">down to</span> 0 <span class="text-[#3949AB] font-medium">do</span>
        swap(A[0], A[i])
        heapify(A, i, 0)
    <span class="text-[#3949AB] font-medium">end for</span>
<span class="text-[#3949AB] font-medium">end procedure</span>

<span class="text-[#3949AB] font-medium">procedure</span> <span class="text-[#00ACC1] font-medium">heapify</span>(A, n, i)
    largest = i
    left = 2*i + 1
    right = 2*i + 2
    
    if left < n and A[left] > A[largest] then
        largest = left
    end if
    
    if right < n and A[right] > A[largest] then
        largest = right
    end if
    
    if largest != i then
        swap(A[i], A[largest])
        heapify(A, n, largest)
    end if
<span class="text-[#3949AB] font-medium">end procedure</span>`;
    
    default:
      return "";
  }
}
