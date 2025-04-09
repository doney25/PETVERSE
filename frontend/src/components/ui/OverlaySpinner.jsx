import { Loader2 } from "lucide-react";
import React from "react";

const OverlaySpinner = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center">
        <Loader2 className="animate-spin text-blue-600 w-8 h-8 mb-3" />
        <p className="text-gray-700 font-medium">Loading...</p>
      </div>
    </div>
  );
};

export default OverlaySpinner;
