function competitive() {
  hideEntrada();
  competi = true;
  document.getElementById("introWord").style.display = "block"; // Show players div
}
let competi = false;
function soloPlayer() {
  hideEntrada();

  competi = false;
  document.getElementById("players").style.display = "block"; // Show players div
}

function multiPlayer() {
  hideEntrada();
  competi = false;
  document.getElementById("introWord").style.display = "block"; // Show players div
}
function miraContra() {
  var x = document.getElementById("contra");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

function hideEntrada() {
  var algo = document.getElementById("entrada");
  algo.style.display = "none";
  document.getElementById("goBack").style.display = "flex";
  document.getElementById("cigarras").play();
}
function goLobby() {
  document.getElementById("introWord").style.display = "none";
  document.getElementById("entrada").style.display = "block";
  document.getElementById("goBack").style.display = "none";
  document.getElementById("juego").style.display = "none";
  document.getElementById("box2").style.display = "none";
}
function validateForm() {
  const x = document.getElementById("contra").value;
  if (x == "") {
    alert("Name must be filled out");
    return false;
  } else if (/\d/.test(x)) {
    alert("No numbers");
    return false;
  } else if (x.length < 4) {
    alert("Too short");
    return false;
  } else if (!competi) {
    document.getElementById("players").style.display = "none";
    document.getElementById("introWord").style.display = "none";
    document.getElementById("juego").style.display = "flex";
    juegoStart();
  } else {
    document.getElementById("players").style.display = "none";
    document.getElementById("introWord").style.display = "none";
    document.getElementById("juego").style.display = "flex";

    document.getElementById("box2").style.display = "block";
    juegoMultiStart();
  }
}
function id(str) {
  return document.getElementById(str);
}
let vidas;
let secretWordu;
let larg;
let text = "";
let lista = [];
let barras = [];
let wins = 0;
let games = 0;
let points;
let pointsHist = 0;
let suma = 1;
let repes = [];
function juegoStart() {
  vidas = 9;
  barras = [];
  lista = [];

  suma = 1;
  points = 0;
  games += 1;
  text = "";
  repes = [];
  document.getElementById("wins").innerHTML = wins;
  document.getElementById("points").innerHTML = points;
  document.getElementById("games").innerHTML = games;
  document.getElementById("door").src = "img/door" + vidas + ".png";
  document.getElementById("life").innerHTML = vidas;
  document.getElementById("secretWordh1").style.backgroundColor = "";
  secretWordu = document.getElementById("contra").value.toLowerCase();
  larg = secretWordu.length;
  for (let i = 0; i < larg; i++) {
    if (secretWordu[i].match(/[a-z]/i)) {
      text += "_";
    } else {
      text += " ";
    }
  }
  document.getElementById("secretWordh1").innerHTML = text;
  lista = secretWordu.split("");
  barras = text.split("");
  const botones = document.getElementsByClassName("letra");

  for (let i = 0; i < botones.length; i++) {
    botones[i].style.backgroundColor = "white";
    botones[i].disabled = false;
  }
  document.getElementById("life").innerHTML = vidas;

  document.addEventListener("keydown", (event) => {
    if (lista.includes(event.key)) {
      if (repes.includes(event.key)) return;
      else {
        repes += event.key;
        points += suma;
        suma += 1;
        document.getElementById("points").innerHTML = points;
        document.getElementById(event.key).style.backgroundColor = "lightgreen";
        document.getElementById(event.key).disabled = true;
        for (let i = 0; i < lista.length; i++) {
          if (lista[i] == event.key) {
            barras[i] = lista[i];
          }
        }
        document.getElementById("secretWordh1").innerHTML = barras.join("");
      }
    } else if (
      document.getElementById(event.key).style.backgroundColor !== "red"
    ) {
      document.getElementById(event.key).style.backgroundColor = "red";
      vidas--;
      suma = 1;

      document.getElementById(event.key).disabled = true;
      document.getElementById("door").src = "img/door" + vidas + ".png";
      document.getElementById("life").innerHTML = vidas;
    }
    if (vidas <= 0) {
      points = 0;
      endGames();
      document.getElementById("secretWordh1").style.backgroundColor = "red";
      return;
    }
    if (!barras.includes("_")) {
      document.getElementById("secretWordh1").style.backgroundColor = "green";
      wins += 1;
      endGames();
      document.getElementById("wins").innerHTML = wins;
    }
  });
}
let player1 = true;
let player2 = false;
let wins2 = 0;
let pointsHist2 = 0;
function botonPulsado(letra) {
  if (lista.includes(letra)) {
    if (competi) {
      if (player1) {
        points[0] += suma;
        suma += 1;

        document.getElementById("points").innerHTML = points[0];
      } else {
        points[1] += suma;
        suma += 1;
        document.getElementById("points2").innerHTML = points[1];
      }
    } else {
      points += suma;
      suma += 1;
      document.getElementById("points").innerHTML = points;
    }
    repes += letra;
    document.getElementById(letra).style.backgroundColor = "lightgreen";
    document.getElementById(letra).disabled = true;
    for (let i = 0; i < lista.length; i++) {
      if (lista[i] == letra) {
        barras[i] = lista[i];
      }
    }
    document.getElementById("secretWordh1").innerHTML = barras.join("");
  } else if (vidas <= 0) {
    endGames();
    points = 0;
    document.getElementById("secretWordh1").style.backgroundColor = "red";
    return;
  } else if (document.getElementById(letra).style.backgroundColor !== "red") {
    document.getElementById(letra).style.backgroundColor = "red";
    vidas--;
    suma = 1;
    document.getElementById("door").src = "img/door" + vidas + ".png";
    document.getElementById("life").innerHTML = vidas;
    if (competi) {
      player1 = !player1;
      player2 = !player2;
      if (!player1) {
        document.getElementById("box").style.backgroundColor = "red";
        document.getElementById("box2").style.backgroundColor = "green";
      } else {
        document.getElementById("box").style.backgroundColor = "green";
        document.getElementById("box2").style.backgroundColor = "red";
      }
    }
  }
  if (!barras.includes("_")) {
    document.getElementById("secretWordh1").style.backgroundColor = "green";
    if (competi) {
      if (points[0] > points[1]) {
        wins += 1;

        document.getElementById("wins").innerHTML = wins;
        endGames();
      } else if (points[0] < points[1]) {
        wins2 += 1;

        document.getElementById("wins2").innerHTML = wins2;
        endGames();
      } else {
        endGames();
      }
    }
    wins += 1;
    endGames();
    document.getElementById("wins").innerHTML = wins;
  }
}
function endGames() {
  if (competi) {
    if (points[0] > points[1]) {
      if (pointsHist < points[0]) {
        console.log(points);
        var currentdate = new Date();
        var datetime =
          currentdate.getDate() +
          "/" +
          (currentdate.getMonth() + 1) +
          "/" +
          currentdate.getFullYear() +
          "  " +
          currentdate.getHours() +
          ":" +
          currentdate.getMinutes() +
          " - " +
          points[0] +
          " puntos";
        document.getElementById("date").innerHTML = datetime;
        console.log(datetime);
        pointsHist = points[0];
        console.log(pointsHist);
        document.getElementById("winMessage").style.display = "block";

        document.getElementById("winner").innerHTML = "HAS GANADO JUGADOR2";
        document.getElementById("winMessage").style.position = "absolute";
      } else if (points == 0) {
        document.getElementById("winMessage").style.display = "block";

        document.getElementById("winner").innerHTML = "HAS PERDIDO JUGADOR2";
        document.getElementById("winMessage").style.position = "absolute";
      } else {
        document.getElementById("winMessage").style.display = "block";

        document.getElementById("winner").innerHTML = "HAS GANADO JUGADOR2";
        document.getElementById("winMessage").style.position = "absolute";
      }
    } else if (points[0] < points[1]) {
      if (pointsHist2 < points[1]) {
        console.log(points);
        var currentdate = new Date();
        var datetime =
          currentdate.getDate() +
          "/" +
          (currentdate.getMonth() + 1) +
          "/" +
          currentdate.getFullYear() +
          "  " +
          currentdate.getHours() +
          ":" +
          currentdate.getMinutes() +
          " - " +
          points[1] +
          " puntos";
        document.getElementById("date2").innerHTML = datetime;
        console.log(datetime);
        pointsHist2 = points[1];
        console.log(pointsHist);
        document.getElementById("winMessage").style.display = "block";

        document.getElementById("winner").innerHTML = "HAS GANADO JUGADOR3";
        document.getElementById("winMessage").style.position = "absolute";
      } else if (points == 0) {
        document.getElementById("winMessage").style.display = "block";

        document.getElementById("winner").innerHTML = "HAS PERDIDO JUGADOR3";
        document.getElementById("winMessage").style.position = "absolute";
      } else {
        document.getElementById("winMessage").style.display = "block";

        document.getElementById("winner").innerHTML = "HAS GANADO JUGADOR3";
        document.getElementById("winMessage").style.position = "absolute";
      }
    } else {
      document.getElementById("winMessage").style.display = "block";

      document.getElementById("winner").innerHTML = "HA HABIDO UN EMPATE";
      document.getElementById("winMessage").style.position = "absolute";
    }
  } else {
    if (pointsHist < points) {
      console.log(points);
      var currentdate = new Date();
      var datetime =
        currentdate.getDate() +
        "/" +
        (currentdate.getMonth() + 1) +
        "/" +
        currentdate.getFullYear() +
        "  " +
        currentdate.getHours() +
        ":" +
        currentdate.getMinutes() +
        " - " +
        points +
        " puntos";
      document.getElementById("date").innerHTML = datetime;
      console.log(datetime);
      pointsHist = points;
      console.log(pointsHist);
      document.getElementById("winMessage").style.display = "block";

      document.getElementById("winner").innerHTML = "HAS GANADO JUGADOR2";
      document.getElementById("winMessage").style.position = "absolute";
    } else if (points == 0) {
      document.getElementById("winMessage").style.display = "block";

      document.getElementById("winner").innerHTML = "HAS PERDIDO JUGADOR2";
      document.getElementById("winMessage").style.position = "absolute";
    } else {
      document.getElementById("winMessage").style.display = "block";

      document.getElementById("winner").innerHTML = "HAS GANADO JUGADOR2";
      document.getElementById("winMessage").style.position = "absolute";
    }
  }
}

function juegoMultiStart() {
  vidas = 9;
  barras = [];
  lista = [];
  points = [0, 0];
  games += 1;
  text = "";
  repes = [];

  suma = 1;
  document.getElementById("wins").innerHTML = wins;
  document.getElementById("points").innerHTML = points[0];
  document.getElementById("games").innerHTML = games;
  document.getElementById("wins2").innerHTML = wins2;
  document.getElementById("points2").innerHTML = points[1];
  document.getElementById("games2").innerHTML = games;
  document.getElementById("door").src = "img/door" + vidas + ".png";
  document.getElementById("life").innerHTML = vidas;
  document.getElementById("secretWordh1").style.backgroundColor = "";

  document.getElementById("box").style.backgroundColor = "green";

  document.getElementById("box2").style.backgroundColor = "red";
  secretWordu = document.getElementById("contra").value.toLowerCase();
  larg = secretWordu.length;
  for (let i = 0; i < larg; i++) {
    if (secretWordu[i].match(/[a-z]/i)) {
      text += "_";
    } else {
      text += " ";
    }
  }
  document.getElementById("secretWordh1").innerHTML = text;
  lista = secretWordu.split("");
  barras = text.split("");
  const botones = document.getElementsByClassName("letra");

  for (let i = 0; i < botones.length; i++) {
    botones[i].style.backgroundColor = "white";
    botones[i].disabled = false;
  }
  document.getElementById("life").innerHTML = vidas;

  document.addEventListener("keydown", (event) => {
    if (lista.includes(event.key)) {
      if (repes.includes(event.key)) return;
      else {
        repes += event.key;
        if (player1) {
          points[0] += suma;
          suma += 1;
          document.getElementById("points").innerHTML = points[0];
        } else {
          points[1] += suma;
          suma += 1;
          document.getElementById("points2").innerHTML = points[1];
        }
        document.getElementById(event.key).style.backgroundColor = "lightgreen";
        document.getElementById(event.key).disabled = true;
        for (let i = 0; i < lista.length; i++) {
          if (lista[i] == event.key) {
            barras[i] = lista[i];
          }
        }
        document.getElementById("secretWordh1").innerHTML = barras.join("");
      }
    } else if (
      document.getElementById(event.key).style.backgroundColor !== "red"
    ) {
      document.getElementById(event.key).style.backgroundColor = "red";
      vidas--;
      suma = 1;

      document.getElementById(event.key).disabled = true;
      document.getElementById("door").src = "img/door" + vidas + ".png";
      document.getElementById("life").innerHTML = vidas;
      player1 = !player1;
      player2 = !player2;
      if (!player1) {
        document.getElementById("box").style.backgroundColor = "red";
        document.getElementById("box2").style.backgroundColor = "green";
      } else {
        document.getElementById("box").style.backgroundColor = "green";
        document.getElementById("box2").style.backgroundColor = "red";
      }
    }
    if (vidas <= 0) {
      points = 0;
      endGames();
      document.getElementById("secretWordh1").style.backgroundColor = "red";
      return;
    }
    if (!barras.includes("_")) {
      document.getElementById("secretWordh1").style.backgroundColor = "green";
      if (points[0] > points[1]) {
        wins += 1;

        document.getElementById("wins").innerHTML = wins;
        endGames();
      } else if (points[0] < points[1]) {
        wins2 += 1;

        document.getElementById("wins2").innerHTML = wins2;
        endGames();
      } else {
        endGames();
      }
    }
  });
}
function otroGame() {
  document.getElementById("introWord").style.display = "block";
  document.getElementById("goBack").style.display = "none";
  document.getElementById("juego").style.display = "none";
  document.getElementById("box2").style.display = "none";
  document.getElementById("winMessage").style.display = "none";
}
