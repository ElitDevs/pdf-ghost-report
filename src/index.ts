import * as fs from 'fs-extra';
import * as puppeteer from 'puppeteer';
import handlebars from 'handlebars';
import path from 'path';

interface configInterface {
  emulator?: any;
  displayHeaderFooter?: boolean | undefined;
  headerTemplate?: string | undefined;
  footerTemplate?: string | undefined;
  printBackground?: boolean | undefined;
  format?: any;
  margin?: marginInterface;
  scale?: number | undefined;
  landscape?: boolean | undefined;
  pageRanges?: string | undefined;
  width?: string | number | undefined;
  height?: string | number | undefined;
  preferCSSPageSize?: boolean | undefined;
}
interface marginInterface {
  top?: string | number | undefined;
  bottom?: string | number | undefined;
  left?: string | number | undefined;
  right?: string | number | undefined;
}

const compile = async (template: string, data: []) => {
  const filePath = path.join(process.cwd(), template);
  const html = await fs.readFile(filePath, 'utf-8');
  return handlebars.compile(html)(data);
};

export const generatePdf = async (
  templateFolderPath: string,
  templateFileName: string,
  templateExtension: string,
  config: configInterface,
  data: []
) => {
  const template: string = `${templateFolderPath}/${templateFileName}.${templateExtension}`;
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  let content;
  if (templateExtension === 'hbs' || templateExtension === '.hbs') {
    content = await compile(template, []);
  } else {
    return 'this module only support hbs compilation only for now !!';
  }

  await page.setContent(content);
  await page.emulateMediaType(config.emulator || 'screen');

  const pdf = await page.pdf({
    displayHeaderFooter: config.displayHeaderFooter,
    headerTemplate: config.headerTemplate,
    footerTemplate: config.footerTemplate,
    printBackground: config.printBackground,
    format: config.format,
    margin: config.margin,
    scale: config.scale,
    landscape: config.landscape,
    pageRanges: config.pageRanges,
    width: config.width,
    height: config.height,
    preferCSSPageSize: config.preferCSSPageSize,
  });

  await browser.close();
  return pdf;
};
