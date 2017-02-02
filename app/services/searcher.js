const splitByWhitespace = str => str.split(' ')

const objectToArrayOfSplittedStrings = obj =>
  Object.keys(obj).map(k => [ k, splitByWhitespace(obj[k]) ])

const searchInData = (entities, req) =>
  entities.map(e => [ e[0], e[1].map(w => req.map(r => w.search(r))) ])

const simplifyFound = entities =>
  entities.map(e => [ e[0], e[1].map(a => a.reduce(((out, i) => i > -1 ? out + 1 : out), 0)) ])

const makeWeights = entities =>
  entities.map(e => [ e[0], e[1].reduce(((out, v, i) => out + (v / (i + 1))), 0) ])

const getSortedIds = entities =>
  entities.sort().reverse().filter(e => e[1] !== 0).map(e => e[0])

export default function search(data: { [key: string]: string }, request: string) {
  const requestWords = splitByWhitespace(request)
  const dataWords = objectToArrayOfSplittedStrings(data)
  const entities = searchInData(dataWords, requestWords)
  const simplyEntries = simplifyFound(entities)
  const weights = makeWeights(simplyEntries)
  const sortedIds = getSortedIds(weights)

  return sortedIds
}
