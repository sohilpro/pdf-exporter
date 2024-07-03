import { delay } from './functions.js';

export async function renderHtmlToPdf( browser, html, development = false) {
  const page = await browser.newPage();
  if (development === true) {
    page.on('console', message => console.log( `${message.type().substr(0, 3).toUpperCase()} ${message.text()}`)).
    on('page-error', ({message}) => console.log(message)).
    on('response', response => console.log(`${response.status()} ${response.url()}`)).
    on('request-failed', request => console.log(`${request.failure().errorText} ${request.url()}`));
  }
  try {
    await page.setContent(html, {waitUntil: 'networkidle0', timeout: 120000});
  } catch (e) {
    console.log(e);
    return false;
  }

  await page.emulateMediaType('screen');
  await delay(2000);
  const pdf = await page.pdf({
    margin: { top: 30, right: 30, bottom: 30, left: 30 },
    preferCSSPageSize: true,
    omitBackground: false,
    printBackground: true,
    format: 'A4'
  });
  return pdf;
}

