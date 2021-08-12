class AddNameToAppointments < ActiveRecord::Migration[6.1]
  def change
    add_column :appointments, :full_name, :string
    add_column :appointments, :full_kana_name, :string
  end
end
