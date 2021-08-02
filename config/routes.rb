Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'menus/index'
    end
  end
  get '/*react_path', to: 'react#show'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
