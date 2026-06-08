import fs from 'fs';
import path from 'path';

// Blog posts live as markdown files (with YAML-ish frontmatter) in src/content/blog.
// The list page and sitemap read the lightweight metadata index in src/data/blog.js;
// this module only reads + renders an individual post's body for the detail page.
// Zero external deps: a minimal frontmatter parser + markdown→HTML renderer, since
// this project intentionally ships with only next/react as dependencies.

const BLOG_DIR = path.join(process.cwd(), 'src', 'content', 'blog');

// --- Frontmatter -----------------------------------------------------------

function parseFrontmatter(raw) {
  const match = /^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/.exec(raw);
  if (!match) return { data: {}, content: raw };

  const data = {};
  for (const line of match[1].split('\n')) {
    const m = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(line);
    if (!m) continue;
    let value = m[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1).replace(/\\"/g, '"');
    }
    data[m[1]] = value;
  }
  return { data, content: match[2] };
}

// --- Inline markdown -------------------------------------------------------

function escapeHtml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function renderInline(text) {
  let out = escapeHtml(text);

  // Links: [label](url)
  out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, url) => {
    const safeUrl = url.replace(/"/g, '%22');
    const external = /^https?:\/\//i.test(safeUrl);
    const attrs = external ? ' target="_blank" rel="noopener noreferrer"' : '';
    return `<a href="${safeUrl}" class="text-teal hover:text-teal-hover underline"${attrs}>${label}</a>`;
  });

  // Bold then italic (bold first so ** isn't eaten by * rule)
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  out = out.replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>');
  out = out.replace(/(^|[^_])_([^_]+)_/g, '$1<em>$2</em>');

  // Inline code
  out = out.replace(/`([^`]+)`/g, '<code class="bg-ice-white px-1.5 py-0.5 rounded text-sm">$1</code>');

  return out;
}

// --- Block markdown --------------------------------------------------------

export function markdownToHtml(markdown) {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const html = [];
  let i = 0;

  const flushList = (type, items) => {
    const tag = type === 'ol' ? 'ol' : 'ul';
    const cls =
      tag === 'ol'
        ? 'list-decimal list-outside pl-6 space-y-2 my-4 text-dark-gray'
        : 'list-disc list-outside pl-6 space-y-2 my-4 text-dark-gray';
    html.push(
      `<${tag} class="${cls}">${items
        .map((it) => `<li class="leading-relaxed">${renderInline(it)}</li>`)
        .join('')}</${tag}>`
    );
  };

  while (i < lines.length) {
    const line = lines[i];

    // Blank line
    if (!line.trim()) {
      i++;
      continue;
    }

    // Heading
    const h = /^(#{1,6})\s+(.*)$/.exec(line);
    if (h) {
      const level = Math.min(h[1].length, 6);
      const sizes = {
        1: 'text-3xl font-bold text-navy mt-10 mb-4',
        2: 'text-2xl font-bold text-navy mt-10 mb-4',
        3: 'text-xl font-semibold text-navy mt-8 mb-3',
        4: 'text-lg font-semibold text-navy mt-6 mb-2',
        5: 'text-base font-semibold text-navy mt-6 mb-2',
        6: 'text-base font-semibold text-navy mt-6 mb-2',
      };
      const tag = `h${Math.max(level, 2)}`; // never emit <h1> in body (page has one)
      html.push(`<${tag} class="${sizes[level]}">${renderInline(h[2].trim())}</${tag}>`);
      i++;
      continue;
    }

    // Horizontal rule
    if (/^(-{3,}|\*{3,}|_{3,})\s*$/.test(line)) {
      html.push('<hr class="my-8 border-warm-gray" />');
      i++;
      continue;
    }

    // Blockquote
    if (/^>\s?/.test(line)) {
      const quote = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        quote.push(lines[i].replace(/^>\s?/, ''));
        i++;
      }
      html.push(
        `<blockquote class="border-l-4 border-sky-accent bg-ice-white pl-4 py-2 my-6 italic text-dark-gray">${renderInline(
          quote.join(' ')
        )}</blockquote>`
      );
      continue;
    }

    // Unordered list
    if (/^\s*[-*]\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*[-*]\s+/, ''));
        i++;
      }
      flushList('ul', items);
      continue;
    }

    // Ordered list
    if (/^\s*\d+\.\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*\d+\.\s+/, ''));
        i++;
      }
      flushList('ol', items);
      continue;
    }

    // Paragraph (gather consecutive non-blank, non-block lines)
    const para = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^(#{1,6})\s+/.test(lines[i]) &&
      !/^>\s?/.test(lines[i]) &&
      !/^\s*[-*]\s+/.test(lines[i]) &&
      !/^\s*\d+\.\s+/.test(lines[i]) &&
      !/^(-{3,}|\*{3,}|_{3,})\s*$/.test(lines[i])
    ) {
      para.push(lines[i].trim());
      i++;
    }
    html.push(
      `<p class="text-dark-gray leading-relaxed my-4">${renderInline(para.join(' '))}</p>`
    );
  }

  return html.join('\n');
}

// --- Public API ------------------------------------------------------------

export function getPostBySlug(slug) {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = parseFrontmatter(raw);
  return {
    slug,
    ...data,
    html: markdownToHtml(content.trim()),
  };
}

export function getAllSlugs() {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''));
}
