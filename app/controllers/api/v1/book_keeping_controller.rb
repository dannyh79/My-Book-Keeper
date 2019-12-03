class Api::V1::BookKeepingController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    render json: BookKeeping.all
  end
end
