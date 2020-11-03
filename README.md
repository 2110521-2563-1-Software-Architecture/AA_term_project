# aa-term-project

# Basics info for collaborators


## Endpoints
Endpoints documentation is at [here](ENDPOINTS.md)


## Backend
- Set the `.env` according to .env.example and the `example.env`

### Configuring new route
- Add action via `logics` then use them at `routes`
- Add models via `models`

## Frontend


## Environment variables
- Currently only `main_service.env` is needed, consult `man_service.env.example` to set it up

## Architecture
We have 7 docker containers working together as a service

1. `main_service` - The main backend app, handling memberships, URLs creations, stats for member
2. `redirect_microservice` - Serve ads image and take the load when need to redirect user to the target url, make use of `redis` cache to respond to redirect requests very fast without querying database/main backend often. Also log visitor stats to `influxdb`
3. `redis` - Caching of redirect_microservice
4. `mongodb` - Main database, use volume to make persistent storage
5. `influxdb` - Log visit stats of shortened URLs
6. `nginx` - API gateway and serve static files for frontend and some images
7. `frontend-builder` - Build frontend as static files and let nginx serve it

## Deployment

It is here http://aa-shortener.poomrokc.services/