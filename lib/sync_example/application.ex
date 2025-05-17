defmodule SyncExample.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      SyncExampleWeb.Telemetry,
      SyncExample.Repo,
      {DNSCluster, query: Application.get_env(:sync_example, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: SyncExample.PubSub},
      {Finch, name: SyncExample.Finch},
      {SyncExampleWeb.Endpoint, phoenix_sync: Phoenix.Sync.plug_opts()}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: SyncExample.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    SyncExampleWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
