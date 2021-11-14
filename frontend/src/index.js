import {getNews} from './api.js'

const newsBtn = document.getElementById('btn-news')
const inputNews = document.getElementById('input-news')

newsBtn.addEventListener('click', async e => {
  e.preventDefault()
  const formValue = inputNews.value
  const data = await getNews(formValue)
  const contentNews = document.getElementById('ulNews')
  const news = await data[0].title
    .map(
      each =>
        `
        <li>${each}</li>
        `
    )
    .join('\n')
  contentNews.innerHTML = news
})
