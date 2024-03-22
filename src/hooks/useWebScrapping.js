import axios from 'axios';
const cheerio = require('cheerio');
// import { JSDOM } from 'jsdom';

export const useWebScrapping = () => {
  async function fetchPage(url) {
    const HTMLData = await axios
      .get(url)
      .then((res) => res.data)
      .catch((error) => {
        console.error(`There was an error with ${error.config?.url}.`);
        console.error(error.toJSON());
      });
    // console.log("HTMLData", HTMLData);
    return HTMLData;
  }

  async function fetchFromWebOrCache(url) {
    const HTMLData = await fetchPage(url);
    const posts = [];
    const $ = cheerio.load(HTMLData);
    $('a').each((i, link) => {
      const href = $(link).attr('href'); // Obtiene el atributo href
      const text = $(link).text(); // Obtiene el texto del enlace
      if (href.startsWith('/tx/')) {
        posts.push({
          title: text,
          url: href,
          txId: href.split('/')[2],
        });
      }
    });
    return posts;
    // const HTMLData = await fetchPage(url);
    // const dom = new JSDOM(HTMLData);
    // // console.log('dom',dom);
    // return dom.window.document;
  }

  /*function extractData(document) {
    const txLinks = Array.from(document.querySelectorAll('a')).filter((link) =>
      link.href.startsWith('/tx/')
    );
    console.log('txLinks', txLinks);

    return txLinks.map((link) => {
      return {
        title: link.text,
        url: link.href,
        txId: link.href.split('/')[2],
      };
    });
  }*/

  async function getData() {
    const document = await fetchFromWebOrCache(
      'https://testnet.explorer.perawallet.app/tx-group/Skw8yXK8eYnslxuEmut2ZbbyVz68m2wiuNJLmm8Q05Q=/',
      true // Hacker News is always changing, so ignore the cache!
    );
    const data = document;
    // const data = extractData(document);
    console.log(data);
    return data;
  }

  return { getData };
};
