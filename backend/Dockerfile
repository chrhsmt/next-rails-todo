FROM buildpack-deps:stretch

ENV RUBY_VERSION 2.6.3
ENV BUNDLER_VERSION 2.0.1
ENV DOCKERIZE_VERSION 0.6.1

ENV HOME /root
ENV APP_HOME /app

ENV LANG C.UTF-8

RUN apt-get update && \
    apt-get install -y --allow-downgrades --allow-remove-essential --allow-change-held-packages \
    build-essential \
    curl \
    git \
    zlib1g-dev \
    libssl-dev \
    libreadline-dev \
    libyaml-dev \
    libxml2-dev \
    libxslt-dev \
    fonts-liberation \
    fonts-ipafont \
    lsb-release \
    libappindicator3-1 \
    libasound2 \
    libnspr4 \
    libnss3 \
    libxss1 \
    xdg-utils

# Timezone
ENV TZ Asia/Tokyo
RUN echo "${TZ}" > /etc/timezone && \
    dpkg-reconfigure -f noninteractive tzdata

# dockerize
RUN wget https://github.com/jwilder/dockerize/releases/download/v${DOCKERIZE_VERSION}/dockerize-linux-amd64-v${DOCKERIZE_VERSION}.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-v${DOCKERIZE_VERSION}.tar.gz \
    && rm dockerize-linux-amd64-v${DOCKERIZE_VERSION}.tar.gz

RUN mkdir $APP_HOME
WORKDIR $APP_HOME

# rbenv
ENV PATH /usr/local/rbenv/shims:/usr/local/rbenv/bin:${PATH}
ENV RBENV_ROOT /usr/local/rbenv
ENV RUBY_CONFIGURE_OPTS --disable-install-doc
RUN git clone --depth 1 https://github.com/rbenv/rbenv.git ${RBENV_ROOT} && \
    git clone --depth 1 https://github.com/rbenv/ruby-build.git ${RBENV_ROOT}/plugins/ruby-build && \
    ${RBENV_ROOT}/plugins/ruby-build/install.sh
RUN echo 'eval "$(rbenv init -)"' > /etc/profile.d/rbenv.sh
RUN rbenv install ${RUBY_VERSION} && \
    rbenv global ${RUBY_VERSION}

# rubygems
ENV GEM_HOME /usr/local/bundle
ENV BUNDLE_PATH "${GEM_HOME}"
ENV BUNDLE_SILENCE_ROOT_WARNING 1
ENV BUNDLE_APP_CONFIG "${GEM_HOME}"
ENV PATH ${GEM_HOME}/bin:${BUNDLE_PATH}/gems/bin:${PATH}
RUN mkdir -p "${GEM_HOME}" && chmod 777 "${GEM_HOME}"
RUN gem install bundler:${BUNDLER_VERSION}

ENTRYPOINT ["./docker-entrypoint.sh"]
