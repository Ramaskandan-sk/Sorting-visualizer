import { Play, Pause, RotateCcw, Shuffle, Volume2, VolumeX } from "lucide-react";

interface VisualizerControlsProps {
  arraySize: number;
  speed: number;
  isSorting: boolean;
  isPaused: boolean;
  soundEnabled: boolean;
  setArraySize: (size: number) => void;
  setSpeed: (speed: number) => void;
  setSoundEnabled: (enabled: boolean) => void;
  shuffleArray: () => void;
  startSorting: () => void;
  pauseSorting: () => void;
  resetSorting: () => void;
}

const VisualizerControls = ({
  arraySize,
  speed,
  isSorting,
  isPaused,
  soundEnabled,
  setArraySize,
  setSpeed,
  setSoundEnabled,
  shuffleArray,
  startSorting,
  pauseSorting,
  resetSorting,
}: VisualizerControlsProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Array Size Control */}
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="size-slider" className="font-medium text-sm text-neutral-800">
              Array Size
            </label>
            <span className="text-sm font-medium bg-[#3949AB]/10 text-[#3949AB] px-2 py-1 rounded-md">
              {arraySize}
            </span>
          </div>
          <input
            type="range"
            id="size-slider"
            min="10"
            max="100"
            value={arraySize}
            onChange={(e) => setArraySize(parseInt(e.target.value))}
            disabled={isSorting}
            className="w-full h-2 bg-[#E2E8F0] rounded-full appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              // Custom slider thumb styles
              WebkitAppearance: "none",
            }}
          />
        </div>
        
        {/* Speed Control */}
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="speed-slider" className="font-medium text-sm text-neutral-800">
              Speed
            </label>
            <span className="text-sm font-medium bg-[#3949AB]/10 text-[#3949AB] px-2 py-1 rounded-md">
              {speed}
            </span>
          </div>
          <input
            type="range"
            id="speed-slider"
            min="1"
            max="100"
            value={speed}
            onChange={(e) => setSpeed(parseInt(e.target.value))}
            className="w-full h-2 bg-[#E2E8F0] rounded-full appearance-none cursor-pointer"
            style={{
              // Custom slider thumb styles
              WebkitAppearance: "none",
            }}
          />
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center justify-between space-x-2">
          <button
            onClick={shuffleArray}
            disabled={isSorting}
            className="flex-1 py-2 px-4 bg-[#00ACC1] text-white rounded-lg hover:bg-[#00ACC1]/90 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Shuffle className="h-4 w-4 mr-1" /> Shuffle
          </button>
          
          <button
            onClick={isSorting ? resetSorting : startSorting}
            className="flex-1 py-2 px-4 bg-[#3949AB] text-white rounded-lg hover:bg-[#3949AB]/90 transition-colors flex items-center justify-center"
          >
            {isSorting ? (
              <>
                <RotateCcw className="h-4 w-4 mr-1" /> Reset
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-1" /> Sort
              </>
            )}
          </button>
          
          <button
            onClick={pauseSorting}
            disabled={!isSorting}
            className={`flex-1 py-2 px-4 text-white rounded-lg transition-colors flex items-center justify-center ${
              !isSorting 
                ? "bg-neutral-800/80 opacity-50 cursor-not-allowed" 
                : "bg-neutral-800 hover:bg-neutral-800/90"
            }`}
          >
            <Pause className="h-4 w-4 mr-1" /> {isPaused ? "Resume" : "Pause"}
          </button>
          
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`w-12 h-10 bg-white border border-neutral-800/20 rounded-lg hover:bg-[#F5F5F5] transition-colors flex items-center justify-center`}
          >
            {soundEnabled ? (
              <Volume2 className="h-5 w-5 text-[#3949AB]" />
            ) : (
              <VolumeX className="h-5 w-5 text-neutral-800/60" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VisualizerControls;
