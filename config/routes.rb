Rails.application.routes.draw do
  root to: "static_pages#root"

  namespace :api, defaults: { format: :json} do

    resources :mp, only: [:index] do
      get "ticks", on: :collection
      get "routes", on: :collection
    end
    
  end
end
