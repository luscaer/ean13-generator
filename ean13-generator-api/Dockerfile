# ==============================================================================
# STAGE 1: Build da aplicação
# ==============================================================================
FROM golang:1.27-alpine AS builder

WORKDIR /app

ENV CGO_ENABLED=0 GOOS=linux GOARCH=amd64

COPY go.mod go.sum* ./
RUN go mod download

COPY . .

RUN go build -trimpath -ldflags="-s -w" -o /app/api ./cmd/api

# ==============================================================================
# STAGE 2: Imagem final para execução
# ==============================================================================
FROM alpine:3.19 AS runner

# Instala certificados SSL/TLS para permitir requisições HTTPS externas seguras
RUN apk --no-cache add ca-certificates

RUN adduser -D -g '' appuser

WORKDIR /app

COPY --from=builder /app/api /app/api

USER appuser

EXPOSE 8080

ENTRYPOINT ["/app/api"]
