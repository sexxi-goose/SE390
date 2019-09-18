class GameController < ApplicationController
  protect_from_forgery with: :exception

  def index
    render html: '<div>Hello World</div>'.html_safe

  end
end
