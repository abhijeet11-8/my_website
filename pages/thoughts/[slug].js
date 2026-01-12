import fs from "fs";
import matter from "gray-matter";
import { marked } from "marked";

export async function getStaticPaths() {
  const files = fs.readdirSync("content/thoughts");

  return {
    paths: files.map(file => ({
      params: { slug: file.replace(".md", "") }
    })),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const file = fs.readFileSync(
    `content/thoughts/${params.slug}.md`,
    "utf-8"
  );

  const { content, data } = matter(file);

  return {
    props: {
      html: marked(content),
      meta: data
    }
  };
}

export default function Post({ html, meta }) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
  // prefix src="/..." image paths in rendered HTML so images resolve under repo basePath
  const adjustedHtml = html.replace(/src="\/(?!_next)/g, `src="${base}/`);
  // also prefix meta.cover if present
  const adjustedMeta = { ...meta };
  if (adjustedMeta.cover && adjustedMeta.cover.startsWith('/')) adjustedMeta.cover = `${base}${adjustedMeta.cover}`;

  return (
    <article>
      <h1>{adjustedMeta.title}</h1>
      <p>{adjustedMeta.date}</p>
      <div dangerouslySetInnerHTML={{ __html: adjustedHtml }} />
    </article>
  );
}
