import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  html: string;
};

async function markdownToHtml(markdown: string): Promise<string> {
  const file = await remark().use(remarkHtml).process(markdown);
  return String(file);
}

function listBlogSlugs(): string[] {
  try {
    if (!fs.existsSync(BLOG_DIR)) return [];
    return fs
      .readdirSync(BLOG_DIR)
      .filter((name) => name.endsWith(".md"))
      .map((name) => name.slice(0, -".md".length));
  } catch {
    return [];
  }
}

function resolveBlogMarkdownPath(slug: string): string | null {
  const base = path.basename(slug, ".md");
  if (!base || base === "." || base === "..") return null;
  const filePath = path.join(BLOG_DIR, `${base}.md`);
  const blogRoot = path.resolve(BLOG_DIR);
  const resolved = path.resolve(filePath);
  const relative = path.relative(blogRoot, resolved);
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    return null;
  }
  return filePath;
}

async function readPostFromFile(
  filePath: string,
  slug: string,
): Promise<BlogPost | null> {
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);
    const title = String(data.title ?? "").trim();
    const description = String(data.description ?? "").trim();
    const date = String(data.date ?? "").trim();
    const html = await markdownToHtml(content);
    return {
      slug,
      title,
      description,
      date,
      html,
    };
  } catch {
    return null;
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const slugs = listBlogSlugs();
  const paths = slugs
    .map((slug) => {
      const fp = resolveBlogMarkdownPath(slug);
      return fp ? { slug, filePath: fp } : null;
    })
    .filter((x): x is { slug: string; filePath: string } => x !== null);

  const posts = (
    await Promise.all(
      paths.map(({ slug, filePath }) => readPostFromFile(filePath, slug)),
    )
  ).filter((p): p is BlogPost => p !== null);

  posts.sort((a, b) => {
    const ta = Date.parse(a.date);
    const tb = Date.parse(b.date);
    if (!Number.isNaN(ta) && !Number.isNaN(tb) && ta !== tb) {
      return tb - ta;
    }
    return b.slug.localeCompare(a.slug);
  });

  return posts;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const filePath = resolveBlogMarkdownPath(slug);
  if (!filePath || !fs.existsSync(filePath)) return null;
  const baseSlug = path.basename(slug, ".md");
  return readPostFromFile(filePath, baseSlug);
}
