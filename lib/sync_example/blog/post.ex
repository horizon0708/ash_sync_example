defmodule SyncExample.Blog.Post do
  use Ash.Resource,
    otp_app: :sync_example,
    domain: SyncExample.Blog,
    data_layer: AshPostgres.DataLayer

  postgres do
    table "posts"
    repo SyncExample.Repo
  end

  actions do
    defaults [:destroy, create: :*, update: :*]

    read :read do
      primary? true
    end
  end

  attributes do
    uuid_primary_key :id

    attribute :title, :string do
      public? true
    end

    attribute :body, :string do
      public? true
    end

    timestamps do
      public? true
    end
  end
end
