defmodule SyncExampleWeb.TodoController do
  use Phoenix.Controller, formats: [:html, :json]

  import Phoenix.Sync.Controller

  def all(conn, %{"query" => query} = params) do
    # sync_render(

    # )
    # sync_render(
    #   conn,
    #   params,
    #   from(t in Todos.Todo, where: t.owner_id == ^user_id)
    # )
  end
end
