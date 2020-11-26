# Endpoints documentation

Check the base deployment url at the main README.md

All of these use `application/json` as content-type

For authentication, insert http header
`Authorization: JWT <your-token-here>`

## Public endpoints
These endpoints do not need `Authorization` header

### 1. Register `/api/public/register`
- method: `POST`
- body:
```
{
    "email": "EMAIL-USERNAME",
    "password": "PASSWORD"
}
```
- Response code 
  - 201 - Success: you will have token returned, saved it in `localstorage` for further use
  - 400 - Some fields are missing, bad format
  - 500 - Server error

### 2. Login `/api/public/login`
- method: `POST`
- body:
```
{
    "email": "EMAIL-USERNAME",
    "password": "PASSWORD"
}
```
- Response code 
  - 200 - Success: you will have token returned, saved it in `localstorage` for further use
  - 400 - Some fields are missing, bad format
  - 401 - Incorrect username/password
  - 500 - Server error

### 3. Get redirect & ads `/api/public/urls/:urlHash/redirect`
- method: `GET`
- params:
```
urlHash: hash of url ex. /api/public/urls/5Xy2G/redirect
```
- Response code 
  - 200 - Success: you will have ads picture and target_url, redirect user to it
  - 404 - The hash url does not exist
  - 429 - No ads are available, treat it like 500
  - 500 - Server error

## User endpoints
These endpoints need `Authorization` header or you will get `401: Unrthorized`

### 1. Get current user `/api/user/whoami`
- method: `GET`
- Response code 
  - 200 - Success, you will get email/username the name of user, and profile picture
  - 401 - Unauthorized, wrong token
  - 500 - Server error

### 2. Change user's name `/api/user/profile`
- method: `PATCH`
- body:
```
{
    "name": "NEWNAMEJAA"
}
```
- Response code 
  - 200 - Success: new user's email/username and name
  - 400 - Some fields are missing, bad format
  - 401 - Unauthorized, wrong token
  - 500 - Server error

### 3. Change/Add user's Photo `/api/user/profilePicture`
- method: `POST`
- body(multipart/formData):
```
{
    "Image": file
}
```
- Response code 
  - 200 - Success: picture added
  - 400 - File error
  - 401 - Unauthorized, wrong token
  - 500 - Server error

### 4. List my created URL `/api/user/urls`
- method: `GET`
- Response code 
  - 200 - Success: you will have list of your created URLs along with the info and number of visits
  - 401 - Unauthorized, wrong token
  - 500 - Server error

### 5. Get specific my created URL `/api/user/urls/:urlHash`
- method: `GET`
- params:
```
urlHash: hash of url ex. /api/user/urls/5Xy2G
```
- Response code 
  - 200 - Success: you will have info of your created URLs along withnumber of visits
  - 401 - Unauthorized, wrong token
  - 404 - URL hash not found
  - 500 - Server error

### 6. Delete specific my created URL `/api/user/urls/:urlHash`
- method: `DELETE`
- params:
```
urlHash: hash of url ex. /api/public/urls/5Xy2G
```
- Response code 
  - 204 - Success: URL has been deleted
  - 401 - Unauthorized, wrong token
  - 404 - URL hash not found
  - 500 - Server error

### 7. Get detailed visit detail to draw graph `/api/user/urls/:urlHash/graph/:lastX`
- method: `GET`
- params:
```
urlHash: hash of url
lastX: last X hours, days choices are 30d, 15d, 7d, 3d, 1d, 12h, 6h, 3h, 1h

Ex. /api/user/urls/X3frU/graph/1d
```
- Response code 
  - 200 - Success: you will have info of your url along with time-splitted visit counts
  - 401 - Unauthorized, wrong token
  - 404 - URL hash not found
  - 500 - Server error

## Hybrid endpoints(create shortened URL)
This endpoint behave differently according to token provided, if correct logged in token provided, the url created is attached to the token user

### 1. Create shortened URL `/api/public/urls/`
- method: `POST`
- params:
```
{
    "target_url": "https://www.google.com",
    "name": "google URL", //optional
    "customHash": "mycustomHash", //optional, custom specified hash
    "domain": "customdomain.com" //optional, domain must point to the server
}
```
- Response code 
  - 201 - Success: created, you will get back the link info
  - 400 - Custom domain does not point to the server at aa-shortener.poomrokc.services
  - 400 - The `customHash` specified is already taken
  - 500 - Server error