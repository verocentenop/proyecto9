puppeteer = require('puppeteer')
const fs = require('fs')

const scrap = async (url) => {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  await page.goto(url)
  await page.setViewport({ width: 1180, height: 700 })

  await page.waitForSelector('#onetrust-reject-all-handler')
  const cookies = await page.$('#onetrust-reject-all-handler')

  if (cookies) {
    await cookies.click()
  }

  const arrayProducts = []
  await repeat(page, arrayProducts)

  console.log(arrayProducts)
}

const repeat = async (page, arrayProducts) => {
  await page.waitForSelector('.plp-fragment-wrapper')
  const products = await page.$$('.plp-fragment-wrapper')

  for (const product of products) {
    const img = await product.$eval('.plp-product__image', (e) => e.src)  //este selector que antes iba bien y que no he tocado, ha comenzado a fallar de repente. 
    //da este error failed to find element matching selector ".plp-image.plp-product__image" no lo entiendo porque iba bien. Aunque da ese fallo, recoge los datos que ves en el .json.
    
    
    const name = await product.$eval(
      '.notranslate.plp-price-module__product-name',
      (e) => e.textContent
    )
    const description = await product.$eval(
      '.plp-price-module__description',
      (e) => e.textContent
    )
    const price = await product.$eval('.plp-price__integer', (e) =>
      e.textContent.trim()
    )

    if (!arrayProducts.some((p) => p.name === name)) {
      const info = { img, name, description, price }
      arrayProducts.push(info)

      fs.writeFile('./products.json', JSON.stringify(arrayProducts), () => {
        console.log('datos copiados')
      })
    }
  }
  const moreProducts = await page.$(
    '.plp-btn.plp-btn--small.plp-btn--secondary'
  )
  if (moreProducts) {
    await moreProducts.click()
    await repeat(page, arrayProducts)
  }
}
scrap('https://www.ikea.com/es/es/cat/sillones-chaise-longues-puffs-fu006/')
