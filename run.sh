docker build -t ugo_pinger .
docker run -d -p 4000:80 ugo_pinger
