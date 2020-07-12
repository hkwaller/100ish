import { state, Question, Game } from './store'

const sanityClient = require('@sanity/client')

const client = sanityClient({
  projectId: 'xljurv9v',
  dataset: 'production',
  token:
    'sk2A6pJ15FD0CaF7pIFY9pC4Ffp02B2Ccz9TtMwXZepk836Ux3jRRVlG1iMKqV9wZ3T2k1XbcRXvFQnVJYZ2lMqWBFjUS8i9Nxjs2tdxQJsCRfzHbJGbIJYHdKznaXwLdQ7ep2fVKJLtsyCNnwpAs1EONrBqiprZxii1howIgc1CXjIouN5s', // or leave blank to be anonymous user
  useCdn: false,
})

export function getQuestions(numberOfQuestions: number) {
  const query = `*[_type == "question"] | order(_createdAt asc)[0..${numberOfQuestions}]`

  client.fetch(query).then((questions: Question[]) => {
    console.log('questions: ', questions)
    state.questions = questions
  })
}

export async function getGame(id: string) {
  const query = `*[_type == "game"]`
  const params = { _id: id }

  client.fetch(query, params).then((game: Game) => {
    state.game = game[0]
  })

  const subscription = client.listen(query, params).subscribe(update => {
    state.game = update.result
  })
}
