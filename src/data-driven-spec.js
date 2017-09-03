const { isDataDriven, dataDriven } = require('.')
const la = require('lazy-ass')
const R = require('ramda')

/* eslint-env mocha */
describe('data-driven testing', () => {
  function isPrime (num) {
    for (var i = 2; i < num; i++) {
      if (num % i === 0) return false
    }
    return num > 1
  }

  it('detects data inputs', () => {
    const args = [isPrime, 1]
    la(isDataDriven(args))
    la(!isDataDriven(isPrime, 1))
    la(!isDataDriven(isPrime))
    la(!isDataDriven(isPrime, []))
  })

  it('computes values', () => {
    const results = dataDriven(isPrime, [1, 2, 3])
    const expected = {
      name: 'isPrime',
      behavior: [
        {
          given: 1,
          expect: false
        },
        {
          given: 2,
          expect: true
        },
        {
          given: 3,
          expect: true
        }
      ]
    }

    la(R.equals(results, expected))
  })
})
