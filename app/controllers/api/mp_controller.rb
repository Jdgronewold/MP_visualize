require 'faraday'
require 'json'

class Api::MpController < ApplicationController
  def ticks
    key = "108453776-6b2fff6c580d3978b909f4ccaa856cb3"
    url_ticks = 'https://www.mountainproject.com/data?action=getTicks&' +
      params[:type] + '=' + params[:input] + '&key=' + key
    @ticks = JSON.parse(Faraday.get(url_ticks).body)
    routeIds = @ticks["ticks"].map { |tick| tick['routeId'] }
    url_routes = 'https://www.mountainproject.com/data?action=getRoutes&routeIds=' +
      routeIds.join(',') + '&key=' + key
    @routes = JSON.parse(Faraday.get(url_routes).body)
    render :ticks
  end

  def routes
    key = "108453776-6b2fff6c580d3978b909f4ccaa856cb3"
    url = 'https://www.mountainproject.com/data?action=getRoutes&routeIds=' +
      params[:routes].join(',') + '&key=' + key
    render :routes
  end
end
