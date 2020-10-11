# aa-term-project

# Basics info for collaborators


## Endpoints
All of these use `application/json` as content-type along with `x-token` header containing the jwt

| Method      | Url         | body params      | Description |
| ----------- | ----------- | ----------- | ----------- |
| POST      | api/public/register       |email, password| create new user, return the token to be included in auth required requests | 
| POST   | api/public/entrance/login        | email, password| login, return the token to be included in auth required requests
| GET | api/user/home | - | Return email address of the token, use to test the login procedure

## Backend
- Set the `.env` according to .env.example and the `example.env`

### Configuring new route
- Add action via `logics` then use them at `routes`
- Add models via `models`

## Frontend

### Structure

The frontend app root is located at `assets/react-frontend` with the following structure

```
assets/react-frontend
|
|- config.js     # Convert environmental variables to javascript object attributes
|- public        # Contains the root html
|- assets        # Contains images and importable stuff
|- src           # The main source files location
   |
   |- components # Reusable components(like Navbar)
   |- pages      # One page
   |- styles     # css or less or other styling files
   |- index.js   # main entrance 


```

### Installed plugins(if that's what it's called)
- `react-router` is inside `index.js`, feel free to refactor it

### Settings that should be hard-coded vs used as environmental variables

- Hard coded
    - Things that wouldn't change if we gonna deploy it on a different server

- Environmental variables
    - Things that cound change of we gonna deploy it on another server

To add more environmental variables settings to the app please do as following
1. Add the variable to your current `.env` at the project root (of course it will not be pushed to git)
2. Add the setting to `assets/react-frontend/config.js`
3. Verify that it's working (you need to reload the command)
4. Add it to `.env.example` so other people can understand

## Commands
Assuming everyone has `node` and `npm` installed

1. Installing dependencies
```
npm install
```

2. Setting environment variables
    - Copy `.env.example` to `.env`
    - Modify any settings that need to be changed to suit your local environment

3. Run locally

    - 3.1. Frontend only 
        ```
        npm run frontend-dev
        ```
    - 3.2. Backend only 
        ```
        npm run backend-dev
        ```
    - 3.3. Both 
        ```
        npm start
        ```
Frontend app should be available at `localhost:8080` while backend app should be available at `localhost:5000` at the moment if not set in `.env`

## Deployment

Will be added later