// const nextPageUrl = await page.evaluate((config) => {
//   const nextButton = document.querySelector(config.nextPageSelector)
//   return nextButton ? nextButton.href || nextButton.getAttribute('href') : null
// }, config)
// if (nextPageUrl) {
//   currentPageUrl = nextPageUrl
//   try {
//     console.log(`Avanzando a la siguiente página...`)
//     await page.goto(currentPageUrl, {
//       waitUntil: 'networkidle2',
//       timeout: 90000
//     })
//     await page.waitForSelector(config.productItemSelector, {
//       timeout: 10000
//     })
//   } catch (error) {
//     console.error('Error al navegar a la siguiente página:', error.message)
//     hasNextPage = false
//   }
// } else {
//   console.log('No hay más páginas.')
//   hasNextPage = false
// }

// await browser.close()

// puppeteer = require('puppeteer')
// const fs = require('fs')

// const scrap = async (url) => {
//   const browser = await puppeteer.launch({ headless: false })
//   const page = await browser.newPage()
//   await page.goto(url)
//   await page.setViewport({ width: 1180, height: 700 })

//   await page.waitForSelector('#onetrust-reject-all-handler')
//   const cookies = await page.$('#onetrust-reject-all-handler')

//   if (cookies) {
//     await cookies.click()
//   }

//   const arrayProducts = []
//   await repeat(page, arrayProducts)

//   console.log(arrayProducts)
// }

// const repeat = async (page, arrayProducts) => {
//   await page.waitForSelector('.plp-fragment-wrapper')
//   const products = await page.$$('.plp-fragment-wrapper')

//   for (const product of products) {
//     const img = await product.$eval('img.plp-product__image', (e) => e.src)
//     const name = await product.$eval(
//       '.notranslate.plp-price-module__product-name',
//       (e) => e.textContent
//     )
//     const description = await product.$eval(
//       '.plp-price-module__description',
//       (e) => e.textContent
//     )
//     const price = await product.$eval(
//       '.plp-price__integer',
//       (e) => e.textContent
//     )

//     const info = { img, name, description, price }
//     arrayProducts.push(info)

//     const moreProducts = await page.$(
//       '.plp-btn.plp-btn--small.plp-btn--secondary'
//     )

//     fs.writeFile('./products.json', JSON.stringify(arrayProducts), () => {
//       console.log('datos copiados')
//     })

//     if (moreProducts) {
//       await moreProducts.click()
//       await repeat(page, arrayProducts)
//     }
//   }
// }

// scrap('https://www.ikea.com/es/es/cat/velas-accesorios-10760/')
