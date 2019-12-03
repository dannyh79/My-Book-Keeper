Rails.application.routes.draw do
  root 'pages#home'

  namespace :api do
    namespace :v1 do
      resources :book_keeping, except: %i[show new edit]
    end
  end
end
