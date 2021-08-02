class CreateAppointments < ActiveRecord::Migration[6.1]
  def change
    create_table :appointments do |t|
      t.string :first_name
      t.string :last_name
      t.string :first_kana_name
      t.string :last_kana_name
      t.date :birthday
      t.boolean :is_first_visit
      t.string :clinical_number
      t.string :email
      t.string :phone_number
      t.string :reason
      t.text :free_comment

      t.timestamps
    end
  end
end
