
# Excursions management app

## General info

The aim of the project was to create an application for managing trips both on the client's and admin's side.

In the project I do not focus on the visual part, the goal I chose was to write a functional application with the cleanest code possible, following the principle of single responsibility.

### Client

What the user can do?:

* Select a trip by entering the number of ordered tickets in the appropriate field of the form and clicking *dodaj do zamówienia*,
* order confirmation by entering name, surname and email address into the order field and clicking *zamów*.

### Admin

What the admin can do?:

* Adding excursions,
* removing excursions,
* modifying excursions.


## Technologies

* HTML5,
* CSS (includes custom properties)
* Javascript,
* ES6 modules,
* REST API,
* JSON Server (CRUD).
* Webpack
* Babel

## Installation

### Webpack

Install all npm packages using command:
````
npm i
````
Run webpack using command:
````
npm start
````

From now, the app will be available at:

Client panel: http://localhost:8080/index.html.

Admin panel: http://localhost:8080/admin.html.

### JSON server

If you don't have JSON server installed on your device use command:
````
npm install json-server -g
````
To run JSON server use command:
````
npm run api
````

From now, the API will be available at:
````
Excursion data: http://localhost:3000/excursions.
````
````
Order data: http://localhost:3000/orders.
````

Our communication with the running API will be via fetch(). For older browsers support we will use polyfill, exactly whatwg-fetch.

## Solutions provided in the project

Due to the fact that the code was repeatable in many places for the client panel and the admin panel, I decided to create two classes (API.js and Excursion.js) containing appropriate methods that both panels can use. I followed the principle of single responsibility when creating classes.


## Author

* Github - [KajetanKisielewski](https://github.com/KajetanKisielewski),
* Linkedin - [KajetanKisielewski](https://www.linkedin.com/in/kajetan-kisielewski-157b60208/).

## Special thanks

Thanks to my [Mentor - devmentor.pl](https://devmentor.pl/) - for providing me with this task and for code review.