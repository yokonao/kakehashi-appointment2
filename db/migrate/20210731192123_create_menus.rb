class CreateMenus < ActiveRecord::Migration[6.1]
  def change
    create_table :menus do |t|
      t.integer :department
      t.datetime :start_at
      t.datetime :end_at

      t.timestamps
    end
  end
end
