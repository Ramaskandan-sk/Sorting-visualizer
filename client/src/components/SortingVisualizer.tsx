import { useState, useEffect } from "react";
import { BarChartBig } from "lucide-react";
import VisualizerControls from "./VisualizerControls";
import VisualizerDisplay from "./VisualizerDisplay";
import AlgorithmInfo from "./AlgorithmInfo";
import CustomArrayInput from "./CustomArrayInput";
import InfoModal from "./InfoModal";
import { useSorting } from "@/hooks/useSorting";
import { Algorithm } from "@/lib/algorithms";

const SortingVisualizer = () => {
  const [showModal, setShowModal] = useState(false);
  const [customInputError, setCustomInputError] = useState<string | null>(null);
  
  const [outputLogs, setOutputLogs] = useState<string[]>([]);
  
  const {
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
    setArraySize,
    setSpeed,
    setSelectedAlgorithm,
    setSoundEnabled,
    shuffleArray,
    startSorting,
    pauseSorting,
    resetSorting,
    setCustomArray
  } = useSorting();

  // Effect to update output logs when the current operation changes
  useEffect(() => {
    if (currentOperation && currentOperation !== "Not started") {
      setOutputLogs(prevLogs => {
        const newLogs = [...prevLogs, currentOperation];
        // Keep only the last 10 logs to prevent excessive scrolling
        return newLogs.slice(-10);
      });
    }
  }, [currentOperation]);

  // Effect to add final sorted array to logs when sorting completes
  useEffect(() => {
    if (currentOperation === "Sorting completed!") {
      const sortedArrayString = `Final sorted array: [${array.join(', ')}]`;
      setOutputLogs(prevLogs => [...prevLogs, sortedArrayString]);
    }
  }, [currentOperation, array]);

  // Only clear output logs when explicitly starting a new sort
  useEffect(() => {
    if (isSorting && sortedIndices.length === 0) {
      // Only clear logs when a new sort is starting (not yet any sorted indices)
      setOutputLogs([]);
    }
  }, [isSorting, sortedIndices.length]);

  const handleCustomArray = (input: string) => {
    try {
      const values = input.split(',').map(item => {
        const num = parseInt(item.trim());
        if (isNaN(num)) throw new Error("Invalid number");
        return num;
      });
      
      if (values.length < 2) {
        setCustomInputError("Please enter at least 2 values");
        return;
      }
      
      if (values.length > 20) {
        setCustomInputError("Maximum array size is 20");
        return;
      }
      
      setCustomArray(values);
      setCustomInputError(null);
    } catch (error) {
      setCustomInputError("Please enter valid numbers separated by commas");
    }
  };

  return (
    <>
      {/* Header */}
      <header className="bg-[#3949AB] text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <BarChartBig className="h-6 w-6 mr-2" />
            <h1 className="font-poppins font-semibold text-2xl">Sorting Visualizer</h1>
          </div>
          <div className="w-full md:w-auto">
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 items-center">
              <div className="w-full md:w-60">
                <select 
                  id="algorithm-select" 
                  className="w-full px-4 py-2 rounded-lg border border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary bg-white text-[#3949AB] font-medium appearance-none bg-no-repeat bg-right-1"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%233949AB'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundPosition: 'right 0.5rem center',
                    backgroundSize: '1.5em 1.5em',
                    paddingRight: '2.5rem'
                  }}
                  value={selectedAlgorithm}
                  onChange={(e) => setSelectedAlgorithm(e.target.value as Algorithm)}
                  disabled={isSorting}
                >
                  <option value="bubble">Bubble Sort</option>
                  <option value="selection">Selection Sort</option>
                  <option value="insertion">Insertion Sort</option>
                  <option value="merge">Merge Sort</option>
                  <option value="quick">Quick Sort</option>
                  <option value="heap">Heap Sort</option>
                </select>
              </div>
              <button 
                onClick={() => setShowModal(true)}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
              >
                <i className="ri-information-line text-xl"></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-6">
        <VisualizerControls 
          arraySize={arraySize}
          speed={speed}
          isSorting={isSorting}
          isPaused={isPaused}
          soundEnabled={soundEnabled}
          setArraySize={setArraySize}
          setSpeed={setSpeed}
          setSoundEnabled={setSoundEnabled}
          shuffleArray={shuffleArray}
          startSorting={startSorting}
          pauseSorting={pauseSorting}
          resetSorting={resetSorting}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <VisualizerDisplay 
            array={array}
            comparisons={comparisons}
            swaps={swaps}
            elapsedTime={elapsedTime}
            comparisonIndices={comparisonIndices}
            swapIndices={swapIndices}
            sortedIndices={sortedIndices}
          />
          
          <div className="flex flex-col gap-6">
            {/* Output Window */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h2 className="font-poppins font-semibold text-lg mb-3">Operation Log</h2>
              <div className="bg-gray-100 p-3 rounded-lg h-40 overflow-y-auto font-mono text-sm">
                {outputLogs.length === 0 ? (
                  <p className="text-gray-500 italic">Operations will appear here...</p>
                ) : (
                  <div className="space-y-1">
                    {outputLogs.map((log, index) => (
                      <div key={index} className={`
                        ${log.includes('Comparing') ? 'text-[#3949AB]' : ''}
                        ${log.includes('Swapping') ? 'text-[#FF5722]' : ''}
                        ${log.includes('Final sorted') ? 'text-[#4CAF50] font-medium' : ''}
                      `}>
                        {log}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <AlgorithmInfo 
              algorithm={selectedAlgorithm}
            />
          </div>
        </div>

        <CustomArrayInput 
          onApply={handleCustomArray}
          isSorting={isSorting}
          error={customInputError}
        />
      </main>

      {/* Footer */}
      <footer className="bg-[#333333] text-white py-4">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>Sorting Visualizer | Created for educational purposes | &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>

      {/* Info Modal */}
      {showModal && <InfoModal onClose={() => setShowModal(false)} />}
    </>
  );
};

export default SortingVisualizer;
