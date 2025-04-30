import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { NextSeo } from 'next-seo';
import ReactMarkdown from 'react-markdown';

export default function BlogPost({ post }) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <NextSeo
        title={`${post.title} - 我的博客`}
        description={post.description}
        openGraph={{
          title: post.title,
          description: post.description
        }}
      />
      <article>
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="text-gray-600 mb-6">
          发布日期: {post.date}
        </div>
        <div className="prose lg:prose-xl">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </article>
    </div>
  );
}

export async function getStaticPaths() {
  const blogsDirectory = path.join(process.cwd(), 'content/blogs');
  const filenames = fs.readdirSync(blogsDirectory);

  const paths = filenames
    .filter(filename => filename.endsWith('.md'))
    .map(filename => ({
      params: { slug: filename.replace('.md', '') }
    }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const blogsDirectory = path.join(process.cwd(), 'content/blogs');
  const fullPath = path.join(blogsDirectory, `${params.slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const { data, content } = matter(fileContents);

  return {
    props: {
      post: {
        slug: params.slug,
        title: data.title,
        date: typeof data.date === 'string' ? data.date : data.date.toISOString().split('T')[0],
        description: data.description,
        content: content
      }
    }
  };
}
