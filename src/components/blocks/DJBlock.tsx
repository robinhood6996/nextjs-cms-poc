import React from "react";

interface DJBlockProps {
  title: string;
}

export default function DJBlock({ title }: DJBlockProps) {
  return (
    <div className="dj-block">
      <h2>{title}</h2>
      {/* Add DJ details */}
    </div>
  );
}
