let localStorage = window.localStorage;
let currentSrc = 0

window.addEventListener("load", () => {
  Elements.surah_select.innerHTML = "";
  loadAllSurah().then((data) => {
    showAllSurah(data.chapters);
    loadSurahInSelect(data.chapters);
  });
  showBookmark();
});

function afterClickDefaults(id, name, mean, count, place, ishaveBismillah) {
  if (ishaveBismillah) {
    Elements.bismillah.style.display = "block";
  } else {
    Elements.bismillah.style.display = "none";
  }
  Elements.all_ayah_play.style.display = "flex";
  Elements.placeName.innerHTML = `<span>${place}</span>`;
  Elements.surah_name.innerHTML = `<h2>${name}</h2> <p>${mean}</p>`;
  Elements.ayah_count.innerHTML = `<span>Verses:</span> ${count}`;
  Elements.surah_select.childNodes.forEach((node) => {
    if (node.value == id) {
      node.setAttribute("selected", "");
      // console.log('select')
    } else {
      node.removeAttribute("selected");
    }
    // console.log(node);
  });
  Elements.ayah_select.style.opacity = "1";
  document.querySelector('[for=ayah-count]').style.opacity = "1";
}

function surahClick(surah) {
  // Elements.surahs.closest(".all-surah_div").classList.toggle("selected");
  Elements.ayah_select.innerHTML = "";
  currentSrc = 0;
  activeSurah(surah.id);
  afterClickDefaults(
    surah.id,
    surah.name_simple,
    surah.translated_name.name,
    surah.verses_count,
    surah.revelation_place,
    surah.bismillah_pre
  );

  loadAllAyah(surah.id).then(({ verses }) => {
    showAllAyah(verses);
  });
}


function ayah_click(event) {
  const element = event.target;
  const ayah = element.closest(".ayah");
  if (element.classList.contains("play")) {
   
    const audio_ayah = element.closest(".ayah").dataset.audio;
    ayah.querySelector(".loader").style.display = "flex";
   
     playAyah(audio_ayah,() => {
      ayah.querySelector(".loader").style.display = "none";
      ayah.querySelector(".pause").style.display = "inline";
      ayah.querySelector(".play").style.display = "none";
    });

  } else if (element.classList.contains("pause")) {
    audio_ayah.pause();
    // console.log('push')
    ayah.querySelector(".pause").style.display = "none";
    ayah.querySelector(".play").style.display = "inline";
  } else if (element.classList.contains("copy")) {
    const ayah = element.closest(".ayah");
    copyToClipBoard(ayah);
  } else if (element.classList.contains("arabic")) {
    const span = event.target;
    ayah.querySelector(".loader").style.display = "flex";
    playAyah(span.dataset.audio, () => {
      ayah.querySelector(".loader").style.display = "none";
    });
  } else if (element.classList.contains("bookmark-btn")) {
    bookmarkBtnClick(element.closest(".ayah"));
  } else if (element.classList.contains("fav-btn")) {
    bookmarkBtnClick(element.closest(".ayah"));
  }
}
function show1ayah(ayah, index) {
  const { verse_number, verse_key, audio, translations, words } = ayah;
  let p = "";
  let en_p = "";
  let bn_p = "";
  words.forEach((word) => {
    let { text_madani, char_type, audio, transliteration, translation } = word;
    if (text_madani == "") {
      text_madani = " ";
    }
    // console.log(word);
    if (char_type != "end") {
      const span = `<span class="arabic" data-audio="${
        audio.url == null ? "" : audio.url
      }" data-trans_bn="${ translation == null ? "" : translation.text}" data-trans_en="${
        transliteration == null ? "" : transliteration.text
      }">${text_madani} </span>`;

      p += span;

      const en_span = `<span data-trans_ar="${text_madani}"> ${
        transliteration == null ? " " : transliteration.text + " "
      } </span>`;

      en_p += en_span;

      // const bn_span =  `<span data-trans_ar="${text_madani}"> ${(translation == null) ? ' ':translation.text + " "} </span>`

      // bn_p += bn_span
    }
  });

  const markup = `<div class="ayah" id="${verse_key}" data-audio="${audio.url}">
  <span class="ayah-number">${verse_key}</span>
  <div class="loader">
    <span><i class="icon ico-spinner"></i></span>
  </div>
  <textarea name="hide" id="bar" cols="1000000" rows="100000" style="display: block; visibility: hidden; width: 0; height: 0; padding: 0; margin: 0; border :0;">asdasd</textarea>
  <ul class="btns">
    <li class="btn play">
      <span><i class="icon ico-play"></i></span>
      Play
    </li>
    <li class="btn copy" data-clipboard-action="copy" data-clipboard-target="#bar">
      <span><i class="icon ico-copy"></i></span>
      Copy
    </li>
  </ul>
  <div class="arabic-text">
  <p>
    ${p}
  </p>
<span class="verse_number" data-key="${verse_key}">(${verse_number})</span>
</div>
  <div class="bangla-text">
    <h4 class="head">বাংলা</h4>
    <p>${translations[0].text}</p>
    <!-- <p>${bn_p}</p> --> 
  </div>
  <div class="english-text">
    <h4 class="head">Transliteration</h4>
    <p>
    ${en_p}
    </p>
  </div>
  <ul class="social-icons">
    <li class="icons bookmark-btn" >
     
       
      <i class="icon ico-heart"></i>
     
    </li>
    <li class="icons">
      <i class="icon ico-facebook"></i>
    </li>
    <li class="icons">
      <i class="icon ico-twitter"></i>
    </li>
    <li class="icons">
      <i class="icon ico-instagram"></i>
    </li>
  </ul>
</div>`;

  Elements.ayahs.insertAdjacentHTML("beforeend", markup);
  Elements.ayahs.childNodes[index].addEventListener("click", ayah_click);
  checkBookmark(Elements.ayahs.childNodes[index]);
}

function showAllAyah(ayah_list) {
  // startloder('ayah')
  ayah_list.forEach((ayah, index) => {
    show1ayah(ayah, index);
    loadAyahInSelect(ayah);
  });
  stoploder("ayah");
  Elements.surahs.style.cursor = "default";
}

async function loadAllAyah(surah_Id) {
  startloder("ayah");
  Elements.surahs.style.cursor = "none";
  // console.log(Elements.surahs)
  try {
    const resp = await fetch(
      `${url}/chapters/${surah_Id}/verses?recitation=7&translations=24&language=bn&text_type=words&limit=286`,
      options
    );
    // const resp2 = await fetch(`${url}/chapters/${surah_Id}/verses?recitation=5&translations=20&language=bn&text_type=words&limit=286`);
    if (!resp.ok) {
      throw new Error(`HTTP error! status: ${resp.status}`);
    }
    const data = await resp.json();

    // stoploder("ayah");

    for (let count = 2; count <= data.pagination.total_pages; ++count) {
      // console.log("start");
      let tmpresp = await fetch(
        `${url}/chapters/${surah_Id}/verses?recitation=5&translations=24&language=bn&text_type=words&limit=286&page=${count}`,
        options
      );
      let tmpData = await tmpresp.json();
      data.verses.push(...tmpData.verses);
    }
    // console.log(data, 'data')
    return data;
  } catch (e) {
    stoploder("ayah");
    alert(e);
  }
}

function loadAyahInSelect({ verse_key, verse_number }) {
  // console.log(verse_key);
  const markup = `<option value="${verse_key}">${verse_number}</option>`;
  Elements.ayah_select.insertAdjacentHTML("beforeend", markup);
  // list.forEach(({verse_key}) => {
  // })
}

function showAllSurah(surahList) {
  Array.from(surahList).forEach((surah, index) => {
    const markup = `<div class="surah" id="${surah.chapter_number}" data-name="${surah.name_simple}" data-r_place="${surah.revelation_place}" data-v_count="${surah.verses_count}" data-isHaveBismillah=${surah.bismillah_pre}>
        <div class="surah-plane_text">
          <span class="surah_number">${surah.chapter_number}</span>
          <div class="surah-title">
            <h2 class="surah-name">${surah.name_simple}</h2>
            <p class="surah-meaning">${surah.translated_name.name}</p>
          </div>
        </div>
        <div class="arabic-name">
            ${surah.name_arabic}
        </div>
      </div>`;
    Elements.surahs.insertAdjacentHTML("beforeend", markup);
    Elements.surahs.childNodes[index].addEventListener("click", () =>
      surahClick(surah)
    );
  });
}

function loadSurahInSelect(list) {
  list.forEach(({ id, name_simple }) => {
    const markup = `<option value="${id}">${id}.${name_simple}</option>`;
    Elements.surah_select.insertAdjacentHTML("beforeend", markup);
  });
}
async function loadAllSurah() {
  startloder("surah");
  try {
    const resp = await fetch(`${url}/chapters`, options);
    if (!resp.ok) {
      throw new Error(`HTTP error! status: ${resp.status}`);
    }
    const data = await resp.json();

    stoploder("surah");
    return data;
  } catch (e) {
    stoploder("surah");
    alert(e);
  }
}

let audio = new Audio();



const loader = Elements.all_ayah_play.querySelector(".loader");


  
audio.addEventListener("ended", (ended) => {
  const ayahs = Array.from(Elements.ayahs.children);
  
  if (document.querySelector('.bismillah').style.display != "none"){
    ayahs.unshift(document.querySelector('.bismillah'))
  }
   
  currentSrc = currentSrc + 1 ;
  // console.log(currentSrc)
  if (currentSrc < ayahs.length){
    audio.src = ayahs[currentSrc].dataset.audio;  
    audio.play().then((data) => {
      loader.style.display = "none";
    });
    scrollToTop(ayahs[currentSrc])
  }
  if (currentSrc === ayahs.length){
    Elements.all_ayah_play.children[1].classList.replace("ico-pause", "ico-play");
    currentSrc = 0
  }
});

Elements.all_ayah_play.addEventListener("click", (e) => {
  const self = e.target;
  const ayahs = Array.from(Elements.ayahs.children);
  if (document.querySelector('.bismillah').style.display != "none"){
    ayahs.unshift(document.querySelector('.bismillah'))
  }

  if (self.classList.contains("ico-play")) {
    self.classList.replace("ico-play", "ico-pause");
    // console.log(ayahs)
    audio.src = ayahs[currentSrc].dataset.audio;
    loader.style.display = "flex";
    audio.play().then((data) => {
      loader.style.display = "none";
      // console.log(data);
    });
  } else if (self.classList.contains("ico-pause")) {
    self.classList.replace("ico-pause", "ico-play");
    audio.pause();
  }
});
