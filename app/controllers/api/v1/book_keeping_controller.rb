class Api::V1::BookKeepingController < ApplicationController
  before_action      :find_book_keeping, except: %i[index create]
  skip_before_action :verify_authenticity_token

  def index
    render json: BookKeeping.all.order('updated_at DESC')
  end

  def create
    @book_keeping = BookKeeping.new(book_keeping_params)

    if @book_keeping.save
      render json: BookKeeping.all.order('updated_at DESC')
    else
      render json: { message: @book_keeping.errors.full_messages.join('\n') },
             status: :bad_request
    end
  end

  def update
    if @book_keeping.update(book_keeping_params)
      head :ok
    else
      render json: { message: @book_keeping.errors.full_messages.join('\n') },
             status: :bad_request
    end
  end

  def destroy
    if @book_keeping.destroy
      head :ok
    else
      render json: { message: 'Erred while deleting item' },
             status: :bad_request
    end
  end

  private

  def book_keeping_params
    params.require(:book_keeping).permit(
      %i[expense_type title amount description]
    )
  end

  # WIP
  def find_book_keeping
    @book_keeping = BookKeeping.find(params[:id])
  end
end
