defmodule SyncExample.Blog do
  use Ash.Domain,
    otp_app: :sync_example

  resources do
    resource SyncExample.Blog.Post
  end
end
