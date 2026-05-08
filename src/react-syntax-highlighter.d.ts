declare module "react-syntax-highlighter" {
  import type { ComponentType } from "react";

  export interface StyleConfig {
    [key: string]: React.CSSProperties;
  }

  export interface SyntaxHighlighterProps {
    language?: string;
    style?: StyleConfig;
    customStyle?: React.CSSProperties;
    showLineNumbers?: boolean;
    lineNumberStyle?: React.CSSProperties;
    children: string;
  }

  export const Prism: ComponentType<SyntaxHighlighterProps>;
  export default Prism;
}

declare module "react-syntax-highlighter/dist/esm/styles/prism" {
  import type { StyleConfig } from "react-syntax-highlighter";
  export const oneDark: StyleConfig;
}
