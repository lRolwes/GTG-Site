import React from "react";

export default function Button({
  className,
  icon,
  children,
}: {
  className?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="inline-block w-full h-full sm:w-auto">
      <div
        className={`font-heading rounded px-4 flex items-center justify-center py-2.5 button cursor-pointer transition duration-200 ${className}`}
      >
        {icon && <div className="">{icon}</div>}
        {/* translate the text since heading font offsets it */}
        <div className="translate-y-0.5 whitespace-nowrap flex items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
}
