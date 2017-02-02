import test from 'ava'
import search from '../../app/services/searcher'
// import search from 'services/searcher'

const searchIndex = {
  '0e': 'zero',
  '1e': 'title one',
  '2e': 'title two',
  '3e': 'title three',
  '4e': 'titles some marker',
  '5e': 'titles marker'
}

test('search by partial-word', t => {
  t.deepEqual(
    search(searchIndex, 'marker titl'),
    [ '5e', '4e', '3e', '2e', '1e' ])
})
