import { state, Question, Game } from './store'
import humanId from 'human-id'

const sanityClient = require('@sanity/client')

const client = sanityClient({
  projectId: 'xljurv9v',
  dataset: 'production',
  token:
    'skKJilwSJxaDMSA7aIqmY7chPTbC0HwNEqRFgew8q5jAqb5sarE64ptaI9Y8gtlBFiwcgd0OMQs08bsyt0NCeBnmyTJmp0nmSe1Vn945ymdSNhdY6JJc0UJmAPGvaVxskyNLKGVpUmH69Gfbr4AhxgQg0njTlk8wLeBXt5CDkLFtysFKhcVR',
  useCdn: false,
})

export async function getQuestions(numberOfQuestions: number) {
  const query = `*[_type == "question"] | order(_createdAt asc)[0..${numberOfQuestions}]`

  await client.fetch(query).then((questions: Question[]) => {
    state.questions = questions.map((q: Question, index: number) =>
      Object.assign({ _key: `${index}` }, q)
    )
  })
}

let subscription

export async function stopListening() {
  subscription.unsubscribe()
}

export async function createGame(
  numberOfQuestions: number,
  isPlaying: boolean,
  id: string
) {
  await getQuestions(numberOfQuestions)

  const players = isPlaying
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
    questions: state.questions,
    players: players,
  }

  await client.create(game).then((res: Game) => {
    console.log(`Game was created with name ${res.gamename}`, res)
    state.game = res
    if (players.length > 0) state.player = res.players[0]
  })
}

export async function getGame(gamename: string) {
  const query = `*[_type == "game" && gamename == $gamename]`
  const params = { gamename: gamename }

  await client.fetch(query, params).then((game: Game) => {
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
      console.log(`game updated`, updatedGame)

      state.game = updatedGame
    })
}
