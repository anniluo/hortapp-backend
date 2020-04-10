# hortapp-backend

Backend and API for [Hortapp](https://hortapp.herokuapp.com/)

## API

The current version of the API lives at https://hortapp.herokuapp.com/api/{endpoint}

- Authentication

| Endoint      |                 |
| ------------ | :-------------: |
| POST /login  |   Log in user   |
| POST /signup | Create new user |

- Users

| Endoint            |                             |
| ------------------ | :-------------------------: |
| GET /users         |          Get users          |
| GET /users/{id}    |  Get one user based on id   |
| PUT /users/{id}    | Update one user based on id |
| DELETE /users/{id} | Delete one user based on id |

- natureResources

| Endoint                      |                                       |
| ---------------------------- | :-----------------------------------: |
| GET /natureResources         |          Get natureResources          |
| GET /natureResources/{id}    |  Get one natureResource based on id   |
| POST /natureResources        |       Create new natureResource       |
| PUT /natureResources/{id}    | Update one natureResource based on id |
| DELETE /natureResources/{id} | Delete on natureResource based on id  |

- resourceMarkers

| Endoint                      |                                       |
| ---------------------------- | :-----------------------------------: |
| GET /resourceMarkers         |          Get resourceMarkers          |
| GET /resourceMarkers/{id}    |  Get one resourceMarker based on id   |
| POST /resourceMarkers        |       Create new resourceMarker       |
| PUT /resourceMarkers/{id}    | Update one resourceMarker based on id |
| DELETE /resourceMarkers/{id} | Delete one resourceMarker based on id |

## Getting Started

- Install dependencies

```bash
 npm install
```

- Run MongoDB locally

```bash
  sudo mongod
```

- Run development server

```bash
 npm run dev
```

## Deployment with Heroku

- Install Heroku CLI
- Create new app on Heroku Dashboard
- Login to you Heroku account in command line:

```bash
  heroku login
```

- Create a Heroku remote with your app's name:

```bash
   heroku git:remote -a your-app-name
```

- Deploy:

```bash
     git push heroku master
```

## Built With

- [Express.js](https://expressjs.com/) - Web framework for Node.js.
- [mongoose](https://mongoosejs.com/) - Object modeling for Node.js.
- [cross-env](https://www.npmjs.com/package/cross-env) - Script running that set and use environment variables across platforms.
- [dotenv](https://www.npmjs.com/package/dotenv) - Loads environment variables from a .env file into process.env.
- [cors](https://www.npmjs.com/package/cors) - Provides a Connect/Express middleware that can be used to enable CORS with various options.
- [helmet](https://www.npmjs.com/package/helmet) - Helps secure Express apps by setting various HTTP headers.
- [bcrypt](https://www.npmjs.com/package/bcrypt) - Helps hash passwords.
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - An implementation of JSON Web Tokens.
- [mongoose-unique-validator](https://www.npmjs.com/package/mongoose-unique-validator) - Plugin which adds pre-save validation for unique fields within a Mongoose schema.

- [nodemon](https://www.npmjs.com/package/nodemon) - Helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.
- [json-server](https://www.npmjs.com/package/json-server) - A quick back-end for prototyping and mocking.

## Acknowledgments

- [Full Stack open 2019](https://fullstackopen-2019.github.io/)
