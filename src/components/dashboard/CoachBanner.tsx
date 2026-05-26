import React from "react";
import { Brain } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CoachBannerProps {
  onViewInsights: () => void;
}

export const CoachBanner: React.FC<CoachBannerProps> = ({ onViewInsights }) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-5 flex items-center gap-4">
      <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
        <Brain className="w-5 h-5 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white font-semibold text-sm">AI Coach Insight</p>
        <p className="text-blue-100 text-sm mt-0.5 truncate">
          Your peak focus window is 9–11 AM. You have 47 minutes left — start your most complex task now.
        </p>
      </div>
      <button
        onClick={onViewInsights}
        className="flex-shrink-0 px-4 py-2 bg-white/20 hover:bg-white/30 text-white text-sm font-medium rounded-xl transition-colors duration-200"
      >
        View Insights
      </button>
    </div>
  );
};
