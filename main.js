const express = require("express")
const mustacheExpress = require("mustache-express")
const bodyParser = require("body-parser")
const expressValidator = require("express-validator")
const fs = require("fs")
const expressSession = require("express-session")
const app = express()
// const jsonfile = require("json-file")
app.use(
  //Coops
  expressSession({
    secret: "I am the lostest ever ever hang with the dude hanging",
    resave: false,
    saveUninitialized: true
  })
)

const words = fs
  .readFileSync("/usr/share/dict/words", "utf-8")
  .toLowerCase()
  .split("\n")

app.use(express.static("public"))
app.use(expressValidator())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.engine("mustache", mustacheExpress())
app.set("views", "./views")
app.set("view engine", "mustache")

const wordForGame = () => {
  return words[Math.floor(Math.random() * words.length)]
} //Coops

const hideTheWord = word => {
  return word
    .split("")
    .map(letter => {
      return (letter = "-")
    })
    .join("")
}

// let gameData = { COOPS!!!
//   wordForGame: wordForGame,
//   mysteryWord: mysteryWord
// }

app.get("/", (request, response) => {
  game = request.session
  let word = wordForGame()
  game.gameWord = word
  game.mysteryWord = hideTheWord(word)
  console.log(request.session.gameWord)
  response.render("home", game)
})

app.post("/attempt", (request, response) => {
  game = request.session
  game.attemptedLetter = request.body.letter //Coops
  response.render("home", game) //Coops
})

app.listen(3000, () => {
  console.log("Listening on port Agent 3000")
})
