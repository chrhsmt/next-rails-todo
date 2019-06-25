# frozen_string_literal: true

module Types
  class ViewerType < Types::BaseObject
    field :user, Types::UserType, null: true
  end
end
