#!/bin/bash

# Função para instalar pacotes se não estiverem instalados
install_if_missing() {
    if ! command -v $1 &> /dev/null; then
        echo "Instalando $1..."
        sudo apt-get update
        sudo apt-get install -y $1
    else
        echo "$1 já está instalado."
    fi
}

# Instalar dependências
install_if_missing psql
install_if_missing jq

# Carregar variáveis do arquivo .env
if [ ! -f .env ]; then
    echo "Arquivo .env não encontrado!"
    exit 1
fi

export $(grep -v '^#' .env | xargs)

# Configurar PostgreSQL
echo "Configurando PostgreSQL..."

PGPASSWORD=$POSTGRES_PASSWORD psql -h $POSTGRES_HOST -U $POSTGRES_USER -d $POSTGRES_DB <<EOF
CREATE ROLE jwt_user NOLOGIN;
GRANT USAGE ON SCHEMA public TO jwt_user;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO jwt_user;
EOF

echo "Configuração do PostgreSQL concluída."

# Obter a chave pública do Authentik
echo "Obtendo a chave pública do Authentik..."

AUTHENTIK_JWKS_URL="http://localhost:9000/application/o/eduprime/jwks/"
curl -s $AUTHENTIK_JWKS_URL | jq -r '.keys[0].x5c[0]' | fold -w 64 | sed '1s/^/-----BEGIN CERTIFICATE-----\n/; $s/$/\n-----END CERTIFICATE-----/' > public.pem

echo "Chave pública salva em public.pem."

# Verificar se o arquivo public.pem foi criado
if [ -f "public.pem" ]; then
    echo "Chave pública obtida com sucesso."
else
    echo "Falha ao obter a chave pública."
    exit 1
fi

echo "Configuração concluída."
