var express = require('express');
var { generatePdf } = require('pdf-ghost-report');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/larbi', (req, res) => {
  res.send('heheh');
});

router.post('/getpdf', async (req, res, next) => {
  // step 01 : get template name
  const template_name = 'template_name';
  const data = req.body;
  console.log('req.body ', data);
  // step 02 : call pdf making function by passing the template folder and name
  const config = {
    printBackground: true,
    format: 'A4',
    margin: {
      top: '50px',
      bottom: '50px',
      left: '20px',
      right: '20px',
    },
    displayHeaderFooter: true,
  };
  const pdf = await generatePdf('templates', 'test', 'hbs', config, data);
  // // step 03 : return the blob pdf stream to the client
  res.writeHead(200, {
    'Content-Type': 'application/pdf',
    'Content-Disposition': `attachment; filename=${template_name}.pdf`,
    'Content-Length': pdf.length,
  });
  res.end(pdf);
});

module.exports = router;
