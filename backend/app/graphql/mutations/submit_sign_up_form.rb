# frozen_string_literal: true

module Mutations
  class SubmitSignUpForm < Mutations::BaseMutation
    field :token, String, null: true
    field :errors, [String], null: false

    argument :name, String, required: true
    argument :password, String, required: true

    def resolve(name:, password:)
      user = User.new(
        name: name,
        password: password,
        password_confirmation: password
      )

      if user.invalid?
        return { errors: user.errors.full_messages }
      end

      user.save!

      {
        token: user.generate_jwt,
        errors: []
      }
    end
  end
end
