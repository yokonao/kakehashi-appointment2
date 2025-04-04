Rails.application.routes.draw do
  devise_for :administrators, controllers: { sessions: 'administrators/sessions' }
  namespace :api do
    namespace :v1 do
      get 'menus/index'
      post 'appointments/create'
    end
    namespace :admin do
      get 'menus/index'
      post 'menus/create'
      delete 'menus/:id', to: 'menus#destroy', as: 'menu_destroy'
      delete 'menus', to: 'menus#destroy_all'
      get 'appointments/index'
      delete 'appointments/:id', to: 'appointments#destroy', as: 'appointment_destroy'
    end
  end
  get '/admin/*admin_path', to: 'admin#show'
  get '/*react_path', to: 'react#show'
 
  root to: 'react#show'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
