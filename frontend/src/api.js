import {apiUrl} from './config.js'

export async function getNews(value) {
  const result = await fetch(apiUrl + '/' + value)
  const data = await result.json()
  return data
}
