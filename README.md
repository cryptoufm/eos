# The Human Action


## Treasure Hunt 

#### Platform: EOS jungle testnet

##### Token: Mises Ms



The purpose of The Human Action is that each person that interacts with this game can extend his knowledge about the blockchain technology through a different approach that does not specifically deal only with transactions, that every person can understand that blockchain is a technology that is going forward and it can be used in a multiples ways.


This game is based on EOS blockchain in the Jungle testnet, the game's tokens are called Mises or Ms

Each player has on screen a riddle, this riddle indicates the player the location they have to go, in this location they have to find a code that each player has to enter it on the game, if the code is correct the game changes the riddle on screen to a new location. In case the player can't find the location, in the screen will show two hints to help the player to find the location but every hint has a cost and this cost will be subtracted from the reward of this location. The second hint has a clear message of the location and that is why this hint has a higher cost.

The game has a timer and every reward or costs of the hint depend on the time each player takes to find the codes of the locations, so every player must hurry to have greater reward.

The winner of the game is the player that has more Mises.



### Rules

* All of the rewards are based on Mises / Ms
* Every player starts with 100 Ms  
* Game time is one hour  
* There are 6 locations  
* Initial reward is 70 Ms  
* Initial cost of Hint #1 is 25 Ms  
* Initial cost of Hint #2 is 45 Ms  


### Login

In the login screen, we have three options for every player to choose his favourite social network to enter the game.

* Twitter  
* Google 
* Facebook 

We connected every social network through its API, so we are getting the name from it and an UID, that is an unique identifier for every player that logs in with a specific social network, then with this information we send it to the backend's API,in the backend creates a new jungle testnet wallet and give every wallet 100 Ms just to start the game.


### Profile


The profile screen brings the player information about his account, like the alias of the wallet they now own in the jungle testnet, in this section it brings the information we took out with the socia network API that we stored in a database in firebase, like the name of the player and the photo they have on that social network. It shows how much Mises you have in that exact moment, his private key to his wallet. We extract all the wallet information through Backend's API.


### Ranking

The purpose of the Ranking section is that every player can check the position table and see in which position they are and see all other players positions just to make the game more competitive. The way we do this is through backend's API and we send them only the match id and it returns us all the Table with the players in order from the player that has more Mises to the player to has the lowest. 




### Game

The game is the most complex section of all the game. 

In this section is where all of the important things will happen, so here is a list of the things this section handles:

* Geolocation
* Reward ecuation 
* Hint cost ecuation
* Timer 
* Validation of codes


Remember the game rules, all is happening in this section so there are a lot of elements in each thing that this section has.

When a player is in the exact location and enters the code in the textbox, the game validates if the player is between the range of coordinates that were preset to the location, if the player is not in the range of coordinates it will not process the code and it will show that there is an error, then if the player is in the right place it will give the player the reward, the reward that is given to the player passes through some calculations before the transaction is done, the initial reward is affected by the time the player takes to put the right code, you'll see that in the reward ecuation.

There are more possibilities, like if the player doesn't find the place and push the hint button, this will show  the hint to the player but it will put a penalty on the player because the cost of the hint will be subtracted of the reward, the cost of the hint depends on the time the player takes to put the code on the textbox.

**Reward Ecuation:**

$Reward  = Initial Reward \left( \frac{60 - Time Elapsed}{60}\right)$

**Hint Cost Ecuation:**

$Hint  = Initial Hint \left( \frac{60 - Time Elapsed}{60}\right)$



The logic behind this ecuations and the way of playing the game is that we want the rules and the cost to be fair to all the player in all the circumstances.

So if a player pay all of the hints at the start of each stage he will be faster finding the exact spot and he will have a higher reward than the other players, but if a player really doesn't find the right place and his last option is to push the hint button, the cost of that hint will cost a lot less than the player that push the hint button at the start.

That is the way we are keeping this game competitive and the player will have to choose a strategy to finish the game in the shortest possible time and be the one with the most Mises when the game finishes.











This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
