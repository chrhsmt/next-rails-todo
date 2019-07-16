# frozen_string_literal: true

class TenantController < ApplicationController
  set_current_tenant_through_filter
  before_action :set_customer_as_tenant

  def set_customer_as_tenant
    # tenant = Tenant.find(session[:current_tenant_id])
    tenant = Tenant.find(params[:current_tenant_id]) if params[:current_tenant_id].present?
    set_current_tenant(tenant) if tenant.present? # Set the tenant
  end

end