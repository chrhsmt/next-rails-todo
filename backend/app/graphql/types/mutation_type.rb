# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :submit_sign_up_form, mutation: Mutations::SubmitSignUpForm
    field :submit_log_in_form, mutation: Mutations::SubmitLogInForm
  end
end
