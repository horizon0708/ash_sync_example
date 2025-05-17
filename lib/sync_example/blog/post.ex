defmodule SyncExample.Blog.Post do
  use Ash.Resource,
    otp_app: :sync_example,
    domain: SyncExample.Blog,
    data_layer: AshPostgres.DataLayer

  postgres do
    table "posts"
    repo SyncExample.Repo
  end

  attributes do
    uuid_primary_key :id

    attribute :title, :string
    attribute :body, :string
  end
end
