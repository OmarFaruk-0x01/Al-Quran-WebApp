const Elements = {
    surah_loader: document.querySelector(
      "body > div.root > div.all-surah_div.open > div.loader"
    ),
    ayah_loader: document.querySelector("body > div.root > div.all-ayah_div > div.loader"),
    surahs: document.querySelector('.surahs'),
    ayahs: document.querySelector('.ayahs'),
    surah_select: document.querySelector('.search-no'),
    ayah_select: document.querySelector('#ayah-count'),
    bismillah: document.querySelector('.bismillah'),
    placeName: document.querySelector('.revulation-place'),
    ayah_count: document.querySelector('.ayah-count'),
    surah_name: document.querySelector('.surah-info > .name'),
    section_item: document.querySelector('.section-items'),
    all_ayah_play: document.querySelector('.all-play-btn')
  };
  // const proxy = 'https://thingproxy.freeboard.io/fetch/';
  // const proxy = 'https://alloworigin.com/get?url=';
  // const proxy = 'https://cors-anywhere.herokuapp.com/';
  // const proxy = 'http://www.whateverorigin.org/get?url=';
  const proxy = '';
  // const host = `http://api.quran.com:3000`;
  const host = `https://quran.com/api`;
  const tmpurl = `${host}/api/v3`;
  const url = `${proxy}${tmpurl}`;
  // console.log(url);
  const options = {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "include", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "accept-ranges": "bytes",
      "Access-Control-Allow-Origin": "http://127.0.0.1:5500/",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Methods": "OPTIONS, GET, POST, PUT, PATCH, DELETE, HEAD, LINK, UNLINK",
      "Access-Control-Allow-Headers": "Content-Type",
      // "Cache-Control:":"max-age=31536000"
    },
    // redirect: "follow", // manual, *follow, error
    // referrerPolicy: "no-referrer",
  }
  new ClipboardJS('.btn');
  
  
  