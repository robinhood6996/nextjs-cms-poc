import React from "react";
import { PageBlock, Module } from "../../lib/types";
import CarouselBlock from "./CarouselBlock";
import NewsBlock from "./NewsBlock";
import DJBlock from "./DJBlock";
import ContentHTMLBlock from "./ContentHtmlBlock";

interface BlockRendererProps {
  blocks: PageBlock[];
  modules: Module[];
}

export default function BlockRenderer({ blocks, modules }: BlockRendererProps) {


  return (
    <>
      {blocks.map((block) => {
        const _module = modules.find((m) => m.ModuleID === block.ModuleID);
        const content =
          block.Content?.find((c) => c.LangageID === 1)
            ?.Title || "";

        if (!_module)
          return <p key={block.BlockID}>Unknown module: {block.ModuleID}</p>;

        switch (_module?.ModuleName) {
          case "Carusel":
            return <CarouselBlock key={block.BlockID} title={content} />;
          case "ContentHTML":
            return <ContentHTMLBlock key={block.BlockID} title={content} />;
          case "News":
            return <NewsBlock key={block.BlockID} title={content} />;
          case "DJs":
            return <DJBlock key={block.BlockID} title={content} />;
          default:
            return (
              <p key={block.BlockID}>
                Unknown block type: {_module?.ModuleName || "undefined"}
              </p>
            );
        }
      })}
    </>
  );
}
