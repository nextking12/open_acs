"use client";

import { isValidElement, type ReactNode } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { Mermaid } from "./Mermaid";

// A fenced code block (```lang) renders as <pre><code class="language-lang">.
// We override <pre>: if it wraps a ```mermaid block, render a diagram instead;
// otherwise fall back to a normal <pre>.
const components: Components = {
  pre({ children }) {
    if (isValidElement(children)) {
      const codeProps = children.props as {
        className?: string;
        children?: ReactNode;
      };
      if (codeProps.className?.includes("language-mermaid")) {
        return <Mermaid chart={String(codeProps.children).trim()} />;
      }
    }
    return <pre>{children}</pre>;
  },
};

export function LessonContent({ content }: { content: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {content}
    </ReactMarkdown>
  );
}
