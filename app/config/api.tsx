import { state, Question, Game } from './store'
import { token } from '../../token'
import { shuffle, capitalise } from './utils'

const sanityClient = require('@sanity/client')

const client = sanityClient({
  projectId: 'xljurv9v',
  dataset: 'production',
  token: token,
  useCdn: false,
})

export async function createQuestion(question: Question) {
  state.isLoading = true
  await client.create(question).then(res => {
    console.log(`Question was created with id ${res._id}`, res)
    state.isLoading = false
  })
}

function validateQuestion(question: Question) {
  return (
    typeof question.title === 'string' && typeof question.answer === 'number'
  )
}

export async function getQuestions(): Promise<Question[]> {
  const query = `*[_type == "question"]`
  state.isLoading = true

  const filteredQuestions = await client
    .fetch(query)
    .then((questions: Question[]) => {
      return questions.filter((q: Question) => {
        if (q.answer === 0 || !validateQuestion(q)) return
        else return q
      })
    })

  state.isLoading = false

  return filteredQuestions
}

export async function replaceQuestion(index: number) {
  const questionToRemove = [`questions[${index}]`]

  const newQuestion =
    state.questions[Math.floor(Math.random() * state.questions.length)]

  await client
    .patch(state.game?._id)
    .unset(questionToRemove)
    .insert('before', `questions[${index}]`, [newQuestion])
    .commit()
    .then((updatedGame: Game) => {
      console.log(`question replaced`)
      state.game = updatedGame
    })
}

export async function removeQuestion(id: string) {
  await client
    .delete(id)
    .then(res => {
      console.log('question deleted')
    })
    .catch(err => {
      console.error('question failed: ', err.message)
    })
}

let subscription

export async function stopListening() {
  subscription.unsubscribe()
}

export async function createGame(numberOfQuestions: number, gameName: string) {
  const questions = await getQuestions()

  let shuffledQuestions = shuffle(questions).slice(0, numberOfQuestions)
  state.questions = questions
  state.isLoading = true

  const players = state.isPlaying
    ? [
        {
          _type: 'player',
          _key: `${0}`,
          name: state.player?.name || '',
          isFinished: false,
          answers: [],
        },
      ]
    : []

  if (state.isPlaying) state.player = players[0]

  const game = {
    _type: 'game',
    gamename: gameName,
    questions: shuffledQuestions,
    players: players,
    isOpen: true,
    showQuestions: state.showQuestions,
    language: state.selectedLanguage,
    showAllScores: state.showAllScores,
  }

  await client
    .create(game)
    .then((res: Game) => {
      console.log(`Game was created with name ${res.gamename}`)
      state.displayGameName = beautifyGamename(res.gamename)
      state.game = res
      state.isLoading = false
      state.isTranslated = res.language !== 'en'

      if (state.isPlaying) state.player = res.players[0]
    })
    .catch((e: Error) => {
      console.log('couldnt create game', e.message)
    })

  const query = `*[_type == "game"]`
  const params = { _id: state.game?._id }

  subscription = client.listen(query, params).subscribe(update => {
    console.log('game live updated')
    state.game = update.result
  })
}

export async function getGame(gamename: string) {
  const uglyGamename = uglifyGamename(gamename)

  const query = `*[_type == "game" && gamename == $gamename]`
  const params = {
    gamename: uglyGamename,
  }

  state.displayGameName = uglyGamename

  await client
    .fetch(query, params)
    .then((game: Game[]) => {
      if (!game[0].isOpen) {
        state.error = 'This game is closed'
        return
      }
      console.log(`got game with gamename ${game[0].gamename}`)
      state.game = game[0]
      state.isTranslated = game[0].language !== 'en'
    })
    .catch((err: Error) => {
      console.error('Oh no, the update failed: ', err.message)
    })

  subscription = client.listen(query, params).subscribe(update => {
    console.log('game live updated')
    state.game = update.result
  })
}

export async function getNewestGame() {
  const query = `*[_type == "game"] | order(_createdAt desc)`

  await client
    .fetch(query)
    .then((games: Game[]) => {
      console.log('game: ', games[0].gamename)
      state.game = games[0]
      state.isTranslated = games[0].language !== 'en'

      state.displayGameName = games[0].gamename
        .split('-')
        .map(w => capitalise(w))
        .join(' ')
    })
    .catch((err: Error) => {
      console.error('Oh no, the update failed: ', err.message)
    })

  const params = { _id: state.game?._id }

  subscription = client.listen(query, params).subscribe(update => {
    console.log('game live updated')
    state.game = update.result
  })
}

export function listenToGameUpdates() {
  const query = `*[_type == "game"]`
  const params = { _id: state.game?._id }

  subscription = client.listen(query, params).subscribe(update => {
    console.log('game live updated')
    state.game = update.result
  })
}

export async function readyGame() {
  client
    .patch(state.game?._id)
    .set({
      isReady: true,
    })
    .commit()
    .then((updatedGame: Game) => {
      console.log(`game updated, now ready to play`)

      state.game = updatedGame
    })
}

export async function inactivateGame() {
  client
    .patch(state.game?._id)
    .set({
      isOpen: false,
    })
    .commit()
    .then((updatedGame: Game) => {
      console.log(`game closed`)

      state.game = updatedGame
    })
}

export async function addPlayer(name: string) {
  if (state.player?.name !== name) {
    const newPlayer = {
      _type: 'player',
      _key: `${Math.random()}`,
      name: name,
      isFinished: false,
      answers: [],
    }

    state.player = newPlayer
  }

  await client
    .patch(state.game?._id)
    .insert('after', 'players[-1]', [state.player])
    .commit()
    .then((updatedGame: Game) => {
      console.log(
        `game updated, now ${updatedGame.players.length} players playing`
      )

      state.game = updatedGame
    })
    .catch(e => {
      console.log('e: ', e.message)
    })
}

export function submitAnswers(answers: number[]) {
  const players = state.game?.players.map(player => {
    if (player.name === state.player?.name) {
      player.answers = answers
      player.isFinished = true
    }
    return player
  })

  client
    .patch(state.game?._id)
    .set({
      players: players,
    })
    .commit()
    .then((updatedGame: Game) => {
      console.log(`answers submitted`)

      state.game = updatedGame
    })
}

function beautifyGamename(gamename: string) {
  return gamename
    .split('-')
    .map(g => capitalise(g))
    .join(' ')
}

function uglifyGamename(gamename: string) {
  return gamename
    .split(' ')
    .map(g => g.toLowerCase())
    .join('-')
}
