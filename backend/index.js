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
  // const title = await page.$$eval('h3.ipQwMb', elements =>
  //   elements.map(el => el.textContent.split('|')[0])
  // )
  // const link = await page.$$eval('a.DY5T1d', elements =>
  //   elements.map(el => el.href)
  // )
  await page.waitForSelector('img.tvs3Id', {
    waitFor: 'visible'
  })

  const img = await page.$$eval('img.tvs3Id ', elements =>
    elements.map(el => el.src).slice(0, 10)
  )

  const newsBody = await page.$$eval('div.NiLAwe', element => {
    return element
      .map(el => {
        const title = el.querySelector('div.xrnccd h3.ipQwMb')
        const link = el.querySelector('a').getAttribute('href')
        // const img = el.querySelector('img.tvs3Id')
        return {
          title: title.textContent,
          link: `https://news.google.com/${link}`
          // img: img
        }
      })
      .slice(0, 10)
  })

  for (let i = 0; i < newsBody.length; i++) {
    newsBody[i] = {
      ...newsBody[i],
      img: img[i]
    }
  }

  await browser.close()
  return newsBody
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
