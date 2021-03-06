#FROM alpine:3.4
FROM golang:1.9.2-alpine3.7
MAINTAINER Ilya Stepanov <dev@ilyastepanov.com>

#ENV GOROOT=/usr/lib/go \
#    GOPATH=/go \
#    PATH=$PATH:$GOROOT/bin:$GOPATH/bin \
 ENV XMLSTARLET_VERSION=1.6.1-r1

ADD start.sh /start.sh

RUN chmod +x /start.sh && \
    apk add --no-cache libxml2 libxslt && \
    apk add --no-cache --virtual .build-dependencies curl jq git go ca-certificates && \
    adduser -D syncthing && \
    # compile syncthing
    mkdir -p /go/src/github.com/syncthing && \
    cd /go/src/github.com/syncthing && \
    git clone https://github.com/syncthing/syncthing.git && \
    cd syncthing && \
    git checkout v0.14.42 && \
    go run build.go && \
    mkdir -p /go/bin && \
    mv bin/syncthing /go/bin/syncthing && \
    chown syncthing:syncthing /go/bin/syncthing && \

    # install xmlstarlet (used by start.sh script)
    curl -sSL -o /tmp/xmlstarlet.apk https://github.com/menski/alpine-pkg-xmlstarlet/releases/download/${XMLSTARLET_VERSION}/xmlstarlet-${XMLSTARLET_VERSION}.apk && \
    apk add --allow-untrusted /tmp/xmlstarlet.apk && \
    rm /tmp/xmlstarlet.apk && \

    # cleanup
#    rm -rf /go/pkg && \
#    rm -rf /go/src && \
    apk del .build-dependencies

WORKDIR /home/syncthing

VOLUME ["/home/syncthing/.config/syncthing", "/home/syncthing/Sync"]

EXPOSE 8384 22000 21027/udp

CMD ["/start.sh"])
