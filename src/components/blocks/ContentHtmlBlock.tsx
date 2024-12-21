import React from "react";

interface ContentHTMLProps {
  title: string;
}

export default function ContentHTMLBlock({ title }: ContentHTMLProps) {
  return (
    <div
      className="content-html-block"
      dangerouslySetInnerHTML={{ __html: title }}
    />
  );
}
