function setBookmark(ayah) {
    var localStorageData = JSON.parse(localStorage.getItem("bookMarked"));
    if (localStorageData == null) {
      localStorageData = [];
    }
    if (localStorageData.length > 0) {
      localStorageData.forEach((item) => {
        if (item.key != ayah.key) {
          localStorageData.push(ayah);
        }
      });
    } else if (localStorageData == 0) {
      localStorageData.push(ayah);
    }
  
    //https://stackoverflow.com/questions/2218999/remove-duplicates-from-an-array-of-objects-in-javascript
    localStorageData = localStorageData.filter(
      (item, index, self) => index === self.findIndex((t) => t.key === item.key)
    );
  
    localStorage.setItem("bookMarked", JSON.stringify(localStorageData));
  }
  function removeBookmark(ayahId) {
    var localStorageData = JSON.parse(localStorage.getItem("bookMarked"));
    localStorageData = localStorageData.filter(
      (item, index, self) => item.key != ayahId
    );
    localStorage.setItem("bookMarked", JSON.stringify(localStorageData));
  }
  
  function checkBookmark(ayahElement) {
    const bookmarkbtn = ayahElement.querySelector(".bookmark-btn");
    const allBookmark = JSON.parse(localStorage.getItem("bookMarked"));
    if (allBookmark == null) return;
    allBookmark.forEach((item) => {
      if (item.key == ayahElement.id) {
        if (!bookmarkbtn.classList.contains("bookmarked")) {
          bookmarkbtn.classList.add("bookmarked");
        }
      }
    });
  }
  
  function showBookmark() {
    Elements.section_item.innerHTML = "";
    const allBookmark = JSON.parse(localStorage.getItem("bookMarked"));
    if (allBookmark == null) return;
    allBookmark.forEach((item, index) => {
      let { key, name, mean } = item;
      let [suraNum, ayahNum] = key.split(":");
  
      const markup = ` <div class="surah">
      <div class="surah-plane_text">
        <span class="surah_number">${suraNum}</span>
        <div class="surah-title">
          <h2 class="surah-name">${name}</h2>
          <p class="surah-meaning">${mean}</p>
        </div>
      </div>
      <div class="ayat-no">
        <span class="text">Ayat: </span>
        <span class="no">${ayahNum}</span>
      </div>
    </div>`;
      Elements.section_item.insertAdjacentHTML("beforeend", markup);3
      Elements.section_item.children[index].addEventListener('click', (e) => {
        bookmarkClick(item)
      })
    });
  }
  
  function bookmarkClick(ayah) {
    let { key, name, mean } = ayah;
    let [surahNumber, _] = key.split(':');
    const surah = document.getElementById(surahNumber)
    activeSurah(surahNumber);
    loadAllAyah(surahNumber).then(({ verses }) => {
      showAllAyah(verses);
      afterClickDefaults(surahNumber,name, mean, surah.dataset.v_count, surah.dataset.r_place, surah.isHaveBismillah)
      scrollToTop(document.getElementById(key))
    });
    document.querySelector(".bookmark-div").classList.toggle("open");
  }
  
  function bookmarkBtnClick(ayahElement) {
    const bookmarkbtn = ayahElement.querySelector(".bookmark-btn");
    if (bookmarkbtn.classList.contains("bookmarked")) {
      removeBookmark(ayahElement.id);
    } else {
      const name = document.querySelector(".surah-info > .name > h2").innerText;
      const mean = document.querySelector(".surah-info > .name > p").innerText;
      setBookmark({
        key: ayahElement.id,
        name: name,
        mean: mean,
      });
    }
    bookmarkbtn.classList.toggle("bookmarked");
    showBookmark();
  }
  