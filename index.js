const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const getLink = require('./getlink');

getLink.getCookieCsrf().then(() => {
  app.set('view engine', 'ejs');
  app.use(express.static('public'));

  app.use(bodyParser.urlencoded({ extended: false }));

  app.use(bodyParser.json());

  app.get('/', (req, res) => {
    res.render('home');
  });

  app.post('/', (req, res) => {
    const linkFS = req.body.link;
    getLink
      .getLink(linkFS)
      .then(linkDownload => {
        console.log(`Link download: ${JSON.stringify(linkDownload)}`);
        res.json(linkDownload);
      })
      .catch(err => {
        console.log(`Get link error: ${JSON.stringify(err)}`);
        res.send(err);
      });
  });
  app.listen('9000','0.0.0.0',()=>{
      console.log("server is listening on 9000 port");
  })
});
