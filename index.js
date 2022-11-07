const readlineSync = require("readline-sync");

function firstRoundDraw(players){
  players = players.sort(function(a,b){
    return a.ranking-b.ranking;
  });

  let returnPlayers = [];
  let length = players.length/2;
  let returnPlayersIndex = 0;


  for(var  i = 0; i < length; i++ ){
    returnPlayers[returnPlayersIndex] = players[i];
    returnPlayersIndex++;
    returnPlayers[returnPlayersIndex] = players[i+length];
    returnPlayersIndex++;
  }

  return returnPlayers;

}

function matchSim(player1, player2) {
  let player1sets = 0;
  let player2sets = 0;
  let player1games = 0;
  let player2games = 0;
  let result = "";
  while (true) {
    if (player1sets == 2) {
      return [result, player1];
    } else if (player2sets == 2) {
      return [result, player2];
    } else {
      if (player1games == 7) {
        result = result + "  " + player1games + ":" + player2games + "  ";
        player1sets++;
        player1games = 0;
        player2games = 0;
      } else if (player2games == 7) {
        result = result + "  " + player1games + ":" + player2games + "  ";
        player2sets++;
        player1games = 0;
        player2games = 0;
      } else if (player1games == 6) {
        if (player2games < 5) {
          result = result + "  " + player1games + ":" + player2games + "  ";
          player1sets++;
          player1games = 0;
          player2games = 0;
        } else {
          let w = Math.floor(Math.random() * 10);
          if (w <= 4) {
            player1games++;
          } else {
            player2games++;
          }
        }
      } else if (player2games == 6) {
        if (player1games < 5) {
          result = result + "  " + player1games + ":" + player2games + "  ";
          player2sets++;
          player1games = 0;
          player2games = 0;
        } else {
          let w = Math.floor(Math.random() * 10);
          if (w <= 4) {
            player1games++;
          } else {
            player2games++;
          }
        }
      } else {
        let w = Math.floor(Math.random() * 10);
        if (w <= 4) {
          player1games++;
        } else {
          player2games++;
        }
      }
    }
  }
}

const main = () => {

  let N = readlineSync.question("Enter number of players (N):");

  const tennisPlayers = [];

  for (var i = 0; i < N; i++) {
    const tempTennisPlayer = readlineSync.question(
      "Insert tennis player in as [firstName],[lastName],[country],[ranking]:"
    );

    const tempTennisPlayerData = tempTennisPlayer.split(",");
    

    tennisPlayers.push({
      firstName: tempTennisPlayerData[0],
      lastName: tempTennisPlayerData[1],
      country: tempTennisPlayerData[2],
      ranking: parseInt(tempTennisPlayerData[3]),
    });
  }

  let currentRoundPlayers = []; 

  currentRoundPlayers = firstRoundDraw(tennisPlayers);

  let playersIndex = 0;
  let nextRoundPlayersIndex = 0;
  let nextRound = [];

  while (true) {

    if (currentRoundPlayers.length == 1) {
      console.log("Winner:");
      console.log(currentRoundPlayers[0]?.firstName + " " + currentRoundPlayers[0]?.lastName + " " + currentRoundPlayers[0]?.country + " " + currentRoundPlayers[0]?.ranking)

      break;


    } else if (playersIndex >= currentRoundPlayers.length) {
      currentRoundPlayers = nextRound;
      nextRound = [];
      playersIndex = 0;
      nextRoundPlayersIndex = 0;
      console.log("-----------------------");
    } else {
      let match = matchSim(currentRoundPlayers[playersIndex], currentRoundPlayers[playersIndex + 1])
      nextRound[nextRoundPlayersIndex] = match[1];
      console.log(currentRoundPlayers[playersIndex]?.firstName + " " + currentRoundPlayers[playersIndex]?.lastName + " " + currentRoundPlayers[playersIndex]?.country + " " + currentRoundPlayers[playersIndex]?.ranking +
      match[0] + currentRoundPlayers[playersIndex + 1]?.firstName + " " + currentRoundPlayers[playersIndex + 1]?.lastName + " " + currentRoundPlayers[playersIndex + 1]?.country + " " + currentRoundPlayers[playersIndex + 1]?.ranking);
      nextRoundPlayersIndex++;
      playersIndex = playersIndex + 2;
    }


  }


};

main();
