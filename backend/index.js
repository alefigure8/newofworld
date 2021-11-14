const PORT = process.env.PORT || 8000
const {chromium} = require('playwright')
const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// API
const getNews = async country => {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.goto(`https://news.google.com/search?q=${country}%20when%3A1d/`, {
    waitUntil: 'networkidle'
  })
  const title = await page.$$eval('h3.ipQwMb', elements =>
    elements.map(el => el.textContent.split('|')[0])
  )
  const link = await page.$$eval('a.DY5T1d', elements =>
    elements.map(el => el.href)
  )
  const img = await page.$$eval('img.tvs3Id ', elements =>
    elements.map(el => el.src)
  )
  await browser.close()
  return [{title, link, img}]
}

// ROUTE
app.get('/:country', async (req, res) => {
  const country = req.params.country
  const articles = await getNews(country)
  res.json(articles)
})

app.get('/', async (req, res) => {
  res.json({Home: 'Página de Noticias'})
})

app.listen(PORT, () => {
  console.log(`Server on port http://localhost:${PORT}`)
})
