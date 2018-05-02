# ETC-BACK

Here is the backend for the ETC project.

It contains the RestAPI protected by a login service.

## Requirements

A mongodb server up and running.

## How to use the API?

You can use the example below : 
- `/login` => redirects to the CAS to log the user in. If it's the first connection of the user, he will be added to the DB. A temporary token must be passed as a query parameter. Once logged in, a call to `/api/1.0/login` providing the token must be done in order to generate a new server-side token.
- `/api/1.0` => contains all the routes for the API. Every query must have a token parameter to authenticate the user. Every query must also return the new generated token.
    - `/users` => return the list of users (username)
    - `/login` => used to consume the front token and return a new token

## How to develop new entries 

1. Respect the architecture provided
2. Ensure your query returns an object like `{data : //your data, token: //the new token}`
3. Create your own branch from `develop` and name it in order to inform of the feature you're implementing
4. Complete this documentation with your work
5. Once everything is ok, create a merge request from your branch to `develop`