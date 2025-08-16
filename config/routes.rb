Rails.application.routes.draw do
  devise_for :administrators, controllers: { sessions: "administrators/sessions" }, skip: [ :passwords ]

  resources :appointments, only: [ :new, :create ] do
    collection do
      get :complete, to: "appointments#complete", as: "complete"
    end
  end
  get "/appointment_complete", to: "appointments#complete"

  namespace :admin do
    namespace :v2 do
      resources :appointments, only: [ :index, :destroy ]
      resources :menus, only: [ :index, :create, :destroy ] do
        collection do
          delete :destroy_all
        end
      end
    end
  end

  # localhost で Chrome DevTools を使っているとここにリクエストが来ることがあるので 404 を返すように設定している
  # https://chromium.googlesource.com/devtools/devtools-frontend/+/main/docs/ecosystem/automatic_workspace_folders.md
  get "/.well-known/appspecific/com.chrome.devtools.json", to: proc { [ 404, {}, [ "" ] ] }

  root to: "root#show"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
