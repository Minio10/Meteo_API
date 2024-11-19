# frozen_string_literal: true

class CreateHistoricalWeathers < ActiveRecord::Migration[7.0]
  def change
    create_table :historical_weathers do |t|
      t.string :location, null: false
      t.date :date, null: false
      t.float :temperature_high
      t.float :temperature_low
      t.float :precipitation
      t.float :latitude
      t.float :longitude
      t.timestamps
    end

    add_index :historical_weathers, %i[location date], unique: true
  end
end
