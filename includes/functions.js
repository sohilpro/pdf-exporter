import fs from 'fs';

export async function delay(delayInMs) {
  return new Promise(resolve => setTimeout(resolve, delayInMs));
}

export async function injectDataToTemplate(templatePath, dataArray) {
  let html = fs.readFileSync(templatePath, 'utf-8');
  const promises = dataArray.map(async ({key, value}) => { html = html.replaceAll(key, value) });
  await Promise.all(promises);
  return html;
}