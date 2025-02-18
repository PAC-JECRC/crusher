FROM gitpod/workspace-full-vnc:latest

ENV TRIGGER_REBUILD=5

# Install custom tools, redis, runtime, etc.
RUN sudo apt-get update \
    # window manager
    && sudo apt-get install -y jwm \
    # electron
    && sudo apt-get install -y libgtk-3-0 libnss3 libasound2 libgbm1 \
    # native-keymap
    && sudo apt-get install -y libx11-dev libxkbfile-dev \
    # keytar
    && sudo apt-get install -y libsecret-1-dev

USER root
# Install MySQL
RUN install-packages mysql-server \
 && mkdir -p /var/run/mysqld /var/log/mysql \
 && chown -R gitpod:gitpod /etc/mysql /var/run/mysqld /var/log/mysql /var/lib/mysql /var/lib/mysql-files /var/lib/mysql-keyring /var/lib/mysql-upgrade

# Install MongoDB
# Source: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu-tarball/#install-mongodb-community-edition
RUN mkdir -p /tmp/mongodb && \
    cd /tmp/mongodb && \
    wget -qOmongodb.tgz https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-ubuntu2004-4.4.2.tgz && \
    tar xf mongodb.tgz && \
    cd mongodb-* && \
    sudo cp bin/* /usr/local/bin/ && \
    rm -rf /tmp/mongodb && \
    sudo mkdir -p /data/db && \
    sudo chown gitpod:gitpod -R /data/db

USER gitpod

# Install Redis.
RUN sudo apt-get update  && sudo apt-get install -y  redis-server redis-tools  && sudo rm -rf /var/lib/apt/lists/*

# Install our own MySQL config
COPY docker/gitpod/mysql/mysql.cnf /etc/mysql/mysql.conf.d/mysqld.cnf

# Install default-login for MySQL clients
COPY docker/gitpod/mysql/client.cnf /etc/mysql/mysql.conf.d/client.cnf

COPY docker/gitpod/mysql/mysql-bashrc-launch.sh /etc/mysql/mysql-bashrc-launch.sh

RUN npm install -g pm2

RUN echo "bash /etc/mysql/mysql-bashrc-launch.sh" >> ~/.bashrc