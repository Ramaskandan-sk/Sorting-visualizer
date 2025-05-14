import { useState, useEffect, useCallback, useRef } from "react";
import { 
  Algorithm,
  bubbleSort,
  selectionSort,
  insertionSort,
  mergeSort,
  quickSort,
  heapSort
} from "@/lib/algorithms";
import { playComparisonSound, playSwapSound } from "@/lib/audio";

// Constants
const MIN_VALUE = 1;
const MAX_VALUE = 99;
const DEFAULT_ARRAY_SIZE = 15; // Smaller default size
const MAX_ARRAY_SIZE = 20; // Maximum array size limited to 20
const DEFAULT_ANIMATION_SPEED = 50;

export function useSorting() {
  const [array, setArray] = useState<number[]>([]);
  const [arraySize, setArraySize] = useState(DEFAULT_ARRAY_SIZE);
  const [speed, setSpeed] = useState(DEFAULT_ANIMATION_SPEED);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<Algorithm>("bubble");
  const [isSorting, setIsSorting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Animation state
  const [comparisonIndices, setComparisonIndices] = useState<number[]>([]);
  const [swapIndices, setSwapIndices] = useState<number[]>([]);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [currentOperation, setCurrentOperation] = useState("Not started");

  // Refs for animation control
  const animationTimeoutId = useRef<NodeJS.Timeout | null>(null);
  const sortingStartTimeRef = useRef<number>(0);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);
  const pausedRef = useRef<boolean>(false);
  
  // Cleanup function for all timeouts and intervals
  const cleanupTimers = useCallback(() => {
    if (animationTimeoutId.current) {
      clearTimeout(animationTimeoutId.current);
      animationTimeoutId.current = null;
    }
    
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    
    if (animationFrameIdRef.current) {
      cancelAnimationFrame(animationFrameIdRef.current);
      animationFrameIdRef.current = null;
    }
  }, []);

  // Reset animation state
  const resetAnimationState = useCallback(() => {
    setComparisonIndices([]);
    setSwapIndices([]);
    setSortedIndices([]);
    setComparisons(0);
    setSwaps(0);
    setElapsedTime(0);
    setCurrentOperation("Not started");
  }, []);

  // Generate a random array
  const generateRandomArray = useCallback(() => {
    // Create an array of unique random numbers in ascending order
    const newArray = [];
    const usedNumbers = new Set<number>();
    
    // Generate unique random numbers
    while (newArray.length < arraySize) {
      const value = Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE) + MIN_VALUE);
      if (!usedNumbers.has(value)) {
        usedNumbers.add(value);
        newArray.push(value);
      }
    }
    
    // Sort in ascending order
    newArray.sort((a, b) => a - b);
    
    setArray(newArray);
    resetAnimationState();
  }, [arraySize, resetAnimationState]);

  // Generate a random array when component mounts or arraySize changes
  useEffect(() => {
    if (!isSorting) {
      generateRandomArray();
    }
  }, [arraySize, generateRandomArray, isSorting]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupTimers();
    };
  }, [cleanupTimers]);

  // Update pausedRef when isPaused changes
  useEffect(() => {
    pausedRef.current = isPaused;
  }, [isPaused]);

  // Shuffle the array
  const shuffleArray = useCallback(() => {
    if (isSorting) return;
    generateRandomArray();
  }, [isSorting, generateRandomArray]);

  // Set a custom array
  const setCustomArray = useCallback((customArray: number[]) => {
    if (isSorting) return;
    
    // Normalize values to be within MIN_VALUE and MAX_VALUE
    const normalizedArray = customArray.map(val => 
      Math.min(MAX_VALUE, Math.max(MIN_VALUE, val))
    );
    
    setArray(normalizedArray);
    resetAnimationState();
  }, [isSorting, resetAnimationState]);

  // Helper function to get delay from speed (0.1 to 2 seconds)
  const getDelay = useCallback(() => {
    // Convert speed (1-100) to delay (100ms to 2000ms)
    // Reversed scale - higher speed means lower delay
    const maxDelay = 2000; // 2 seconds
    const minDelay = 100;  // 0.1 seconds
    return maxDelay - ((speed - 1) / 99) * (maxDelay - minDelay);
  }, [speed]);

  // Start the timer
  const startTimer = useCallback(() => {
    sortingStartTimeRef.current = Date.now();
    
    timerIntervalRef.current = setInterval(() => {
      if (!pausedRef.current) {
        const elapsed = (Date.now() - sortingStartTimeRef.current) / 1000;
        setElapsedTime(elapsed);
      }
    }, 100);
  }, []);

  // Animation callbacks
  const onCompare = useCallback((indices: number[]) => {
    setComparisonIndices(indices);
    setComparisons(prev => prev + 1);
    if (soundEnabled) {
      playComparisonSound(array[indices[0]]);
    }
  }, [array, soundEnabled]);

  const onSwap = useCallback((indices: number[]) => {
    setSwapIndices(indices);
    setSwaps(prev => prev + 1);
    if (soundEnabled) {
      playSwapSound(array[indices[0]]);
    }
  }, [array, soundEnabled]);

  const onSorted = useCallback((indices: number[]) => {
    setSortedIndices(prev => [...prev, ...indices.filter(idx => !prev.includes(idx))]);
  }, []);

  const updateOperation = useCallback((operation: string) => {
    setCurrentOperation(operation);
  }, []);

  // Reset the sorting process
  const resetSorting = useCallback(() => {
    cleanupTimers();
    setIsSorting(false);
    setIsPaused(false);
    generateRandomArray();
  }, [cleanupTimers, generateRandomArray]);

  // Start the sorting algorithm
  const startSorting = useCallback(() => {
    if (isSorting) {
      resetSorting();
      return;
    }
    
    setIsSorting(true);
    setIsPaused(false);
    resetAnimationState();
    startTimer();
    
    // Run the selected sorting algorithm
    const animations: any[] = [];
    
    switch (selectedAlgorithm) {
      case "bubble":
        bubbleSort([...array], animations);
        break;
      case "selection":
        selectionSort([...array], animations);
        break;
      case "insertion":
        insertionSort([...array], animations);
        break;
      case "merge":
        mergeSort([...array], animations);
        break;
      case "quick":
        quickSort([...array], animations);
        break;
      case "heap":
        heapSort([...array], animations);
        break;
    }
    
    // Run animations
    let animationIndex = 0;
    
    function runNextAnimation() {
      if (animationIndex >= animations.length) {
        // Finished all animations
        cleanupTimers();
        setIsSorting(false);
        setIsPaused(false);
        setCurrentOperation("Sorting completed!");
        return;
      }
      
      if (pausedRef.current) {
        // If paused, wait and check again
        animationTimeoutId.current = setTimeout(runNextAnimation, 100);
        return;
      }
      
      const animation = animations[animationIndex];
      
      if (animation.type === "compare") {
        onCompare(animation.indices);
        updateOperation(`Comparing array[${animation.indices.join('] and array[')}]`);
      } else if (animation.type === "swap") {
        onSwap(animation.indices);
        const swapMessage = `Swapping array[${animation.indices.join('] and array[')}]: ${array[animation.indices[0]]} ↔ ${array[animation.indices[1]]}`;
        updateOperation(swapMessage);
        
        // Update array
        const newArray = [...array];
        [newArray[animation.indices[0]], newArray[animation.indices[1]]] = 
          [newArray[animation.indices[1]], newArray[animation.indices[0]]];
        setArray(newArray);
      } else if (animation.type === "sorted") {
        onSorted(animation.indices);
      } else if (animation.type === "overwrite") {
        // Used for operations like merge sort that don't use simple swaps
        const newArray = [...array];
        newArray[animation.index] = animation.value;
        setArray(newArray);
        updateOperation(`Setting array[${animation.index}] = ${animation.value}`);
      }
      
      animationIndex++;
      animationTimeoutId.current = setTimeout(runNextAnimation, getDelay());
    }
    
    // Start the animation process
    runNextAnimation();
  }, [
    array,
    isSorting,
    selectedAlgorithm,
    cleanupTimers,
    resetAnimationState,
    startTimer,
    getDelay,
    onCompare,
    onSwap,
    onSorted,
    updateOperation,
    resetSorting
  ]);

  // Pause/Resume the sorting
  const pauseSorting = useCallback(() => {
    if (!isSorting) return;
    
    setIsPaused(!isPaused);
  }, [isSorting, isPaused]);

  // Handlers for array size and speed adjustments
  const handleArraySizeChange = useCallback((newSize: number) => {
    if (isSorting) return;
    // Ensure the array size doesn't exceed the maximum
    const limitedSize = Math.min(newSize, MAX_ARRAY_SIZE);
    setArraySize(limitedSize);
  }, [isSorting]);

  const handleSpeedChange = useCallback((newSpeed: number) => {
    setSpeed(newSpeed);
  }, []);

  return {
    array,
    arraySize,
    speed,
    selectedAlgorithm,
    isSorting,
    isPaused,
    soundEnabled,
    comparisons,
    swaps,
    elapsedTime,
    currentOperation,
    comparisonIndices,
    swapIndices,
    sortedIndices,
    setArraySize: handleArraySizeChange,
    setSpeed: handleSpeedChange,
    setSelectedAlgorithm,
    setSoundEnabled,
    shuffleArray,
    startSorting,
    pauseSorting,
    resetSorting,
    setCustomArray
  };
}