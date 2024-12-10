# Angular Project Defense

## Project info

-   Angular app with firebase backend
-   public domain: https://angular-77bd6.web.app/
-   all collections except users are handled by the firestore cloud db
-   users collection and auth pipeline handled by the official firebase api

## How to run locally

-   clone github repository
-   run npm i @angular/cli
-   run npm install
-   run ng serve to start application
-   app runnig on http://localhost:4200/

## Core Functionalities

-   public part for guest users
-   latest three posts visible at the home page with direct path to details
-   timestamps on posts and comments
-   guest users can browse the gallery, read comments, search in the gallery and see post details
-   guest users can register and login with email and password
-   logged in users can create new posts and comment on all posts.
-   logged in users can browse the gallery, read and write comments, search in the gallery and see post details
-   logged in users can edit and delete their own posts
-   logged in users can update their profile name on /My Page
-   logged in users can set a new password on /My Page
-   search window in the gallery is case insensitive and matches resuls for title, description and author.
-   profile info about "last login" and "active since" on /My Page
-   gallery dynamic sorting available either by username or latest or oldest posts

> > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > >

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
-   [x] edit page
-   [x] delete post
-   [x] my Page

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
