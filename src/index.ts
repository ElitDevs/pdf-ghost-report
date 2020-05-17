import * as fs from 'fs-extra';
import * as puppeteer from 'puppeteer';
import handlebars from 'handlebars';
import path from 'path';

interface configInterface {
  emulator: any;
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
  const content = await compile(template, []);

  await page.setContent(content);

  await page.emulateMediaType(config.emulator || 'screen');

  // const pdf = await page.pdf({
  //       config.pdfOptions
  // })

  return 'pdf generator';
};
