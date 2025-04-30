import Link from 'next/link';
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
  // 在实际部署时，这里将替换为从 GitHub 仓库获取文件列表的代码
  const posts = [
    {
      slug: 'first-blog-post',
      title: '我的第一篇博客',
      date: '2025-05-01',
      description: '这是一篇测试博客文章'
    }
  ];

  return {
    props: {
      posts
    }
  };
}
