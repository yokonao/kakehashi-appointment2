class RemoveNameFromAppointments < ActiveRecord::Migration[6.1]
  def change
    remove_column :appointments, :first_name
    remove_column :appointments, :first_kana_name
    remove_column :appointments, :last_name
    remove_column :appointments, :last_kana_name
  end
end
