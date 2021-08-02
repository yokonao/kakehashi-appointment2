class ChangeColumnTypeDepartmentOnMenus < ActiveRecord::Migration[6.1]
  def change
    change_column :menus, :department, :string
  end
end
