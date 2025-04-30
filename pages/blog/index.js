import Link from 'next/link';
import { NextSeo } from 'next-seo';

// 直接定义博客列表
const BLOG_POSTS = [
  {
    slug: 'first-blog-post',
    title: '我的第一篇博客',
    date: '2025-05-01',
    description: '这是一篇测试博客文章'
  },
  {
    slug: 'nextjs-getting-started',
    title: 'Next.js 入门指南',
    date: '2025-04-15',
    description: '学习如何快速上手 Next.js 框架'
  },
  {
    slug: 'ai-image-generation',
    title: 'AI 图像生成技术',
    date: '2025-04-20',
    description: '深入探讨 AI 图像生成的最新技术发展'
  },
  {
    slug: 'tech-and-life',
    title: '技术改变生活',
    date: '2025-04-25',
    description: '关于技术、生活和个人成长的一些随想'
  }
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

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

// 对于静态导出，需要这个函数
export async function getStaticProps() {
  return {
    props: {
      posts: BLOG_POSTS
    }
  };
}
