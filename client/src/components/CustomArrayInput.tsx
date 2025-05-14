import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TextCursorInput } from "lucide-react";

interface CustomArrayInputProps {
  onApply: (input: string) => void;
  isSorting: boolean;
  error: string | null;
}

const CustomArrayInput = ({ onApply, isSorting, error }: CustomArrayInputProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApply(inputValue);
  };

  return (
    <div className="mt-6 bg-white rounded-xl shadow-md p-5">
      <h2 className="font-poppins font-semibold text-lg mb-4">Custom Input</h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
        <div className="flex-grow">
          <Input
            id="custom-array"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isSorting}
            placeholder="Enter numbers separated by commas (e.g., 5,1,4,2,8)"
            className="px-4 py-2 border border-neutral-800/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3949AB]"
          />
          {error && (
            <p className="text-red-500 text-xs mt-1">{error}</p>
          )}
        </div>
        
        <Button
          type="submit"
          disabled={isSorting}
          className="px-6 py-2 bg-[#00ACC1] text-white rounded-lg hover:bg-[#00ACC1]/90 transition-colors flex items-center justify-center whitespace-nowrap"
        >
          <TextCursorInput className="h-4 w-4 mr-1" /> Apply Custom Array
        </Button>
      </form>
    </div>
  );
};

export default CustomArrayInput;
