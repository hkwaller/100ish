async function getData() {
  const data = await fetch('https://jservice.io/api/random?count=100')
  const parsed = await data.json()

  let answerIsNumber = []

  parsed.map(p => {
    if (/^\d+$/.test(q.answer)) {
      answerIsNumber.push(p)
    }
  })

  return answerIsNumber
}
