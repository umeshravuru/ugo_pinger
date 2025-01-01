docker build -t ugo_pinger .
docker run -d -p 3000:80 ugo_pinger