# frozen_string_literal: true

class TenantUsersController < TenantController
# class TenantUsersController < ApplicationController

  def index
    # tenant = Tenant.find(params[:current_tenant_id]) if params[:current_tenant_id].present?
    # MultiTenant.with(tenant) do
    #   render json: User.all
    # end if tenant.present?

    users = User.all
    User.create!(name: Time.zone.now.to_i, password: "asafdsfds")
    render json: users
  end

end