import { fifaData } from './fifa.js';

// ⚽️ M  V P ⚽️ //

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 1: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Practice accessing data by console.log-ing the following pieces of data note, you may want to filter the data first 😉*/

//(a) Home Team name for 2014 world cup final
console.log(fifaData.filter( x => x.Year === 2014 && x.Stage === "Final")[0]['Home Team Name'])

//(b) Away Team name for 2014 world cup final
console.log(fifaData.filter( x => x.Year === 2014 && x.Stage === "Final")[0]['Away Team Name'])

//(c) Home Team goals for 2014 world cup final
console.log(fifaData.filter( x => x.Year === 2014 && x.Stage === "Final")[0]['Home Team Goals'])

//(d) Away Team goals for 2014 world cup final
console.log(fifaData.filter( x => x.Year === 2014 && x.Stage === "Final")[0]['Away Team Goals'])

//(e) Winner of 2014 world cup final */
let winner = fifaData.filter( x => x.Year === 2014 && x.Stage === "Final")[0];
if (winner["Home Team Goals"] > winner["Away Team Goals"]){
    console.log(winner["Home Team Name"])}
else if (winner["Home Team Goals"] === winner["Away Team Goals"]){
    console.log("Draw")
}
else {
    console.log(winner["Away Team Name"])
}

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 2: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use getFinals to do the following:
1. Receive data as a parameter
2. Return an array of objects with the data of the teams that made it to the final stage
hint - you should be looking at the stage key inside of the objects
*/

function getFinals(data) {
   return data.filter(x => x.Stage === 'Final')
}

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 3: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function called getYears to do the following: 
1. Receive an array
2. Receive a callback function getFinals from task 2 
3. Return an array called years containing all of the years in the getFinals data set*/

function getYears(arr, cb) {
    return cb(arr).map(x => x.Year)
}

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 4: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function getWinners to do the following:  
1. Receives an array
2. Receives the callback function getFinals from task 2 
3. Determines the winner (home or away) of each `finals` game. 
4. Returns the names of all winning countries in an array called `winners` */ 

function getWinners(arr, cb) {
    return cb(arr).map((x) =>{
    if (x["Home Team Goals"] > x["Away Team Goals"]){
        return (x["Home Team Name"])}
    else if (x["Home Team Goals"] === x["Away Team Goals"]){
        return ("Draw")
    }
    else {
        return(x["Away Team Name"])
    }});
}


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 5: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use the higher-order function getWinnersByYear to do the following:
1. Receive an array
2. Receive a callback function getYears from task 3
3. Receive a callback function getWinners from task 4
4. Return an array of strings that say "In {year}, {country} won the world cup!" 

hint: the strings returned need to exactly match the string in step 4.
 */

function getWinnersByYear(arr, cb1, cb2) {
    const results = [];
    const years = cb1(arr);
    const country = cb2(arr);
    for (let x in years) {
        results.push(`In ${years[x]}, ${country[x]} won the world cup!`)
    }
    return results
}



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 6: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher order function getAverageGoals to do the following: 
 1. Receive the callback function getFinals from task 2 ensure you pass in the data as an argument
 2. Return the the average number of the total home team goals and away team goals scored per match and round to the second decimal place. 
 
 (Hint: use .reduce and do this in 2 steps) 
 
 Example of invocation: getAverageGoals(getFinals(fifaData));
*/

function getAverageGoals(data) {
    return (getFinals(data).reduce((total, item) => {return total += (item["Away Team Goals"] + item["Home Team Goals"])}, 0)/getFinals(data).length).toFixed(2);
}




/// 🥅 STRETCH 🥅 ///

/* 💪💪💪💪💪 Stretch 1: 💪💪💪💪💪 
Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(arr, initials) {
    
    return getFinals(arr).map((x) =>{
    if (x["Home Team Goals"] > x["Away Team Goals"]){
        return (x["Home Team Initials"])}
    else if (x["Home Team Goals"] === x["Away Team Goals"]){
        return ("Draw")
    }
    else {
        return(x["Away Team Initials"])
    }}).filter(x => x === initials).length;
}



/* 💪💪💪💪💪 Stretch 2: 💪💪💪💪💪 
Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(data) {
    let finals = data.filter(x => x.Stage === "Final");
    const counts = {};
    console.log(finals)
    finals.map(x => {
      if(!counts.hasOwnProperty(x['Home Team Name'])){
        counts[x['Home Team Name']] = {
          'appearance': 1,
          'goals': x['Home Team Goals']
        }
      }
      else {
        counts[x['Home Team Name']].appearance += 1;
        counts[x['Home Team Name']].goals += x['Home Team Goals'];
      }
      if(!counts.hasOwnProperty(x['Away Team Name'])){
        counts[x['Away Team Name']] = {
          'appearance': 1,
          'goals': x['Away Team Goals']
        }
      }
      else {
        counts[x['Away Team Name']].appearance += 1;
        counts[x['Away Team Name']].goals += x['Away Team Goals'];
      }
      });
    console.log(counts);
    let max = 0;
    let teamMax = "";
    for (i in counts) {
      console.log(counts[i]);
      if ((counts[i].goals / counts[i].appearance) > max){
        max = counts[i].goals / counts[i].appearance;
        teamMax = i
        console.log(teamMax)
      }
    }
    return teamMax;
  }


/* 💪💪💪💪💪 Stretch 3: 💪💪💪💪💪
Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(data) {
    let finals = data.filter(x => x.Stage === "Final");
    const counts = {};
    console.log(finals)
    finals.map(x => {
      if(!counts.hasOwnProperty(x['Home Team Name'])){
        counts[x['Home Team Name']] = {
          'appearance': 1,
          'goals': x['Away Team Goals']
        }
      }
      else {
        counts[x['Home Team Name']].appearance += 1;
        counts[x['Home Team Name']].goals += x['Away Team Goals'];
      }
      if(!counts.hasOwnProperty(x['Away Team Name'])){
        counts[x['Away Team Name']] = {
          'appearance': 1,
          'goals': x['Home Team Goals']
        }
      }
      else {
        counts[x['Away Team Name']].appearance += 1;
        counts[x['Away Team Name']].goals += x['Home Team Goals'];
      }
      });
    console.log(counts);
    let max = 0;
    let teamMax = "";
    for (i in counts) {
      console.log(counts[i]);
      if ((counts[i].goals / counts[i].appearance) > max){
        max = counts[i].goals / counts[i].appearance;
        teamMax = i
        console.log(teamMax)
      }
    }
    return teamMax;
  }
  
  


/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */


/* 🛑🛑🛑🛑🛑 Please do not modify anything below this line 🛑🛑🛑🛑🛑 */
function foo(){
    console.log('its working');
    return 'bar';
}
export default{
    foo,
    getFinals,
    getYears,
    getWinners,
    getWinnersByYear,
    getAverageGoals
}
