import React, { memo } from "react";
import clsx from "clsx";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

import { Checkbox } from "@acme/ui";

import "./Readme.css";

export interface ReadmeProps {
  children: string;
  className?: string;
}

const Readme: React.FC<ReadmeProps> = ({ children, className }) => {
  console.log(children);

  return (
    <ReactMarkdown
      className={clsx("", className)}
      remarkPlugins={[[remarkGfm]]}
      rehypePlugins={[rehypeRaw]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              {...props}
              style={oneDark}
              language={match[1]}
              PreTag="div"
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code {...props} className={className}>
              {children}
            </code>
          );
        },
        li({ node, checked, children: liChildren, className, ...props }) {
          if (checked !== null && checked !== undefined) {
            return (
              <li {...props} className={clsx(className, "flex gap-x-3")}>
                <Checkbox isSelected={checked}>{liChildren.slice(1)}</Checkbox>
              </li>
            );
          }

          return (
            <li {...props} className={className}>
              {liChildren}
            </li>
          );
        },
        a({ node, className, children, ...props }) {
          // Make the link always open in a new tab.
          return (
            <a
              {...props}
              className={className}
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          );
        },
      }}
    >
      {children}
    </ReactMarkdown>
  );
};

export default memo(Readme);
