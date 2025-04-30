import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';

export default function BlogPost({ post }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>加载中...</div>;
  }

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
  // 在实际部署时，这里将替换为从 GitHub 仓库获取所有博客文章的 slug
  return {
    paths: [{ params: { slug: 'first-blog-post' } }],
    fallback: true
  };
}

export async function getStaticProps({ params }) {
  // 在实际部署时，这里将替换为从 GitHub 仓库获取具体博客内容的代码
  const post = {
    slug: 'first-blog-post',
    title: '我的第一篇博客',
    date: '2025-05-01',
    description: '这是一篇测试博客文章',
    content: '## 欢迎来到我的博客\n\n这是我使用 Next.js 和 Cloudflare Pages 搭建的第一篇博客文章。'
  };

  return {
    props: {
      post
    }
  };
}
