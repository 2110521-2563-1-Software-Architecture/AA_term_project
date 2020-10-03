# aa-term-project

a [Sails v1](https://sailsjs.com) application


### Links

+ [Sails framework documentation](https://sailsjs.com/get-started)
+ [Version notes / upgrading](https://sailsjs.com/documentation/upgrading)
+ [Deployment tips](https://sailsjs.com/documentation/concepts/deployment)
+ [Community support options](https://sailsjs.com/support)
+ [Professional / enterprise options](https://sailsjs.com/enterprise)


### Version info

This app was originally generated on Sat Oct 03 2020 16:52:06 GMT+0700 (Indochina Time) using Sails v1.3.1.

<!-- Internally, Sails used [`sails-generate@2.0.0`](https://github.com/balderdashy/sails-generate/tree/v2.0.0/lib/core-generators/new). -->


This project's boilerplate is based on an expanded seed app provided by the [Sails core team](https://sailsjs.com/about) to make it easier for you to build on top of ready-made features like authentication, enrollment, email verification, and billing.  For more information, [drop us a line](https://sailsjs.com/support).


<!--
Note:  Generators are usually run using the globally-installed `sails` CLI (command-line interface).  This CLI version is _environment-specific_ rather than app-specific, thus over time, as a project's dependencies are upgraded or the project is worked on by different developers on different computers using different versions of Node.js, the Sails dependency in its package.json file may differ from the globally-installed Sails CLI release it was originally generated with.  (Be sure to always check out the relevant [upgrading guides](https://sailsjs.com/upgrading) before upgrading the version of Sails used by your app.  If you're stuck, [get help here](https://sailsjs.com/support).)
-->

# Basics info for collaborators
- At the current moment, environmental variables are not embedded into the app yet, so stay tuned

## Backend
- The app is under heavy configuration, but basically what I believe is that `account management` and `REST` features are built in with it, stay tuned for more documentation

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
        npm run open:client
        ```
    - 3.2. Backend only 
        ```
        npm run lift
        ```
    - 3.3. Both 
        ```
        npm start
        ```
Frontend app should be available at `localhost:8080` while backend app should be available at `localhost:1337` at the moment

## Deployment

Will be added later