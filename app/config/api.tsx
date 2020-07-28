import { state, Question, Game } from './store'
import { token } from '../../token'
import { shuffle } from './utils'

const sanityClient = require('@sanity/client')

const client = sanityClient({
  projectId: 'xljurv9v',
  dataset: 'production',
  token: token,
  useCdn: false,
})

export async function createQuestion(question) {
  await client.create(question).then(res => {
    console.log(`Question was created with id ${res._id}`, res)
  })
}

export async function getQuestions(): Promise<Question[]> {
  const query = `*[_type == "question"]`

  return await client.fetch(query).then((questions: Question[]) => {
    return questions.map((q: Question, index: number) => {
      if (q.answer !== 0) return Object.assign({ _key: `${index}` }, q)
      else return
    })
  })
}

export async function replaceQuestion(index: number) {
  const questionToRemove = [`questions[${index}]`]

  const newQuestion =
    state.questions[Math.floor(Math.random() * state.questions.length)]

  await client
    .patch(state.game?._id)
    .unset(questionToRemove)
    .insert('after', `questions[${index - 1}]`, [newQuestion])
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

export async function createGame(numberOfQuestions: number, id: string) {
  const questions = await getQuestions()

  const shuffledQuestions = shuffle(questions).slice(0, numberOfQuestions)
  state.questions = questions

  const players = state.isPlaying
    ? [
        {
          _type: 'player',
          _key: `${0}`,
          name: 'Honz',
          isFinished: false,
          answers: [],
        },
      ]
    : []

  if (state.isPlaying) state.player = players[0]

  const game = {
    _type: 'game',
    gamename: id,
    questions: shuffledQuestions,
    players: players,
    isOpen: true,
    showQuestions: state.showQuestions,
  }

  await client.create(game).then((res: Game) => {
    console.log(`Game was created with name ${res.gamename}`, res)
    state.game = res
    if (state.isPlaying) state.player = res.players[0]
  })
}

export async function getGame(gamename: string) {
  console.log('gamename: ', gamename)
  const query = `*[_type == "game" && gamename == $gamename]`
  const params = { gamename: gamename }

  await client
    .fetch(query, params)
    .then((game: Game[]) => {
      if (!game[0].isOpen) {
        state.error = 'This game is closed'
        return
      }
      state.game = game[0]
    })
    .catch((err: Error) => {
      console.error('Oh no, the update failed: ', err.message)
    })

  subscription = await client.listen(query, params).subscribe(update => {
    state.game = update.result
    console.log('game updated')
  })
}

export async function listenToGameUpdates() {
  const query = `*[_type == "game"]`
  const params = { _id: state.game?._id }

  subscription = client.listen(query, params).subscribe(update => {
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
  if (!state.player) {
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
