// lib/types.ts
export interface Module {
  ModuleID: number;
  ModuleName: string;
  DataView: string;
}

export interface Language {
  LangageID: number;
  Name: string;
  LangCode: string;
  Flag: string;
}

export interface PageTitle {
  LangageID: number;
  Active: number;
  Title?: string; // Optional because it might not exist in some cases
}

export interface PageBlockContent {
  LangageID: number;
  Title: string;
}

export interface PageBlock {
  BlockID: number;
  BlockName: string;
  ModuleID: number;
  Content?: PageBlockContent[];
}

export interface Page {
  ID: number;
  Name: string;
  Title: PageTitle[];
  Blocks: PageBlock[];
}

export interface DJContent {
  LanguageID: number;
  Content: string;
}

export interface DJ {
  ID: number;
  Name: string;
  Content: DJContent[];
}

export interface NewsContent {
  LanguageID: number;
  Content: string;
}

export interface NewsItem {
  ID: number;
  Name: string;
  Date: string;
  Content: NewsContent[];
}

export interface APIResponse {
  Modules: Module[];
  Languages: Language[];
  Pages: Page[];
  Djs: DJ[];
  News: NewsItem[];
}
