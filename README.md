# Savages-Online-React (Repository)

## General Information -

    This is a Massive Multiplayer Online Role-Playing Gme (MMORPG) being built with JavaScript/NodeJS, html, css,
    usingthe popular Phaser 3 gaming library, along with ReactJS's web framework for the basis to build the site off
    of.

    This project is being developed for fun on the side of my daily life's responsibilities and other ptojects
    I am also currently working.

    The biggest reason for developing this game is to learn how to use web sockets for real-time interations on
    a web application.

## Downloads -

    Absolutely NO Download is required to play the game. Savages-Online is also cross-platform allowing people to play
    it on any device that has access to a web browser (Mac OS, Widows OS, Linux, iPads/Tablets, iPhones/Androids, etc).

## Updates -

### 12/16/2023 - Game Updates

    - Website basis created for the game using ReactJS.
    - Game client created using Phaser 3.
    - Game server created using NodeJS and ExpressJS.
    - Database established using MongoDB.
    - Login/Registration system completed.
    - Web sockets implemented for multiple connections.
    - Player x, y, direction is stored and updated using web sockets for real-time player interaction.
    - Initial Player communication system completed.

### 12/19/2023 - Game Updates

    - Removed TitleScene buffer from the game after the user logs in.
    - Users login data is stored and assigned to the players when logged in.
    - Users player data is updated through web sockets and stored to database whenever a disconnection occurs.

## Todo's -

    **Needs to be completed:**

    1. Fix player data loading from database error upon disconnection when reconnecting.

    2. Finish the Character Creation Scene for each user to have the option to design three characters.

    3. Finish the Character Selection Screen, loading in all the character's data for each user, getting displayed
    in the three available character slots respectfully.

    4. Display created character's data in each character slot respecfully if one exists.

    5. Make as many needed API requests to the servers endpoints to 'Play', 'Delete', or 'Create'
    with a specific character from each of the users three available characters.

    6. Strengthen the registration/login and game entry authorization.

    7. Implement bcrypt to hash and unhash registered user's sensitive information.

    8. Update the User database schema to hold the needed data that's used in the game.

    9. Clean-up entire project's code base. (Breaking things down into smaller components to be more reusable
    throughout the development of this game's project)

## Project installation steup/instructions -

**STEP ONE:**

    ```git clone https://github.com/bryceberwald/Savages-Online-React.git```

    ```cd client && npm install```

    ```cd ../server && npm install```

**STEP TWO:**

    1. Locate the root folder of the Github project repository.
    2. Open Terminal @ /{PROJECT_DIR}
    3. ```code .```
       -  should open vs code starting from the root directory of the project.
    4. Inside vs code editor open up dual teminals side-by-side.
    5. Set the directory on the first terminal to be in /client directory, so... ```cd client``` from the root project folder.
    6. Set the directory on the second terminal to be in /server directory, so... ```cd server``` from the root project folder.
    7. Inside the /{PROJECT_ROOT_DIRECTORY}/client type... ```npm run start``` (This will start the client of the web application.)
    8. Inside the /{PROJECT_ROOT_DIRECTORY}/server type... ```npm run dev``` (This will start the server of the web application.)

## Developers -

    ***Berz - Lead Developer***
    ***Tresky - Developer***
    ***Juju Futuro - Moderator***

## Credits -

    - Phaser v3.60 -  https://phaser.io/
    - Web sockets v4.7.2 - https://socket.io/
    - ExpressJS 4.18.2- https://expres sjs.com/
    - ReactJS 18.2.0 - https://react.dev/
    - MongoDB - 7.6.0 https://www.mongodb.com/
    
    - Artwork #1 - https://itch.io/
    - Artwork #2 - https://opengameart.org/
    - Artwork #3 - https://seliel-the-shaper.itch.io/