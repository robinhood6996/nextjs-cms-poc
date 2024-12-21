import React from "react";

interface CarouselBlockProps {
  title: string;
}

export default function CarouselBlock({ title }: CarouselBlockProps) {
  return (
    <div className="carousel-block">
      <h2>{title}</h2>
      {/* Add carousel implementation */}
    </div>
  );
}
