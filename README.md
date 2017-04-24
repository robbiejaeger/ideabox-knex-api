# Basic CRUD Express API

This app is hosts a box of ideas! It originated as a simple CRUD app using local storage, but
I wanted to covert it to use a postgresql database through an ExpressJS backend API.

Used [this article](http://mherman.org/blog/2016/04/28/test-driven-development-with-node/#.WPi_sVMrKsx) as a great tutorial.

[Here](https://github.com/robbiejaeger/ideabox-FEm1) is the "original" IdeaBox using `localStorage`.

## Setup

Clone this repo and `cd` into the new directory.

In the terminal, run `npm install`.

## Run the app

In the terminal, run `node server.js` and head over to `localhost:3000`.

## Run the Tests

In the terminal, run `mocha`. (You must have Mocha installed globally for this command to work.)

### Future Work

- Test server sad paths
- Add sad path handling for `XMLHttpRequest` in client-side code
