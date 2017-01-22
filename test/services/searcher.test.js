import test from 'ava'
import search from '../../app/services/searcher'
// import search from 'services/searcher'

const searchIndex = {
  0: 'zero',
  1: 'title one',
  2: 'title two',
  3: 'title three',
  4: 'titles some marker',
  5: 'titles marker'
}

test('search service', t => {
  t.deepEqual(
    search(searchIndex, 'title marker'),
    [ [ 0, 0 ], [ 1, 1 ], [ 2, 1 ], [ 3, 1 ], [ 4, 1.3333333333333333 ], [ 5, 1.5 ] ])
})
