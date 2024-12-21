import React from "react";

interface NewsBlockProps {
  title: string;
}

export default function NewsBlock({ title }: NewsBlockProps) {
  return (
    <div className="news-block">
      <h2>{title}</h2>
      {/* Add news list or details */}
    </div>
  );
}
