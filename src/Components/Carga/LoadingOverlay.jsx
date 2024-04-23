import React from "react";
import "../Carga/LoadingOverlay.css";

export const LoadingOverlay = () => {
  return (
    <div className="loading-overlay">
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};


