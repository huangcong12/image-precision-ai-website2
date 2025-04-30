import { NextSeo } from 'next-seo';
import ReactMarkdown from 'react-markdown';

// 定义博客内容映射
const BLOG_CONTENTS = {
  'first-blog-post': {
    title: '我的第一篇博客',
    date: '2025-05-01',
    description: '这是一篇测试博客文章',
    content: `## 欢迎来到我的博客

这是我使用 Next.js 和 Cloudflare Pages 搭建的第一篇博客文章。`
  },
  'nextjs-getting-started': {
    title: 'Next.js 入门指南',
    date: '2025-04-15',
    description: '学习如何快速上手 Next.js 框架',
    content: `## 什么是 Next.js？

Next.js 是一个强大的 React 框架，提供服务端渲染、静态站点生成等特性。`
  },
  'ai-image-generation': {
    title: 'AI 图像生成技术',
    date: '2025-04-20',
    description: '深入探讨 AI 图像生成的最新技术发展',
    content: `## AI 图像生成技术

人工智能图像生成技术正在快速发展，从 GAN 到 Diffusion Models。`
  },
  'tech-and-life': {
    title: '技术改变生活',
    date: '2025-04-25',
    description: '关于技术、生活和个人成长的一些随想',
    content: `## 技术不仅仅是代码

技术是连接人与世界的桥梁，更是创新和成长的工具。`
  }
};

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
  const paths = Object.keys(BLOG_CONTENTS).map(slug => ({
    params: { slug }
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const post = BLOG_CONTENTS[params.slug];

  return {
    props: {
      post: {
        ...post,
        slug: params.slug
      }
    }
  };
}
