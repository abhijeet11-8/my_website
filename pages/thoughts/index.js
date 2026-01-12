import fs from "fs";
import matter from "gray-matter";
import Link from "next/link";

export async function getStaticProps() {
  const files = fs.readdirSync("content/thoughts");

  const posts = files.map(file => {
    const raw = fs.readFileSync(`content/thoughts/${file}`, "utf-8");
    const { data } = matter(raw);
    return {
      slug: file.replace(".md", ""),
      ...data
    };
  });

  return { props: { posts } };
}

export default function Thoughts({ posts }) {
  return (
    <div className="thoughts">
      <h1>Thoughts</h1>
      {posts.map(post => (
        <div key={post.slug}>
          <Link href={`/thoughts/${post.slug}`}>
            <h3>{post.title}</h3>
          </Link>
          <p>{post.date}</p>
        </div>
      ))}
    </div>
  );
}
