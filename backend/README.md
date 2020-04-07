# BootCamp GoStack Desafio2: FastFeet
![logo](https://user-images.githubusercontent.com/51686847/74190194-b65e5c80-4c30-11ea-896d-ff0edbdb50a7.png)

First part of the final project to be delivered at the end of RocketSeat's BootStamp GoStack.

# Some dependencies used

| Dependencies | Resume |
|---------------|----|
|bcryptjs| To hash the password|
| express| |
| jsonwebtoken|Generate authentication token|
| nodemon||
| sequelize| To use database |
| yup| Validate data|

|DevDependencies|
|---------------|
|eslint         |
|eslint-config-airbnb-base|
|eslint-config-prettier|
|eslint-plugin-import|
|eslint-plugin-prettier|
|prettier       |
|sequelize-cli  |
|sucrase        |

# What it takes to run

To run this project, you'll need:

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://legacy.yarnpkg.com/en/) (Optional).


# Now in your terminal at the project folder, run:
```
yarn
yarn dev
```

# Runing Postgres using DOCKER:
I used port 5432 so if you don't want to reconfigure the **src/config/database.js** port you should run docker with the same port
```
docker run --name database -e POSTGRES_PASSWORD=docker -d postgres -p 5432:5432
```

# To run the project use:
```
localhost:3333
```
A managed user is required to register a recipient.

You can use: yarn sequelize db:seed:all to register
or
create a new user:
```
http://localhost:3333/Users (post)
```
{
  "name": "Distribuidora FastFeet",
  "email": "admin@fastfeet.com",
  "password": "123456",
  "type_acess": 1
}

To authenticate:
```
http://localhost:3333/sessions
```
and use this profile to generate your token:
```
{
	"email":"admin@fastfeet.com",
	"password": "123456"
}
```
During the tests I used **Insomnia** to make all requests. The generated **token** must be used in the **header** or in **authentication with the bearer token**


