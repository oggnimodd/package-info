import React, { memo, useCallback } from "react";
import clsx from "clsx";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { getRepoPath } from "helpers";

import { Checkbox } from "@acme/ui";

export interface ReadmeProps {
  children: string;
  className?: string;
  defaultBranch: string;
  repoUrl: string;
}

interface CreateGithubUrlProps {
  type: "image" | "link";
  path?: string;
}

const Readme: React.FC<ReadmeProps> = ({
  children,
  className,
  defaultBranch,
  repoUrl,
}) => {
  const createGithubUrl = useCallback(
    ({ type, path = "" }: CreateGithubUrlProps) => {
      const hasProtocol =
        path.startsWith("http://") || path.startsWith("https://");

      if (hasProtocol) {
        // URL already has a protocol, do nothing
        return path;
      } else {
        let modifiedUrl;
        if (type === "image") {
          // Prepend the URL with the desired protocol and path
          modifiedUrl = `https://raw.githubusercontent.com/${getRepoPath(
            repoUrl,
          )}/${defaultBranch}/${path.replace("./", "")}`;
        } else if (type === "link") {
          modifiedUrl = `${repoUrl}/blob/${defaultBranch}/${path.replace(
            "./",
            "",
          )}`;
        }

        return modifiedUrl;
      }
    },
    [repoUrl, defaultBranch],
  );

  return (
    <ReactMarkdown
      className={clsx("readme pr-4", className)}
      remarkPlugins={[[remarkGfm]]}
      rehypePlugins={[rehypeRaw]}
      components={{
        code({ node, className, children, ref: _ref, ...props }) {
          const match = /language-(\w+)/.exec(className || "");

          // TODO: this is a hack to silent type error
          const ref = _ref as any;

          return match ? (
            <SyntaxHighlighter
              {...props}
              ref={ref}
              style={oneDark}
              language={match ? match[1] : "bash"}
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
        li({ node, children: liChildren, className, ...props }) {
          // li is a checkbox if the first element is and input with type checkbox
          const isCheckbox =
            node?.children[0]?.type === "element" &&
            node?.children[0]?.properties.type === "checkbox";

          if (isCheckbox) {
            const checked =
              node?.children[0]?.type === "element" &&
              node?.children[0]?.properties.checked;
            return (
              <li {...props} className={clsx(className, "flex gap-x-3")}>
                <Checkbox isSelected={Boolean(checked)}>{liChildren}</Checkbox>
              </li>
            );
          }

          return (
            <li {...props} className={className}>
              {liChildren}
            </li>
          );
        },
        a({ node, className, children, href, ...props }) {
          const formattedHref = createGithubUrl({
            path: href,
            type: "link",
          });

          // Make the link always open in a new tab.
          return (
            <a
              {...props}
              className={className}
              target="_blank"
              rel="noopener noreferrer"
              href={formattedHref}
            >
              {children}
            </a>
          );
        },
        img({ node, className, src, alt, ...props }) {
          const formattedSrc = createGithubUrl({
            path: src,
            type: "image",
          });

          return <img {...props} src={formattedSrc} alt={alt} />;
        },
        source({ node, className, srcSet, children, ...props }) {
          const formattedSrc = createGithubUrl({
            path: srcSet,
            type: "image",
          });

          return (
            <source {...props} className={className} srcSet={formattedSrc} />
          );
        },
      }}
    >
      {children}
    </ReactMarkdown>
  );
};

export default memo(Readme);
