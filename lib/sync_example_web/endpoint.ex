defmodule SyncExampleWeb.Endpoint do
  use Phoenix.Endpoint, otp_app: :sync_example

  # The session will be stored in the cookie and signed,
  # this means its contents can be read but not tampered with.
  # Set :encryption_salt if you would also like to encrypt it.
  @session_options [
    store: :cookie,
    key: "_sync_example_key",
    signing_salt: "3NLqlNrk",
    same_site: "Lax"
  ]

  socket "/live", Phoenix.LiveView.Socket,
    websocket: [connect_info: [session: @session_options]],
    longpoll: [connect_info: [session: @session_options]]

  # Serve at "/" the static files from "priv/static" directory.
  #
  # You should set gzip to true if you are running phx.digest
  # when deploying your static files in production.
  plug Plug.Static,
    at: "/",
    from: :sync_example,
    gzip: false,
    only: SyncExampleWeb.static_paths()

  if Code.ensure_loaded?(Tidewave) do
    plug Tidewave
  end

  # Code reloading can be explicitly enabled under the
  # :code_reloader configuration of your endpoint.
  if code_reloading? do
    plug AshAi.Mcp.Dev,
      # If using mcp-remote, and this issue is not fixed yet: https://github.com/geelen/mcp-remote/issues/66
      # You will need to set the `protocol_version_statement` to the
      # older version.
      protocol_version_statement: "2024-11-05",
      otp_app: :sync_example

    socket "/phoenix/live_reload/socket", Phoenix.LiveReloader.Socket
    plug Phoenix.LiveReloader
    plug Phoenix.CodeReloader
    plug Phoenix.Ecto.CheckRepoStatus, otp_app: :sync_example
  end

  plug Phoenix.LiveDashboard.RequestLogger,
    param_key: "request_logger",
    cookie_key: "request_logger"

  plug Plug.RequestId
  plug Plug.Telemetry, event_prefix: [:phoenix, :endpoint]

  plug Plug.Parsers,
    parsers: [:urlencoded, :multipart, :json],
    pass: ["*/*"],
    json_decoder: Phoenix.json_library()

  plug Plug.MethodOverride
  plug Plug.Head
  plug Plug.Session, @session_options
  plug SyncExampleWeb.Router
end
