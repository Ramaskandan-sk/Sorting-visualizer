import { X } from "lucide-react";

interface InfoModalProps {
  onClose: () => void;
}

const InfoModal = ({ onClose }: InfoModalProps) => {
  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-poppins font-semibold text-xl">About Sorting Algorithms</h2>
            <button 
              onClick={onClose}
              className="text-neutral-800/60 hover:text-neutral-800"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="space-y-6">
            {/* SVG Visualization - colorful data visualization showing sorting algorithm performance */}
            <svg
              viewBox="0 0 800 400"
              className="w-full h-auto rounded-lg shadow-md"
            >
              <rect width="800" height="400" fill="#f8f9fa" />
              
              {/* Graph Background */}
              <g>
                <rect x="50" y="50" width="700" height="300" fill="#ffffff" stroke="#e0e0e0" strokeWidth="1" />
                
                {/* Grid Lines */}
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <line 
                    key={`grid-y-${i}`}
                    x1="50" 
                    y1={50 + i * 60} 
                    x2="750" 
                    y2={50 + i * 60} 
                    stroke="#e0e0e0" 
                    strokeWidth="1" 
                  />
                ))}
                
                {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <line 
                    key={`grid-x-${i}`}
                    x1={50 + i * 100} 
                    y1="50" 
                    x2={50 + i * 100} 
                    y2="350" 
                    stroke="#e0e0e0" 
                    strokeWidth="1" 
                  />
                ))}
                
                {/* Axes */}
                <line x1="50" y1="350" x2="750" y2="350" stroke="#333333" strokeWidth="2" />
                <line x1="50" y1="50" x2="50" y2="350" stroke="#333333" strokeWidth="2" />
                
                {/* Axis Labels */}
                <text x="400" y="390" textAnchor="middle" fill="#333333" fontSize="14">Input Size (n)</text>
                <text x="20" y="200" textAnchor="middle" fill="#333333" fontSize="14" transform="rotate(-90, 20, 200)">Time Complexity</text>
                
                {/* Data Curves */}
                {/* O(n) */}
                <path 
                  d="M50,350 Q400,200 750,50" 
                  fill="none" 
                  stroke="#4CAF50" 
                  strokeWidth="3"
                />
                
                {/* O(n log n) */}
                <path 
                  d="M50,350 Q400,150 750,100" 
                  fill="none" 
                  stroke="#3949AB" 
                  strokeWidth="3" 
                />
                
                {/* O(n²) */}
                <path 
                  d="M50,350 Q400,100 750,200" 
                  fill="none" 
                  stroke="#FF5722" 
                  strokeWidth="3" 
                />
                
                {/* Legend */}
                <rect x="600" y="60" width="15" height="15" fill="#4CAF50" />
                <text x="625" y="73" fill="#333333" fontSize="12">O(n)</text>
                
                <rect x="600" y="85" width="15" height="15" fill="#3949AB" />
                <text x="625" y="98" fill="#333333" fontSize="12">O(n log n)</text>
                
                <rect x="600" y="110" width="15" height="15" fill="#FF5722" />
                <text x="625" y="123" fill="#333333" fontSize="12">O(n²)</text>
              </g>
            </svg>
            
            <h3 className="font-poppins font-semibold text-lg">Time Complexity</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-[#3949AB]/10">
                    <th className="border border-neutral-100 px-4 py-2 text-left">Algorithm</th>
                    <th className="border border-neutral-100 px-4 py-2 text-left">Best Case</th>
                    <th className="border border-neutral-100 px-4 py-2 text-left">Average Case</th>
                    <th className="border border-neutral-100 px-4 py-2 text-left">Worst Case</th>
                    <th className="border border-neutral-100 px-4 py-2 text-left">Space</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-neutral-100 px-4 py-2 font-medium">Bubble Sort</td>
                    <td className="border border-neutral-100 px-4 py-2">O(n)</td>
                    <td className="border border-neutral-100 px-4 py-2">O(n²)</td>
                    <td className="border border-neutral-100 px-4 py-2">O(n²)</td>
                    <td className="border border-neutral-100 px-4 py-2">O(1)</td>
                  </tr>
                  <tr className="bg-neutral-100/30">
                    <td className="border border-neutral-100 px-4 py-2 font-medium">Selection Sort</td>
                    <td className="border border-neutral-100 px-4 py-2">O(n²)</td>
                    <td className="border border-neutral-100 px-4 py-2">O(n²)</td>
                    <td className="border border-neutral-100 px-4 py-2">O(n²)</td>
                    <td className="border border-neutral-100 px-4 py-2">O(1)</td>
                  </tr>
                  <tr>
                    <td className="border border-neutral-100 px-4 py-2 font-medium">Insertion Sort</td>
                    <td className="border border-neutral-100 px-4 py-2">O(n)</td>
                    <td className="border border-neutral-100 px-4 py-2">O(n²)</td>
                    <td className="border border-neutral-100 px-4 py-2">O(n²)</td>
                    <td className="border border-neutral-100 px-4 py-2">O(1)</td>
                  </tr>
                  <tr className="bg-neutral-100/30">
                    <td className="border border-neutral-100 px-4 py-2 font-medium">Merge Sort</td>
                    <td className="border border-neutral-100 px-4 py-2">O(n log n)</td>
                    <td className="border border-neutral-100 px-4 py-2">O(n log n)</td>
                    <td className="border border-neutral-100 px-4 py-2">O(n log n)</td>
                    <td className="border border-neutral-100 px-4 py-2">O(n)</td>
                  </tr>
                  <tr>
                    <td className="border border-neutral-100 px-4 py-2 font-medium">Quick Sort</td>
                    <td className="border border-neutral-100 px-4 py-2">O(n log n)</td>
                    <td className="border border-neutral-100 px-4 py-2">O(n log n)</td>
                    <td className="border border-neutral-100 px-4 py-2">O(n²)</td>
                    <td className="border border-neutral-100 px-4 py-2">O(log n)</td>
                  </tr>
                  <tr className="bg-neutral-100/30">
                    <td className="border border-neutral-100 px-4 py-2 font-medium">Heap Sort</td>
                    <td className="border border-neutral-100 px-4 py-2">O(n log n)</td>
                    <td className="border border-neutral-100 px-4 py-2">O(n log n)</td>
                    <td className="border border-neutral-100 px-4 py-2">O(n log n)</td>
                    <td className="border border-neutral-100 px-4 py-2">O(1)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            {/* Abstract algorithm patterns SVG */}
            <svg viewBox="0 0 800 400" className="w-full h-auto rounded-lg shadow-md mt-6">
              {/* Background */}
              <rect width="800" height="400" fill="#f0f4f8" />
              
              {/* Abstract algorithm visualization patterns */}
              <g>
                {/* Bubble Sort Pattern */}
                <g transform="translate(50, 50)">
                  <rect width="150" height="150" fill="#ffffff" stroke="#e0e0e0" strokeWidth="1" rx="5" />
                  <text x="75" y="20" textAnchor="middle" fill="#333333" fontWeight="bold">Bubble Sort</text>
                  
                  {/* Bubbling visualization */}
                  {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                    <circle
                      key={`bubble-${i}`}
                      cx={20 + (i * 18)} 
                      cy={80 - (i * 5) % 30}
                      r={10 - (i % 3)}
                      fill="#3949AB"
                      opacity={0.7 - (i * 0.1)}
                    />
                  ))}
                  <path d="M20,100 Q75,70 130,100" fill="none" stroke="#FF5722" strokeWidth="2" strokeDasharray="5,3" />
                </g>
                
                {/* Merge Sort Pattern */}
                <g transform="translate(250, 50)">
                  <rect width="150" height="150" fill="#ffffff" stroke="#e0e0e0" strokeWidth="1" rx="5" />
                  <text x="75" y="20" textAnchor="middle" fill="#333333" fontWeight="bold">Merge Sort</text>
                  
                  {/* Tree visualization */}
                  <line x1="75" y1="40" x2="40" y2="70" stroke="#00ACC1" strokeWidth="2" />
                  <line x1="75" y1="40" x2="110" y2="70" stroke="#00ACC1" strokeWidth="2" />
                  <line x1="40" y1="70" x2="25" y2="100" stroke="#00ACC1" strokeWidth="2" />
                  <line x1="40" y1="70" x2="55" y2="100" stroke="#00ACC1" strokeWidth="2" />
                  <line x1="110" y1="70" x2="95" y2="100" stroke="#00ACC1" strokeWidth="2" />
                  <line x1="110" y1="70" x2="125" y2="100" stroke="#00ACC1" strokeWidth="2" />
                  
                  <circle cx="75" cy="40" r="8" fill="#4CAF50" />
                  <circle cx="40" cy="70" r="8" fill="#4CAF50" />
                  <circle cx="110" cy="70" r="8" fill="#4CAF50" />
                  <circle cx="25" cy="100" r="8" fill="#4CAF50" />
                  <circle cx="55" cy="100" r="8" fill="#4CAF50" />
                  <circle cx="95" cy="100" r="8" fill="#4CAF50" />
                  <circle cx="125" cy="100" r="8" fill="#4CAF50" />
                </g>
                
                {/* Quick Sort Pattern */}
                <g transform="translate(450, 50)">
                  <rect width="150" height="150" fill="#ffffff" stroke="#e0e0e0" strokeWidth="1" rx="5" />
                  <text x="75" y="20" textAnchor="middle" fill="#333333" fontWeight="bold">Quick Sort</text>
                  
                  {/* Pivot and partition visualization */}
                  <line x1="20" y1="80" x2="130" y2="80" stroke="#e0e0e0" strokeWidth="1" />
                  <circle cx="75" cy="80" r="10" fill="#FF5722" />
                  <text x="75" y="84" textAnchor="middle" fill="#ffffff" fontSize="10">P</text>
                  
                  {[0, 1, 2, 3, 4].map((i) => (
                    <circle
                      key={`qs-left-${i}`}
                      cx={25 + (i * 10)}
                      cy="80"
                      r="6"
                      fill="#3949AB"
                      opacity="0.8"
                    />
                  ))}
                  
                  {[0, 1, 2, 3, 4].map((i) => (
                    <circle
                      key={`qs-right-${i}`}
                      cx={95 + (i * 10)}
                      cy="80"
                      r="6"
                      fill="#4CAF50"
                      opacity="0.8"
                    />
                  ))}
                </g>
                
                {/* Insertion Sort Pattern */}
                <g transform="translate(650, 50)">
                  <rect width="150" height="150" fill="#ffffff" stroke="#e0e0e0" strokeWidth="1" rx="5" />
                  <text x="75" y="20" textAnchor="middle" fill="#333333" fontWeight="bold">Insertion Sort</text>
                  
                  {/* Insertion visualization */}
                  <line x1="20" y1="60" x2="130" y2="60" stroke="#e0e0e0" strokeWidth="1" />
                  <line x1="20" y1="100" x2="130" y2="100" stroke="#e0e0e0" strokeWidth="1" />
                  
                  {[0, 1, 2, 3, 4].map((i) => (
                    <rect
                      key={`ins-top-${i}`}
                      x={25 + (i * 20)}
                      y="50"
                      width="15"
                      height="20"
                      fill="#4CAF50"
                      stroke="#ffffff"
                    />
                  ))}
                  
                  {[0, 1, 2, 4].map((i) => (
                    <rect
                      key={`ins-bottom-${i}`}
                      x={25 + (i * 20)}
                      y="90"
                      width="15"
                      height="20"
                      fill="#BBDEFB"
                      stroke="#ffffff"
                    />
                  ))}
                  
                  <rect x="65" y="80" width="15" height="20" fill="#FF5722" />
                  <path d="M72,80 L72,65 L85,65" fill="none" stroke="#FF5722" strokeWidth="2" strokeDasharray="3,2" />
                </g>
                
                {/* Selection Sort Pattern */}
                <g transform="translate(50, 220)">
                  <rect width="150" height="150" fill="#ffffff" stroke="#e0e0e0" strokeWidth="1" rx="5" />
                  <text x="75" y="20" textAnchor="middle" fill="#333333" fontWeight="bold">Selection Sort</text>
                  
                  {/* Selection visualization */}
                  <line x1="20" y1="80" x2="130" y2="80" stroke="#e0e0e0" strokeWidth="1" />
                  
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <rect
                      key={`sel-${i}`}
                      x={30 + (i * 17)}
                      y="70"
                      width="12"
                      height={10 + (Math.abs(3 - i) * 5)}
                      fill={i === 2 ? "#FF5722" : "#3949AB"}
                      opacity={i < 2 ? 0.5 : 1}
                    />
                  ))}
                  
                  <path d="M30,100 L125,100" stroke="#4CAF50" strokeWidth="2" />
                  <path d="M63,70 L63,50 L30,50" fill="none" stroke="#FF5722" strokeWidth="2" strokeDasharray="3,2" />
                </g>
                
                {/* Heap Sort Pattern */}
                <g transform="translate(250, 220)">
                  <rect width="150" height="150" fill="#ffffff" stroke="#e0e0e0" strokeWidth="1" rx="5" />
                  <text x="75" y="20" textAnchor="middle" fill="#333333" fontWeight="bold">Heap Sort</text>
                  
                  {/* Heap visualization */}
                  <line x1="75" y1="45" x2="45" y2="75" stroke="#00ACC1" strokeWidth="2" />
                  <line x1="75" y1="45" x2="105" y2="75" stroke="#00ACC1" strokeWidth="2" />
                  <line x1="45" y1="75" x2="30" y2="105" stroke="#00ACC1" strokeWidth="2" />
                  <line x1="45" y1="75" x2="60" y2="105" stroke="#00ACC1" strokeWidth="2" />
                  <line x1="105" y1="75" x2="90" y2="105" stroke="#00ACC1" strokeWidth="2" />
                  <line x1="105" y1="75" x2="120" y2="105" stroke="#00ACC1" strokeWidth="2" />
                  
                  <circle cx="75" cy="45" r="15" fill="#FF5722" />
                  <text x="75" y="50" textAnchor="middle" fill="#ffffff" fontSize="12">9</text>
                  
                  <circle cx="45" cy="75" r="15" fill="#FF9800" />
                  <text x="45" y="80" textAnchor="middle" fill="#ffffff" fontSize="12">7</text>
                  
                  <circle cx="105" cy="75" r="15" fill="#FF9800" />
                  <text x="105" y="80" textAnchor="middle" fill="#ffffff" fontSize="12">8</text>
                  
                  <circle cx="30" cy="105" r="15" fill="#4CAF50" />
                  <text x="30" y="110" textAnchor="middle" fill="#ffffff" fontSize="12">3</text>
                  
                  <circle cx="60" cy="105" r="15" fill="#4CAF50" />
                  <text x="60" y="110" textAnchor="middle" fill="#ffffff" fontSize="12">5</text>
                  
                  <circle cx="90" cy="105" r="15" fill="#4CAF50" />
                  <text x="90" y="110" textAnchor="middle" fill="#ffffff" fontSize="12">6</text>
                  
                  <circle cx="120" cy="105" r="15" fill="#4CAF50" />
                  <text x="120" y="110" textAnchor="middle" fill="#ffffff" fontSize="12">4</text>
                </g>
                
                {/* Algorithm Efficiency Comparison */}
                <g transform="translate(450, 220)">
                  <rect width="350" height="150" fill="#ffffff" stroke="#e0e0e0" strokeWidth="1" rx="5" />
                  <text x="175" y="25" textAnchor="middle" fill="#333333" fontWeight="bold" fontSize="14">Algorithm Comparison</text>
                  
                  {/* Bar chart */}
                  <g transform="translate(50, 40)">
                    <line x1="0" y1="100" x2="250" y2="100" stroke="#333333" strokeWidth="1" />
                    <line x1="0" y1="0" x2="0" y2="100" stroke="#333333" strokeWidth="1" />
                    
                    {/* Bars */}
                    <rect x="20" y="60" width="25" height="40" fill="#3949AB" />
                    <rect x="65" y="20" width="25" height="80" fill="#FF5722" />
                    <rect x="110" y="40" width="25" height="60" fill="#4CAF50" />
                    <rect x="155" y="10" width="25" height="90" fill="#00ACC1" />
                    <rect x="200" y="35" width="25" height="65" fill="#FF9800" />
                    
                    {/* Labels */}
                    <text x="32" y="115" textAnchor="middle" fill="#333333" fontSize="10">Merge</text>
                    <text x="77" y="115" textAnchor="middle" fill="#333333" fontSize="10">Bubble</text>
                    <text x="122" y="115" textAnchor="middle" fill="#333333" fontSize="10">Insertion</text>
                    <text x="167" y="115" textAnchor="middle" fill="#333333" fontSize="10">Selection</text>
                    <text x="212" y="115" textAnchor="middle" fill="#333333" fontSize="10">Quick</text>
                    
                    <text x="-10" y="50" textAnchor="end" fill="#333333" fontSize="10">Speed</text>
                  </g>
                </g>
              </g>
            </svg>
            
            <h3 className="font-poppins font-semibold text-lg">How to Use This Visualizer</h3>
            <ol className="list-decimal pl-5 space-y-2 text-neutral-800/80">
              <li>Select a sorting algorithm from the dropdown menu</li>
              <li>Adjust the array size and visualization speed using the sliders</li>
              <li>Click "Shuffle" to randomize the array</li>
              <li>Click "Sort" to start the visualization</li>
              <li>Use "Pause" to pause the sorting process</li>
              <li>Toggle sound effects with the sound button</li>
              <li>Enter custom values in the custom input section if desired</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
