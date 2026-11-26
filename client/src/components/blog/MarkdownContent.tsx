import type { ReactNode } from "react";

const INLINE_PATTERN = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)\s]+\)|\*[^*\n]+\*)/g;

const BLOCK_START = /^(#{1,4}\s|>\s?|[-*]\s+|\d+\.\s+|```)/;

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let index = 0;
  let match: RegExpExecArray | null;

  INLINE_PATTERN.lastIndex = 0;

  while ((match = INLINE_PATTERN.exec(text)) !== null) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));

    const token = match[0];
    const key = `${keyPrefix}-${index++}`;

    if (token.startsWith("**")) {
      nodes.push(
        <strong key={key} className="font-bold text-foreground">
          {token.slice(2, -2)}
        </strong>,
      );
    } else if (token.startsWith("`")) {
      nodes.push(
        <code
          key={key}
          dir="ltr"
          className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground"
        >
          {token.slice(1, -1)}
        </code>,
      );
    } else if (token.startsWith("[")) {
      const link = token.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
      if (link) {
        nodes.push(
          <a
            key={key}
            href={link[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-primary underline decoration-primary/40 underline-offset-4 transition-colors hover:decoration-primary"
          >
            {link[1]}
          </a>,
        );
      } else {
        nodes.push(token);
      }
    } else {
      nodes.push(
        <em key={key} className="italic">
          {token.slice(1, -1)}
        </em>,
      );
    }

    lastIndex = match.index + token.length;
  }

  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

function parseBlocks(content: string): ReactNode[] {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const blocks: ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      i++;
      continue;
    }

    if (trimmed.startsWith("```")) {
      const code: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        code.push(lines[i]);
        i++;
      }
      i++;
      blocks.push(
        <pre
          key={key++}
          dir="ltr"
          className="overflow-x-auto rounded-2xl bg-muted/70 p-4 text-sm leading-6 text-foreground"
        >
          <code>{code.join("\n")}</code>
        </pre>,
      );
      continue;
    }

    const heading = trimmed.match(/^(#{1,4})\s+(.*)$/);
    if (heading) {
      const level = heading[1].length;
      const text = heading[2];
      const blockKey = key++;
      const className =
        level <= 2
          ? "font-heading text-2xl font-bold leading-snug text-foreground pt-3"
          : level === 3
            ? "font-heading text-xl font-bold leading-snug text-foreground pt-2"
            : "font-heading text-lg font-bold leading-snug text-foreground pt-1";

      blocks.push(
        level <= 2 ? (
          <h2 key={blockKey} className={className}>
            {renderInline(text, `h${blockKey}`)}
          </h2>
        ) : level === 3 ? (
          <h3 key={blockKey} className={className}>
            {renderInline(text, `h${blockKey}`)}
          </h3>
        ) : (
          <h4 key={blockKey} className={className}>
            {renderInline(text, `h${blockKey}`)}
          </h4>
        ),
      );
      i++;
      continue;
    }

    if (trimmed.startsWith(">")) {
      const quote: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        quote.push(lines[i].trim().replace(/^>\s?/, ""));
        i++;
      }
      const blockKey = key++;
      blocks.push(
        <blockquote
          key={blockKey}
          className="rounded-e-2xl border-s-4 border-primary/40 bg-primary/5 px-4 py-3 italic text-muted-foreground"
        >
          {renderInline(quote.join(" "), `q${blockKey}`)}
        </blockquote>,
      );
      continue;
    }

    if (/^[-*]\s+/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[-*]\s+/, ""));
        i++;
      }
      const blockKey = key++;
      blocks.push(
        <ul key={blockKey} className="list-disc space-y-2 ps-6 marker:text-primary">
          {items.map((item, index) => (
            <li key={index}>{renderInline(item, `ul${blockKey}-${index}`)}</li>
          ))}
        </ul>,
      );
      continue;
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, ""));
        i++;
      }
      const blockKey = key++;
      blocks.push(
        <ol
          key={blockKey}
          className="list-decimal space-y-2 ps-6 marker:font-bold marker:text-primary"
        >
          {items.map((item, index) => (
            <li key={index}>{renderInline(item, `ol${blockKey}-${index}`)}</li>
          ))}
        </ol>,
      );
      continue;
    }

    const paragraph: string[] = [];
    while (i < lines.length && lines[i].trim() && !BLOCK_START.test(lines[i].trim())) {
      paragraph.push(lines[i].trim());
      i++;
    }
    const blockKey = key++;
    blocks.push(<p key={blockKey}>{renderInline(paragraph.join(" "), `p${blockKey}`)}</p>);
  }

  return blocks;
}

export default function MarkdownContent({
  content,
  className = "",
}: {
  content: string;
  className?: string;
}) {
  return (
    <div className={`space-y-5 text-base leading-8 text-foreground/85 ${className}`}>
      {parseBlocks(content)}
    </div>
  );
}
