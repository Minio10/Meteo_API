# frozen_string_literal: true

module Api
  class HistoricalWeather < ApplicationRecord
    validates :location, presence: true
    validates :date, presence: true
  end
end
