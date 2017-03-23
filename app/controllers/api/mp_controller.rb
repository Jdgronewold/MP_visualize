require 'faraday'
require 'json'

class Api::MpController < ApplicationController
  def ticks
    if params[:query].present?
      key = "108453776-6b2fff6c580d3978b909f4ccaa856cb3"
      url = 'https://www.mountainproject.com/data?action=getTicks&email=' +
      params[:query] + '&key=' + key
      @body = JSON.parse(Faraday.get(url).body)
    end
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
