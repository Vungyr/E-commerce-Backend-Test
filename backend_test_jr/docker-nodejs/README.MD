# Server Base - E-commerce Proyect


## Envinroment setup

1) 
In docker-nodejs/ run
``` bash
docker compose build
```
2) 
``` bash
docker compose up -d.
```
3)
In docker-nodej/ecommerce-service, run
``` bash
npm install
```
4)
``` bash
npm run dev
```
5) Seeders:
``` bash
npx sequelize-cli db:seed:all
```

6) Credentials:

email: admin@gmail.com
password: "123"
