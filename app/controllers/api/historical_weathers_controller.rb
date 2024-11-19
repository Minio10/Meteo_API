# frozen_string_literal: true

module Api
  class HistoricalWeathersController < ApplicationController
    def index
      weather_data = HistoricalWeatherService.new(
        weather_params[:location],
        weather_params[:start_date],
        weather_params[:end_date]
      ).call

      # Return the weather data if it exists, or an error message if not
      if weather_data.present?
        render json: weather_data, status: :ok
      else
        render json: { error: 'Weather data could not be retrieved' }, status: :not_found
      end
    end

    private

    # Strong parameters for weather requests
    def weather_params
      params.permit(:location, :start_date, :end_date)
    end
  end
end
