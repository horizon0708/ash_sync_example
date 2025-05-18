import { Collection } from "@tanstack/db";
import { createElectricCollection } from "@tanstack/db-collections";
import { ShapeStreamOptions } from "@electric-sql/client";
import type { BlogPost } from "./schema";
import { blogPostSchema } from "./schema";
const relativeUrl = (path) => `${window.location.origin}${path}`;
type ListBlogPostsParams = {
  options?: Omit<ShapeStreamOptions<BlogPost>, "url" | "params" | "parser">;
};

export function listBlogPosts({
  options,
}: ListBlogPostsParams = {}): Collection<BlogPost> {
  return createElectricCollection<BlogPost>({
    id: "list_blog_posts",
    streamOptions: {
      ...options,
      params: { query: "list_blog_posts" },
      url: relativeUrl("/sync/"),
    },
    primaryKey: ["id"],
    schema: blogPostSchema,
  });
}
