docker build -t ugo_pinger .
docker run -d -p 80:80 ugo_pinger
docker run -d -p 4000:80 ugo_pinger


docker compose -f pocketbase-docker-compose.yml up -d --build


