# hello-docker

this is a guide doc to help beginners start a tutorial for the following tech stack

- docker
- MongoDb
- NodeJS(nestjs)/Python(fastapi)

## pre-requirements

### install docker for mac

> https://docs.docker.com/desktop/install/mac-install/

### install MongoDb Compass

> https://www.mongodb.com/try/download/shell

### install VSCode

> https://code.visualstudio.com/

and install docker for VSCode extension -> https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker


## run a MongoDb in docker

step into docker folder

```shell
$ cd docker
$ docker compose up -d
```

congratulations, you already got a MongoDB on your Mac OS locally.

## For Node.js

please step into sub-folder `nodejs`

```shell
$ cd nodejs
$ yarn
$ yarn dev
```

### insert a new ProductReview

```shell
$ curl --location --request POST 'http://localhost:3000/review' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title": "test title",
    "content": "test content"
}'
```

### query ProductReview

```shell
$ curl --location --request GET 'http://localhost:3000/reviews?limit=2' \
--header 'Content-Type: application/json'
```

## For Python

