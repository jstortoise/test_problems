
class AccountController < ActionController::Base
  # TODO: Add Signup, Login, Logout Routes
  def signup
    if (!user_params[:email] || !user_params[:password] || !user_params[:name])
      render :json => nil, :status=>400
      return
    end
    user = User.where(:email=> user_params[:email], :password=> user_params[:password]).take
    user = User.new(user_params)
    if(user.save)
      render :json => {:name=>user.name, :email=>user.email}, :status=>200
        response.headers["authorization"] = user.auth_token
      return
    else
      render :json => nil, :status=>400
    end
  end
  
  def login
    user = User.where(:email=> user_params[:email], :password=> user_params[:password]).take
    if user
      user.regenerate_auth_token
      render :json => nil, :status=>204
      response.headers["authorization"] = user.auth_token
      return
    else
      render :json => nil, :status=>400
    end
  end
  
  def logout
    auth_token = request.headers["authorization"]
    user = User.where(:auth_token=> auth_token).take
    if user
      user.auth_token = nil
      if(user.save)
        render :json => nil, :status=>204
      else
        render :json => nil, :status=>400
      end
    else
      render :json => nil, :status=>400
    end
  end
    
  def user_params
    params.require(:data).permit(:name, :email, :password)
  end
  
end

class AlbumsController < ActionController::Base
  def create
    if authenticated
      render json: Album.create!(data_params)
    else
      render json: nil, status: 401
    end
  end
  
  def show
    render json: existing_album
  end

  def index 
    render json: Album.all
  end
  
  def update
    if authenticated
      existing_album.update!(data_params)
      render json: existing_album    
    else
      render json: nil, status: 401
    end
  end
  
  def destroy
    if authenticated
      existing_album.destroy!
      head :no_content
    else
      render json: nil, status: 401
    end
  end
  
  protected
  
  def existing_album
    Album.find(params['id'])
  end

  def data_params
    params.require(:data).permit(:title, :performer, :cost)
  end
  
  def authenticated
    auth_token = request.headers["authorization"]
    user = User.where(:auth_token=> auth_token).take
    if user
      return true
    else
      return false
    end
  end
end

class PurchasesController < ActionController::Base
  def create
    render json: Purchase.create!(data_params)
  end
  
  protected 
  
  def data_params
    params.require(:data).permit(:user_id, :album_id)
  end 
end

ActiveRecord::Schema.define do
    create_table :albums do |table|
      table.column :title, :string
      table.column :performer, :string
      table.column :cost, :integer
    end
  
    create_table :purchases do |table|
      table.column :user_id, :integer
      table.column :album_id, :integer
    end
  
    create_table :users do |table|
      table.column :name, :string
      table.column :email, :string
      table.column :password, :string
      table.column :auth_token, :string
    end
end

class Album < ActiveRecord::Base
  has_many :purchases
end

class Purchase < ActiveRecord::Base
  belongs_to :album
  belongs_to :user
end

class User < ActiveRecord::Base
  has_many :purchases
  has_secure_token :auth_token
end