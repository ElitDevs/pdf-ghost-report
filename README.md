# pdf-ghost-report

an open source solution for your nodejs reporting

[![Version npm](https://img.shields.io/npm/v/pdf-ghost-report)](https://www.npmjs.com/package/pdf-ghost-report) ![npm Downloads](https://img.shields.io/npm/dm/pdf-ghost-report) !['License'](https://img.shields.io/github/license/ElitDevs/pdf-ghost-report)

[![NPM](https://nodei.co/npm/pdf-ghost-report.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/pdf-ghost-report/)

![](images/pdf-ghost-report.png)

## Usage

```js
// example using express web framework
const express = require('express');
const { generatePdf } = require('pdf-ghost-report');
router = express.Router();
router.post('/getpdf', async (req, res, next) => {
  // step 01 : get template name
  const template_name = 'template_name';
  const data = req.body;
  // step 02 : call pdf making function by passing the template folder and name
  const config = {
    emulator: 'screen' || 'print',
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
  /**
   * args :
   *  templateFolderPath: string,
   *  templateFileName: string,
   *  templateExtension: string,
   *  config: object,
   *  data: object
   *
   * return stream
   * */
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
```

## config

[For more config Info check Puppeteer pdf section](https://pptr.dev/#?product=Puppeteer&version=v3.0.4&show=api-pagepdfoptions)

## Installation

```bash
npm install pdf-ghost-report
```

```bash
yarn add pdf-ghost-report
```

## Run Tests

- for now we haven't created any test

```bash
npm test
```

## Todo

    [ ] add tests
    [ ] add docker
    [ ] support more template engins like : `ejs, ...etc`

#### Author: [BARAKA LARBI -laridev-]
