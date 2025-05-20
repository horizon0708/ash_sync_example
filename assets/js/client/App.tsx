import React from "react";
import type { FormEvent } from "react";

import { createTransaction } from "@tanstack/db";
import { useLiveQuery } from "@tanstack/react-db";

// import { useLiveQuery } from "@tanstack/react-optimistic";
import { listBlogPosts } from "./collections";
import { ingestMutations } from "./mutations";
import { v4 } from "uuid";

const collection = listBlogPosts();

export default function App() {
  const { data: posts, state: state } = useLiveQuery((query) =>
    query
      .from({ collection })
      .keyBy(`@id`)
      .select(`@id`, `@title`, `@body`, `@inserted_at`),
  );
  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-900 via-indigo-900 to-black px-4 py-12">
      <div className="max-w-2xl mx-auto backdrop-blur-sm bg-black/30 rounded-lg border border-pink-500/20 shadow-lg shadow-pink-500/20 p-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400 pb-4 border-b border-cyan-500/30">
          NEON BLOGS
        </h1>
        <button
          onClick={() =>
            createTransaction({ mutationFn: ingestMutations }).mutate(() => {
              const res = collection.insert({
                id: v4(),
                inserted_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                title: "New Post",
                body: "New Post Body",
              });

              console.log(res);
              return res;
            })
          }
          className="px-4 py-1 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded hover:from-cyan-500 hover:to-blue-500 transition-all duration-300 text-sm mb-6"
        >
          Make
        </button>
        <div className="space-y-6">
          {posts
            .sort((a, b) => b.inserted_at.localeCompare(a.inserted_at))
            .map((post) => (
              <article
                key={`post-${post.id}`}
                className="bg-black/40 rounded-lg p-6 border-l-4 border-cyan-400 hover:border-pink-500 transition-all duration-300 shadow-md hover:shadow-pink-500/30"
              >
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-xl font-bold text-cyan-300">
                    {post.title}
                  </h2>
                  <button
                    onClick={() =>
                      createTransaction({ mutationFn: ingestMutations }).mutate(
                        () => {
                          const res = collection.update(post, (post) => {
                            post.title = post.title + "a";
                          });
                          return res;
                        },
                      )
                    }
                    className="px-2 py-1 text-xs bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded hover:from-pink-600 hover:to-purple-600 transition-all duration-300"
                  >
                    Append 'a'
                  </button>
                </div>
                <p className="text-pink-100 mb-4 line-clamp-3 opacity-80">
                  {post.body}
                </p>
                <a
                  href="#"
                  className="inline-block px-4 py-1 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded hover:from-cyan-500 hover:to-blue-500 transition-all duration-300 text-sm"
                >
                  READ MORE
                </a>
              </article>
            ))}
        </div>
      </div>
    </main>
  );
}
