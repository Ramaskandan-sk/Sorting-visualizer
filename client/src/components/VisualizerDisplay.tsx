import { useEffect, useRef } from "react";

interface VisualizerDisplayProps {
  array: number[];
  comparisons: number;
  swaps: number;
  elapsedTime: number;
  comparisonIndices: number[];
  swapIndices: number[];
  sortedIndices: number[];
}

const VisualizerDisplay = ({
  array,
  comparisons,
  swaps,
  elapsedTime,
  comparisonIndices,
  swapIndices,
  sortedIndices,
}: VisualizerDisplayProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Ensure the container is available in the DOM
    if (!containerRef.current) return;
  }, [array.length]);

  const getBarColor = (index: number) => {
    if (sortedIndices.includes(index)) {
      return "#4CAF50"; // Sorted color
    } else if (swapIndices.includes(index)) {
      return "#FF5722"; // Swapping color
    } else if (comparisonIndices.includes(index)) {
      return "#FFEB3B"; // Comparing color
    } else {
      return "#3949AB"; // Default color
    }
  };

  // This function is no longer needed since we're not using bars
  // Keeping it as an empty function to avoid refactoring other parts of the code
  const getBarWidth = () => {
    return 0;
  };

  return (
    <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-5 h-[400px] flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-poppins font-semibold text-lg">Visualization</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-[#FFEB3B] mr-1"></span>
            <span className="text-xs">Comparing</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-[#FF5722] mr-1"></span>
            <span className="text-xs">Swapping</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-[#4CAF50] mr-1"></span>
            <span className="text-xs">Sorted</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-[#3949AB] mr-1"></span>
            <span className="text-xs">Unsorted</span>
          </div>
        </div>
      </div>
      
      {/* Statistics Bar */}
      <div className="grid grid-cols-3 gap-4 mb-4 text-center">
        <div className="bg-[#3949AB]/10 p-2 rounded-lg">
          <div className="text-xs text-neutral-800/70">Comparisons</div>
          <div className="font-medium text-[#3949AB]">{comparisons}</div>
        </div>
        <div className="bg-[#FF5722]/10 p-2 rounded-lg">
          <div className="text-xs text-neutral-800/70">Swaps</div>
          <div className="font-medium text-[#FF5722]">{swaps}</div>
        </div>
        <div className="bg-[#00ACC1]/10 p-2 rounded-lg">
          <div className="text-xs text-neutral-800/70">Time</div>
          <div className="font-medium text-[#00ACC1]">{elapsedTime.toFixed(2)}s</div>
        </div>
      </div>
      
      {/* Number Elements Container */}
      <div 
        ref={containerRef}
        className="flex-grow grid grid-cols-5 gap-4 p-4 place-items-center max-w-3xl mx-auto"
      >
        {array.map((value, index) => (
          <div
            key={index}
            className="flex items-center justify-center transition-all duration-200 rounded-full text-white font-bold text-xl shadow-md"
            style={{
              width: '50px',
              height: '50px',
              backgroundColor: getBarColor(index),
              transition: "transform 0.2s ease, background-color 0.2s ease",
              transform: swapIndices.includes(index) ? 'scale(1.2)' : 'scale(1)'
            }}
          >
            {value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisualizerDisplay;
