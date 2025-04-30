import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import matter from 'gray-matter';
import { NextSeo } from 'next-seo';

export default function BlogIndex({ posts }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <NextSeo
        title="博客列表 - 我的网站"
        description="探索我的技术博客文章"
        openGraph={{
          title: '博客列表',
          description: '探索我的技术博客文章'
        }}
      />
      <h1 className="text-3xl font-bold mb-6">博客文章</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <div className="border p-4 rounded hover:shadow-lg transition">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-gray-600 mt-2">{post.description}</p>
              <div className="mt-4 text-sm text-gray-500">
                发布日期: {post.date}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const blogsDirectory = path.join(process.cwd(), 'content/blogs');
  const filenames = fs.readdirSync(blogsDirectory);

  const posts = filenames
    .filter(filename => filename.endsWith('.md'))
    .map(filename => {
      const fullPath = path.join(blogsDirectory, filename);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug: filename.replace('.md', ''),
        title: data.title,
        date: typeof data.date === 'string' ? data.date : data.date.toISOString().split('T')[0],
        description: data.description
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // 使用 getTime() 转换为数字

  return {
    props: {
      posts
    }
  };
}
