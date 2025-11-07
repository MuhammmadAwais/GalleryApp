import React from "react";

interface PanelProps {
  title?: string;
  children: React.ReactNode;
  className?: string; 
}

const Panel: React.FC<PanelProps> = ({ title, children, className = "" }) => {
  return (
    <div className={`bg-white shadow-md rounded-lg p-4 ${className}`}>
      {title && <h2 className="text-lg font-semibold mb-2">{title}</h2>}
      <div>{children}</div>
    </div>
  );
};

export default Panel;
