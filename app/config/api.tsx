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

export async function getQuestions(
  numberOfQuestions: number
): Promise<Question[]> {
  const query = `*[_type == "question"] | order(_createdAt asc)[0..${numberOfQuestions -
    1}]`

  return await client.fetch(query).then((questions: Question[]) => {
    return questions.map((q: Question, index: number) =>
      Object.assign({ _key: `${index}` }, q)
    )
  })
}

export async function replaceQuestion(index: number) {
  const questionToRemove = [`questions[${index}]`]

  const query = `*[_type == "question"] | order(_createdAt desc)[0..1]`

  const newQuestion = await client
    .fetch(query)
    .then((questions: Question[]) => {
      return questions[0]
    })

  await client
    .patch(state.game?._id)
    .unset(questionToRemove)
    .insert('after', `questions[${index - 1}]`, [
      { _key: Math.random(), ...newQuestion },
    ])
    .commit()
    .then((updatedGame: Game) => {
      console.log(`question replaced`)

      state.game = updatedGame
    })
}

let subscription

export async function stopListening() {
  subscription.unsubscribe()
}

export async function createGame(numberOfQuestions: number, id: string) {
  const questions = await getQuestions(numberOfQuestions)

  const shuffledQuestions = shuffle(questions).slice(0, numberOfQuestions)

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
  const query = `*[_type == "game" && gamename == $gamename]`
  const params = { gamename: gamename }

  await client.fetch(query, params).then((game: Game[]) => {
    if (!game[0].isOpen) return 'no can do'
    state.game = game[0]
  })

  subscription = await client.listen(query, params).subscribe(update => {
    state.game = update.result
    console.log('game updated', update.result)
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
      console.log(`game updated, now ready to play`, updatedGame)

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
      console.log(`game closed`, updatedGame)

      state.game = updatedGame
    })
}

export async function addPlayer() {
  const newPlayer = {
    _type: 'player',
    _key: `${Math.random()}`,
    name: 'Hannes',
    isFinished: false,
    answers: [],
  }

  state.player = newPlayer

  await client
    .patch(state.game?._id)
    .insert('after', 'players[-1]', [newPlayer])
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
      console.log(`answers submitted`, updatedGame)

      state.game = updatedGame
    })
}
