[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/CNwikhrY)

# Exam #2: "Social Budget"

## Student: s324466 BIANCO PASQUALE

## React Client Application Routes

- Route `/`: this app is developed as single page, so the only route is the root one

## Main React Components

- `Header` (in [Header/Header.jsx](/client/src/components/Header/Header.jsx)): it is the header of the web page, containing informations as name of the app, name of the user and Login; if the logged user is an admin, a button to manage phases is displayed

- `Login` (in [Auth/Login.jsx](/client/src/components/Auth/Login.jsx)): it contains form to perform authentication by username and password
- `App` (in `App.jsx)

- `Phase0` (in [Phase/Phase0.jsx](/client/src/components/Phase/Phase0.jsx)): this is the body content for first phase, the one used by admin to define the budget and to go to the next phase

- `Phase1` (in [Phase/Phase1.jsx](/client/src/components/Phase/Phase1.jsx)): this is the body content for second phase, that is accessible only by logged users, allowing them to insert their own proposal

  - `Proposal1` (in [Proposal/Proposal1.jsx](/client/src/components/Proposal/Proposal1.jsx)): this is the template for the inserted proposals to be visualized in this phase; it can be removed or modified

- `Phase2` (in [Phase/Phase2.jsx](/client/src/components/Phase/Phase2.jsx)): this is the body content for third phase, that is accessible only by logged users

  - `Proposal2` (in [Proposal/Proposal2.jsx](/client/src/components/Proposal/Proposal2.jsx)): this is the template for the proposal to be visualized in this phase; here the logged user can manage a vote by inserting, deleting or modifying it

- `Phase3` (in [Phase/Phase3.jsx](/client/src/components/Phase/Phase3.jsx)): this is the body content for last phase, in which all users can see final results; moreover, logged user can also see the non approved proposals

  - `Proposal3` (in [Proposal/Proposal3.jsx](/client/src/components/Proposal/Proposal3.jsx)): this is the template for the proposal to be visualized in this phase; it is read-only

- `Footer` (in [Footer/Footer.jsx](/client/src/components/Footer/Footer.jsx)): footer

## API Server

- POST `/api/something`: purpose
  - request parameters and request body content
  - response body content
  - response status codes and possible errors
- GET `/api/something`: purpose
  - request parameters
  - response body content
  - response status codes and possible errors
- PUT `/api/something`: purpose
  - request parameters and request body content
  - response body content
  - response status codes and possible errors
- ...

## Database Tables

- Table `users` - contains user data, including hashed password and salt for auth

  - `username`: Text, User username - PRIMARY KEY
  - `email`: Text, User email
  - `name`: Text, User name
  - `surname`: Text, User surname
  - `password`: Text, User password (hashed using crypto.scrypt)
  - `salt`: Text, salt (for authentication)
  - `isadmin`: Boolean, User role

- Table `proposals` - contains all proposals made by logged users

  - `id`: Integer - PRIMARY KEY
  - `author`: Text, Proposal author - FOREIGN KEY(users)
  - `description`: Text - Proposal one line description (max 90 char)
  - `cost`: Integer, Proposal cost
  - `score`: Integer, Proposal final score, computed only at final phase
  - `isapproved`: Boolean, proposal state, computed only at final phase

- Table `votes` - contains all votes, divided by user and proposal

  - `id`: Integer - PRIMARY KEY
  - `proposal_id`: Integer, voted Prosal - FOREIGN KEY(proposals)
  - `voter`: Text, person who voted - FOREIGN KEY(users)
  - `score`: Integer, given vote in [0, 3]

- Table `state` - it will always cotain a single row, that is the current state of the full process

  - `id`: Integer - PRIMARY KEY
  - `phase`: Integer, the current phase
  - `budget`: Decimal, the budget decided by the admin

## Screenshots

![Screenshot1](./img/screenshot.jpg)

![Screenshot2](./img/screenshot.jpg)

## Users Credentials

| username | password | role  |
| :------- | :------- | :---: |
| admin    | admin    | admin |
| user1    | user1    | user  |
| user2    | user2    | user  |
| user3    | user3    | user  |
