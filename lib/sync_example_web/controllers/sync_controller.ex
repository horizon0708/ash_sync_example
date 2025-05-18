defmodule SyncExampleWeb.SyncController do
  use Phoenix.Controller, formats: [:html, :json]

  def sync(conn, params) do
    AshSync.sync_render(:sync_example, conn, params)
  end

  def mutate(conn, params) do
    AshSync.mutate(:sync_example, conn, params)
  end
end
