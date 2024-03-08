const http = require('http')
const fs = require('fs');
const url = require("url");
const replaceTemplate = require('./modules/replaceTemplate.js');

let overviewTemplate = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8')
const productTemplate = fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8')
const cardTemplate = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8')
const data = fs.readFileSync(`${__dirname}/data.json`);
const dataObj = JSON.parse(data);



const server = http.createServer((req, res) => {
    let curOverviewTemplate;
    if (req.url === '/' || req.url === '/overview') {
        res.writeHead(200, {
            'Content-Type': 'text/html',
        })

        const cardsHTML = dataObj.map(el => replaceTemplate(cardTemplate,el)).join('')
        curOverviewTemplate = overviewTemplate.replace(/{%PRODUCT_CARDS%}/g, cardsHTML);
        res.end(curOverviewTemplate);
    }

    if (req.url.includes('/product')){
        const {id} = url.parse(req.url, true).query;
        const productsHTML = replaceTemplate(productTemplate,dataObj[id]);
        curOverviewTemplate = overviewTemplate.replace(/{%PRODUCT_CARDS%}/g, productsHTML)
        res.end(curOverviewTemplate);
    }

});

server.listen(3000, () => {
    console.log('SERVER STARTED!!!')
});

