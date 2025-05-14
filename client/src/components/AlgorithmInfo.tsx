import { useState } from "react";
import { Algorithm, getPseudocode } from "@/lib/algorithms";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AlgorithmInfoProps {
  algorithm: Algorithm;
}

interface AlgorithmComplexity {
  best: string;
  average: string;
  worst: string;
  space: string;
}

const complexityData: Record<Algorithm, AlgorithmComplexity> = {
  bubble: {
    best: "O(n)",
    average: "O(n²)",
    worst: "O(n²)",
    space: "O(1)"
  },
  selection: {
    best: "O(n²)",
    average: "O(n²)",
    worst: "O(n²)",
    space: "O(1)"
  },
  insertion: {
    best: "O(n)",
    average: "O(n²)",
    worst: "O(n²)",
    space: "O(1)"
  },
  merge: {
    best: "O(n log n)",
    average: "O(n log n)",
    worst: "O(n log n)",
    space: "O(n)"
  },
  quick: {
    best: "O(n log n)",
    average: "O(n log n)",
    worst: "O(n²)",
    space: "O(log n)"
  },
  heap: {
    best: "O(n log n)",
    average: "O(n log n)",
    worst: "O(n log n)",
    space: "O(1)"
  }
};

const AlgorithmInfo = ({ algorithm }: AlgorithmInfoProps) => {
  const [activeTab, setActiveTab] = useState<"pseudocode" | "complexity">("pseudocode");
  const complexity = complexityData[algorithm];

  return (
    <div className="bg-white rounded-xl shadow-md p-5 h-[400px] flex flex-col">
      <h2 className="font-poppins font-semibold text-lg mb-4">Algorithm Details</h2>
      
      {/* Algorithm Info Tabs */}
      <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as "pseudocode" | "complexity")}>
        <TabsList className="mb-4 border-b border-neutral-100 w-full rounded-none bg-transparent">
          <TabsTrigger 
            value="pseudocode" 
            className={`py-2 px-4 border-b-2 transition-colors ${
              activeTab === "pseudocode" 
                ? "border-[#3949AB] text-[#3949AB] font-medium" 
                : "border-transparent text-neutral-800/60 hover:text-neutral-800"
            }`}
          >
            Pseudocode
          </TabsTrigger>
          
          <TabsTrigger 
            value="complexity" 
            className={`py-2 px-4 border-b-2 transition-colors ${
              activeTab === "complexity" 
                ? "border-[#3949AB] text-[#3949AB] font-medium" 
                : "border-transparent text-neutral-800/60 hover:text-neutral-800"
            }`}
          >
            Complexity
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="pseudocode" className="flex-grow h-60 overflow-y-auto mt-0 overflow-y-auto custom-scrollbar">
          <pre className="font-mono text-sm whitespace-pre-wrap p-2 bg-neutral-100/50 rounded-lg">
            <div dangerouslySetInnerHTML={{ __html: getPseudocode(algorithm) }} />
          </pre>
        </TabsContent>
        
        <TabsContent value="complexity" className="mt-0 overflow-y-auto custom-scrollbar">
          <div className="bg-neutral-100/50 p-4 rounded-lg">
            <table className="min-w-full">
              <tbody>
                <tr>
                  <td className="py-2 text-sm font-semibold">Best Case:</td>
                  <td className="py-2 text-sm">{complexity.best}</td>
                </tr>
                <tr>
                  <td className="py-2 text-sm font-semibold">Average Case:</td>
                  <td className="py-2 text-sm">{complexity.average}</td>
                </tr>
                <tr>
                  <td className="py-2 text-sm font-semibold">Worst Case:</td>
                  <td className="py-2 text-sm">{complexity.worst}</td>
                </tr>
                <tr>
                  <td className="py-2 text-sm font-semibold">Space Complexity:</td>
                  <td className="py-2 text-sm">{complexity.space}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AlgorithmInfo;
