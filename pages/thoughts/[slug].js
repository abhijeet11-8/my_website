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
  return (
    <article>
      <h1>{meta.title}</h1>
      <p>{meta.date}</p>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
}
