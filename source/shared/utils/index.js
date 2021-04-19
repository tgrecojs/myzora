import axios from 'axios'
import and from 'crocks/logic/and'
import isEmpty from 'crocks/predicates/isEmpty'

import Async from 'crocks/Async'
import Maybe from 'crocks/Maybe'
import alt from 'crocks/pointfree/alt'
import composeK from 'crocks/helpers/composeK'
import converge from 'crocks/combinators/converge'
import getProp from 'crocks/Maybe/getProp'
import liftA2 from 'crocks/helpers/liftA2'
import not from 'crocks/logic/not'

import map from 'crocks/pointfree/map'
import maybeToAsync from 'crocks/Async/maybeToAsync'
import objOf from 'crocks/helpers/objOf'
import isArray from 'crocks/predicates/isArray'
import isString from 'crocks/predicates/isString'

import safe from 'crocks/Maybe/safe'

const safeResponse = safe(and(isArray, not(isEmpty)))

// log :: String -> a -> a
const log = (label) => (x) => (console.log(`${label}:`, x), x)

const { fromPromise } = Async
const { Just } = Maybe
const dogsApi = 'https://dog.ceo/dog-api/breeds-list/all'
const httpGet = fromPromise(fetch)
const x = httpGet('https://dog.ceo/dog-api/breeds-list')
x
const Functor = (value) => ({
  value,
  map: (fn) => fn(value),
  toString: () => value.toString()
})

// propOr :: (String, a) -> b -> Maybe a
const propOr = (prop, def) => compose(alt(Just(def)), getProp(prop))

const compose = (...fns) => (initialValue) =>
  fns.reduceRight((val, fn) => fn(val), initialValue)

// helpers
const convertString = (char) => (x = '') => x.split(' ').join(char)
const hyphenateString = convertString('-')
const specialCharactersRegex = new RegExp(/[^a-zA-Z]/g)
const removeSpecialChars = (s) => s.replace(specialCharactersRegex, ' ')
const trim = (x) => x.trim()
// asyncGet :: URL -> Async Error Response
const asyncGet = fromPromise(axios.get)

// getData :: Response -> Async Error Object
const getData = maybeToAsync({}, propOr('data', {}))
// utility fns
const sanitizeString = compose(hyphenateString, trim, removeSpecialChars)

export { asyncGet, getData, safeResponse, sanitizeString }
