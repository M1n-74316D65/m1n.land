import Link from "next/link";
import { formatDate, getBlogPosts } from "app/blog/utils";
import { useMemo } from "react";

interface BlogPost {
  slug: string;
  metadata: {
    publishedAt: string;
    title: string;
  };
}

const sortBlogPosts = (posts: BlogPost[]): BlogPost[] => {
  return posts.sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime(),
  );
};

const BlogPosts: React.FC = () => {
  const allBlogs = useMemo(() => getBlogPosts(), []);

  const sortedBlogs = useMemo(() => sortBlogPosts(allBlogs), [allBlogs]);

  return (
    <div>
      {sortedBlogs.map(({ slug, metadata: { publishedAt, title } }) => (
        <Link
          key={slug}
          className="flex flex-col space-y-1 mb-4"
          href={`/blog/${slug}`}
        >
          <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
            <p className="text-neutral-600 dark:text-neutral-400 w-[100px] tabular-nums">
              {formatDate(publishedAt, false)}
            </p>
            <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
              {title}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default BlogPosts;
