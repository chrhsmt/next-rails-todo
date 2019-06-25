# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    field :viewer, Types::ViewerType, null: true

    def viewer
      {
        user: current_user
      }
    end
  end
end
