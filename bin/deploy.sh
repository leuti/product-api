#!/bin/bash

# Stoppe das Skript bei Fehlern
set -e

# Erstelle die nötigen Basiskomponenten --> nur beim ersten Mal notwendig
# -----------------------------------------------------------------------

# Initialisiere Elastic Beanstalk
# eb init -p node.js <my-app-name> --region eu-central-1 

# Erstelle eine neue Umgebung
# eb create product-api-1-env

# Umgebungsvariablen setzen
# eb setenv AWS_RDS_ENDPOINT=database-1.chhg8l37c6tv.eu-central-1.rds.amazonaws.com BCRYPT_PASSWORD='29(/%&\!Hkyiz1&' ENV=dev PORT=3000 POSTGRES_DB=postgres POSTGRES_DEV_DB=shopping_dev POSTGRES_PASSWORD=password123 POSTGRES_TEST_DB=shopping_test POSTGRES_USER=shopping_user SALT_ROUNDS=10 TOKEN_SECRET=KasparIstGross_test

# Regelmässiger Build und Deploy Prozess
# --------------------------------------

# Führe den Build-Prozess aus (dein Skript hier eintragen)
# npm run build

# echo "build completed now starting deployment..." 

# Erstelle ein ZIP-Archiv des dist-Verzeichnisses
# cd dist
# zip -r ../app.zip .
# cd ..

echo "Starting deployment..."

eb list
eb status

# Prüft den Inhalt der Variable ENV
if [ "$ENV" == "dev" ]; then
    # Führt aus, wenn ENV 'dev' ist
    db-migrate up --env dev # db-migrate always assumes as environment DEV
    eb deploy Shop1-env
    echo "deployment for $ENV completed"
elif [ "$ENV" == "prod" ]; then
    # Führt aus, wenn ENV 'prod' ist
    db-migrate up --env prod # db-migrate always assumes as environment DEV
    eb deploy Shop-prod-env
    echo "deployment for $ENV completed"
else
    echo "Ungültiger Wert für ENV. Bitte 'dev' oder 'prod' verwenden."
fi

# Öffne die Anwendung im Browser
# eb open

#echo "Deployment abgeschlossen!"
