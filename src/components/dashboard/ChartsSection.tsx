import React from "react";
import { FocusAreaChart, ProductivityBarChart, HabitCompletionChart } from "@/components/features/ProductivityChart";

interface ChartsSectionProps {}

export const ChartsSection: React.FC<ChartsSectionProps> = () => {
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <FocusAreaChart />
      </div>
      <ProductivityBarChart />
    </div>
  );
};

// HabitCompletionChart is used in HabitsSection, but if you want to include it here as well, you can add it.
