import { getNews } from './api.js';

console.log('Hola desde index.js')

const btn_news = document.getElementById('btn-news')
const inputNews = document.getElementById('input-news')

btn_news.addEventListener('click', async (e) => {
    e.preventDefault();
    const formValue = inputNews.value;
    const data = await getNews(formValue)
    const contentNews = document.getElementById('ulNews')
    const news = await data[0].title.map(each=>
        `
        <li>${each}</li>
        `
        ).join('\n')
    contentNews.innerHTML = news
})