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

  const getBarWidth = () => {
    if (!containerRef.current) return 4;
    const containerWidth = containerRef.current.clientWidth;
    return Math.max(2, Math.min(20, Math.floor((containerWidth - (array.length * 1)) / array.length)));
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
      
      {/* Array Bars Container */}
      <div 
        ref={containerRef}
        className="flex-grow flex items-end justify-center space-x-1 px-2"
      >
        {array.map((value, index) => (
          <div
            key={index}
            className="bar transition-all duration-200"
            style={{
              height: `${value}px`,
              width: `${getBarWidth()}px`,
              backgroundColor: getBarColor(index),
              transition: "height 0.2s ease, background-color 0.2s ease"
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default VisualizerDisplay;
