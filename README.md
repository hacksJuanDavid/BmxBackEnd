## Autor

[Juan David Jimenez]

## This project BmxApp applicate the concepts of the course of WebDevelopment

I applied the concepts seen in the WebDev repository workshop, which consisted of the fundamentals for the development of web pages, client and server, such as the use of relational databases. Integration of technologies such as authentication and authorization thanks to the JWT and security for the projects. In other parts we use the data contexts in the frontend applications as in the backend API, which is how the data of our applications is managed. Something curious is that redux was used in the frontend with next and react, which is somewhat different from How can you maintain the data of an application. And finally the way to expose and consume services.

This project contains the following parts:

### Backend

- [x] [BmxApi]

### Frontend

- [x] [FrontendBmxAspMVC]
- [x] [frontendbmxnext]

## License

[MIT](https://choosealicense.com/licenses/mit/)

## BmxApi Connection string for the database located in the appsettings.json file 

```
  "ConnectionStrings": {
    "CnnStr": "server=localhost;port=3306;database=bmxdb;user=bmxuser;password=BM3X34s4MsUs81*01"
  },
```

## BmxApi Connection string fort the database container in the appsettings.json file

```
  "ConnectionStrings": {
    "CnnStr": "server=db;port=3306;database=bmxdb;user=bmxuser;password=BM3X34s4MsUs81*01"
  },
```

## Building create images with using docker-compose for the project BmxApi and db, using Dockerfile create the image of BmxApi

```
version: "3.8"

services:
  bmxapi:
    image: bmxapi
    container_name: bmxapi_container
    build:
      context: .
      dockerfile: BmxApi/Dockerfile
    ports:
      - "5090:80"
    depends_on:
      - db
    environment:
      - ASPNETCORE_ENVIRONMENT=Development
      - ASPNETCORE_URLS=http://+:80
  # Db MySql
  db:
    image: mysql:8.0
    container_name: mysql_container_bmxdb
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: bmxdb
      MYSQL_USER: bmxuser
      MYSQL_PASSWORD: BM3X34s4MsUs81*01
    ports:
      - "3309:3306"
    volumes:
      - dbdata:/var/lib/mysql

volumes:
  dbdata:
```

## Building images with using docker compose for the bmxapi with database

```
version: "3.8"

services:
  bmxapi:
    image: bmxapi:latest
    container_name: bmxapi_container
    ports:
      - "5090:80"
    depends_on:
      - db
    environment:
      - ASPNETCORE_ENVIRONMENT=Development
      - ASPNETCORE_URLS=http://+:80
  # Db MySql
  db:
    image: mysql:8.0
    container_name: mysql_container_bmxdb
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: bmxdb
      MYSQL_USER: bmxuser
      MYSQL_PASSWORD: BM3X34s4MsUs81*01
    ports:
      - "3309:3306"
    volumes:
      - dbdata:/var/lib/mysql

volumes:
  dbdata:
```

### Building images with using docker compose and using repository of docker hub for the bmxapi with database

```
version: "3.8"

services:
  bmxapi:
    image: thenowrock/testbmxapi:latestbmxapi
    container_name: bmxapi_container
    ports:
      - "5090:80"
    depends_on:
      - db
    environment:
      - ASPNETCORE_ENVIRONMENT=Development
      - ASPNETCORE_URLS=http://+:80
  # Db MySql
  db:
    image: thenowrock/testbmxapi:mysqlbmxdb
    container_name: mysql_container_bmxdb
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: bmxdb
      MYSQL_USER: bmxuser
      MYSQL_PASSWORD: BM3X34s4MsUs81*01
    ports:
      - "3309:3306"
    volumes:
      - dbdata:/var/lib/mysql

volumes:
  dbdata:

```
