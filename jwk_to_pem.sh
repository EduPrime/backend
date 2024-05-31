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
install_if_missing openssl 
install_if_missing curl 

# URL do Zitadel para obter JWK
JWK_URL="https://eduprime-1a2ikt.zitadel.cloud/oauth/v2/keys"

# Obter a chave JWK da URL
JWK=$(curl -s $JWK_URL | jq '.keys[0]')

# Extrair valores 'n' e 'e' do JWK e converter para formato hexadecimal
N_HEX=$(echo "$JWK" | jq -r '.n' | base64 -d | xxd -p -c 256)
E_HEX=$(echo "$JWK" | jq -r '.e' | base64 -d | xxd -p -c 256)

# Criar arquivo de configuração para OpenSSL
cat > pubkeyinfo.cnf <<EOL
asn1=SEQUENCE:pubkeyinfo

[pubkeyinfo]
algorithm=SEQUENCE:algorithm
publicKey=BITWRAP,SEQUENCE:publickey

[algorithm]
algorithm=OID:rsaEncryption
parameter=NULL

[publickey]
n=INTEGER:0x$N_HEX
e=INTEGER:0x$E_HEX
EOL

# Gerar a chave pública no formato DER e então convertê-la para PEM
openssl asn1parse -genconf pubkeyinfo.cnf -out pubkey.der
openssl rsa -in pubkey.der -inform DER -pubin -outform PEM -out public.pem

# Imprimir a chave pública no terminal
cat public.pem

echo "Chave pública salva em public.pem"