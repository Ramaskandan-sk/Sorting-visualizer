import SortingVisualizer from "@/components/SortingVisualizer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sorting Algorithm Visualizer",
  description: "Interactive visualization tool for common sorting algorithms with step-by-step animations and explanations.",
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
      <SortingVisualizer />
    </div>
  );
}
