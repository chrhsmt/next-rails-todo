# frozen_string_literal: true

Rails.application.routes.draw do
  post "/graphql", to: "graphql#execute"

  resources :tenant_users, only: [:index]
  # get "/tenant_users", to: "tenant_users#index"
end
