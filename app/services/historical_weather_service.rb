# frozen_string_literal: true

class HistoricalWeatherService
  BASE_API_URL = 'https://api.open-meteo.com/v1/forecast'

  def initialize(location, start_date, end_date)
    @location = location
    @start_date = start_date
    @end_date = end_date
    @latitude = nil
    @longitude = nil
    @missing_dates = nil
  end

  def call
    return fetch_existing_weather_data if fetch_existing_weather_data.size == (@start_date..@end_date).to_a.length

    find_missing_dates

    create_missing_weather_dates

    fetch_existing_weather_data
  end

  private

  def fetch_existing_weather_data
    Api::HistoricalWeather.where(location: @location, date: @start_date..@end_date)
  end

  def find_missing_dates
    @missing_dates = (@start_date..@end_date).to_a.reject { |date| weather_data_exists?(date) }
  end

  def weather_data_exists?(date)
    Api::HistoricalWeather.exists?(location: @location, date: date)
  end

  def fetch_weather_data_from_api(date)
    # Geocode the location to get latitude and longitude
    geocode_result = Geocoder.search(@location).first

    return nil unless geocode_result

    @latitude ||= geocode_result.latitude
    @longitude ||= geocode_result.longitude

    # Fetch data from Open-Meteo API
    uri = URI(BASE_API_URL)
    uri.query = URI.encode_www_form(
      latitude: @latitude,
      longitude: @longitude,
      start_date: date,
      end_date: date,
      daily: 'temperature_2m_max,temperature_2m_min,precipitation_sum',
      timezone: 'auto'
    )

    response = Net::HTTP.get_response(uri)
    return nil unless response.is_a?(Net::HTTPSuccess)

    JSON.parse(response.body)['daily']    
  end

  def create_missing_weather_dates
    @missing_dates.each do |date|
      weather_data = fetch_weather_data_from_api(date)
      create_weather_data(weather_data) if weather_data
    end    
  end

  def create_weather_data(weather_data)
    weather_data['time'].each_with_index do |date, index|
      Api::HistoricalWeather.find_or_create_by(
        location: @location,
        date: date,
        temperature_high: weather_data['temperature_2m_max'][index],
        temperature_low: weather_data['temperature_2m_min'][index],
        precipitation: weather_data['precipitation_sum'][index],
        latitude: @latitude,
        longitude: @longitude
      )
    end
  end
end
