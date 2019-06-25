# frozen_string_literal: true

module Mutations
  class SubmitLogInForm < Mutations::BaseMutation
    field :token, String, null: true
    field :errors, [String], null: false

    argument :name, String, required: true
    argument :password, String, required: true

    def resolve(name:, password:)
      user = User.find_by(name: name)

      if user.blank?
        return { errors: ["ユーザーが登録されていません"] }
      end

      unless user.authenticate(password)
        return { errors: ["パスワードが違います"] }
      end

      {
        token: user.generate_jwt,
        errors: []
      }
    end
  end
end
