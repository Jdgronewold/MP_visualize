require 'faraday'
require 'json'

class Api::MpController < ApplicationController
  def ticks
    debugger
    if params[:input].present?
      key = "108453776-6b2fff6c580d3978b909f4ccaa856cb3"
      url = 'https://www.mountainproject.com/data?action=getTicks&' +
        params[:type] + '=' + params[:input] + '&key=' + key
      @body = JSON.parse(Faraday.get(url).body)
    end
    debugger
    render :ticks
  end

  def routes
    key = "108453776-6b2fff6c580d3978b909f4ccaa856cb3"
    url = 'https://www.mountainproject.com/data?action=getRoutes&routeIds=' +
      params[:routes].join(',') + '&key=' + key
    @routes = JSON.parse(Faraday.get(url).body)
    render :routes
  end
end
