# frozen_string_literal: true

class User < ApplicationRecord
  has_secure_password

  multi_tenant :tenant
  validates :name, presence: true, uniqueness: true

  class << self
    PASS="b398d65a27d253074479659c6564c551d5de8fbcc1e2635683902a018f3f07bb4c2f11f26089725e887fc5241434616b942ea0a409cdc0f529e7e97f74ef77d3"
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
      @rsa_private ||= OpenSSL::PKey::RSA.new(ENV["JWT_PRIVATE_KEY"], PASS)
    end

    def rsa_public
      @rsa_public ||= OpenSSL::PKey::RSA.new(ENV["JWT_PUBLIC_KEY"], PASS)
    end
  end

  def generate_jwt
    payload = {
      sub: id,
      exp: 30.days.since.to_i,
      iat: Time.now.to_i,
      jti: SecureRandom.base58(16)
    }
    JWT.encode(payload, User.rsa_private, "RS256")
  end
end
