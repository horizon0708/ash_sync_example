defmodule SyncExample.Blog do
  use Ash.Domain,
    extensions: [AshSync],
    otp_app: :sync_example

  sync do
    resource SyncExample.Blog.Post do
      query :list_blog_posts, :read do
        on_insert(:create)
        on_update :update
        on_delete :destroy
      end

      mutation(:create_post, :create)
    end
  end

  resources do
    resource SyncExample.Blog.Post
  end
end
