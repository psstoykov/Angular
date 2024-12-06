# Angular Project Defense

## Project info

-   Angular app with firebase backend
-   public page: https://angular-77bd6.web.app/
-   all collections except users handled by the firestore cloud db
-   users collection and auth pipeline handled by the official firebase api

## How to run locally

-   clone github repository
-   run npm install in terminal
-   run ng serve in terminal
-   app runnig on http://localhost:4200/

## App functinality

-   public part, where users can access Login, Register, Home and Gallery
-   public part can access post details and read available comments
-   users with an account can create their own posts
-   users with an account can comment on any post.
-   users with an accound can edit and delete their own posts

## Initialize Angular App

-   [x] Create angular App
-   [x] clean initial html file
-   [x] initialize header, footer and main components
-   [x] add header and footer to the app component

## Markup

-   [x] Create Nav Component
-   [x] styles for nav component
-   [x] Create initial html mark-up

## Styling

-   [x] Create initial css styles
-   [x] Added bootstrap library
-   [x] Trim form inputs before submiting the forms

## App setup

-   [x] import provideHttpClient in app config
-   [x] nav routerLink added
-   [x] FormsModule and NgForm to Login
-   [x] Firebase initial setup and deploy

## Components

-   [x] Main, Header, Footer

## Api-Service

-   [x] get all photographs
-   [x] create photograph
-   [x] get photograph by id
-   [/] edit page
-   [x] delete post
-   [ ] my Page

## User-Service

-   [x] Functioning Register/Login/Logout

## Error-handling

-   [x] create error page to route to
-   [] create error pages

## Guards

-   [x] Can-activate function in auth-guard service

## DataBase

-   [x] read data from database
-   [x] display data on the template
