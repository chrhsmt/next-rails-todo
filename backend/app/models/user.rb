# frozen_string_literal: true

class User < ApplicationRecord
  has_secure_password

  validates :name, presence: true, uniqueness: true

  class << self
    def authenticate_with_jwt(token)
      decoded_token = JWT.decode(token, rsa_public, true, algorithm: "RS256")
      payload, _header = decoded_token
      User.find_by(id: payload["sub"])

    rescue JWT::ExpiredSignature => e
      logger.info("JWT Token expired : #{token}")
      nil

    rescue JWT::DecodeError => e
      logger.info("JWT Invalid Token : #{token}")
      nil
    end

    def rsa_private
      @rsa_private ||= OpenSSL::PKey::RSA.new(ENV["JWT_PRIVATE_KEY"])
    end

    def rsa_public
      @rsa_public ||= OpenSSL::PKey::RSA.new(ENV["JWT_PUBLIC_KEY"])
    end
  end

  def generate_jwt
    payload = {
      sub: id,
      exp: 30.days.since.to_i,
      iat: Time.now,
      jti: SecureRandom.base58(16)
    }
    JWT.encode(payload, User.rsa_private, "RS256")
  end
end
