class AddTenantIdToUser < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :tenant_id, :integer, null: false
  end
end
