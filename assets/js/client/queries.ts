import { Shape, ShapeStream, ShapeStreamOptions } from "@electric-sql/client";
import type { BlogPost } from './schema';
const relativeUrl = (path) => (
  `${window.location.origin}${path}`
)
type ListBlogPostsParams = {
  options?: Omit<ShapeStreamOptions<BlogPost>, 'url' | 'params' | 'parser'>
};

export function listBlogPosts({ options }: ListBlogPostsParams = {}): Shape<BlogPost> {
  const stream = new ShapeStream<BlogPost>({
    ...options,
    params: {query: 'list_blog_posts'},
    url: relativeUrl(`/sync/`),
  });

  return new Shape(stream);
}

