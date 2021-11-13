const { chromium } = require('playwright');
const express = require('express')
const app = express()

const PORT = process.env.PORT || 8000;


const apiStart = async (country) => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(`https://news.google.com/search?q=${country}/`, { waitUntil: 'networkidle' });
  const title = await page.$$eval('h3.ipQwMb',  elements => elements.map(el => el.textContent.split('|')[0]))
  const link = await page.$$eval('a.DY5T1d',  elements => elements.map(el => el.href))
 const img = await page.$$eval('img.tvs3Id ',  elements => elements.map(el => el.src))
  //await articles.push({title, link, img})
  await browser.close();
  return [title, link, img]
};

app.get("/:country", async (req, res) => {
    const country = req.params.country
    const articles = await apiStart(country)
    res.json(articles);
});

app.listen(PORT, () => {
    console.log(`Server on port http://localhost:${PORT}`);
});