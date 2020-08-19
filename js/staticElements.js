
document.querySelector(".nav-bookmark").addEventListener('click', () => {
  document.querySelector(".bookmark-div").classList.toggle("open");
})
document.querySelector(".close-btn").addEventListener('click', () => {
  document.querySelector(".bookmark-div").classList.toggle("open");
})


document.querySelector(".all-surah-nav").addEventListener('click', () => {
  Elements.surahs.closest(".all-surah_div").classList.toggle("open");
  Elements.surahs.closest(".all-surah_div").classList.remove("selected");
});

document.querySelector(".navbar-btn").addEventListener('click', (e) => {
  const self = e.target.closest('.navbar-btn')
  self.classList.toggle("active");
});



document.querySelector(".setting-btn").addEventListener('click', (e) => {
  const self = e.target
  self.parentElement.classList.toggle("open");
})


document.querySelector(".search-no").addEventListener('change', (e) => {
  const self = e.target
  scrollToTop(document.getElementById(self.value));
  Elements.surahs.closest(".all-surah_div").classList.add("open");
});
document.querySelector("#ayah-count").addEventListener('change', (e) => {
  const self = e.target
  scrollToTop(document.getElementById(self.value));
  Elements.surahs.closest(".all-surah_div").classList.add("open");
});


document.querySelector(".nav-searchBar__btn").addEventListener('click', (e) => {
  let searchValue = document.querySelector(".nav-searchBar input[type=search]").value;
  let [surah, ayahNumber] = searchValue.split(":");
  ayahNumber = Number(ayahNumber);
  if (Number(surah) == surah) {
    // console.log("sura number");
  } else {
    // console.log("sura Name");
    searchByName(surah);
  }
});


document.querySelector("#arabic-font-plus").addEventListener('click', (e) => {
  document.querySelectorAll('.arabic').forEach(element => {
    const currentFontSize = window.getComputedStyle(element, null).getPropertyValue("font-size");
    // console.log(currentFontSize)
    element.style.fontSize =  `${Number(currentFontSize.slice(0,currentFontSize.length - 2)) + 3}px`
  })
});
document.querySelector("#arabic-font-minus").addEventListener('click', (e) => {
  document.querySelectorAll('.arabic').forEach(element => {
    const currentFontSize = window.getComputedStyle(element, null).getPropertyValue("font-size");
    // console.log(currentFontSize)
    element.style.fontSize =  `${Number(currentFontSize.slice(0,currentFontSize.length - 2)) - 3}px`
  })
});

document.querySelector("#bn-font-plus").addEventListener('click', (e) => {
  document.querySelectorAll('.bangla-text > p').forEach(element => {
    const currentFontSize = window.getComputedStyle(element, null).getPropertyValue("font-size");
    // console.log(currentFontSize)
    element.style.fontSize =  `${Number(currentFontSize.slice(0,currentFontSize.length - 2)) + 3}px`
  })
});

document.querySelector("#bn-font-minus").addEventListener('click', (e) => {
  document.querySelectorAll('.bangla-text > p').forEach(element => {
    const currentFontSize = window.getComputedStyle(element, null).getPropertyValue("font-size");
    // console.log(currentFontSize)
    element.style.fontSize =  `${Number(currentFontSize.slice(0,currentFontSize.length - 2)) - 3}px`
  })
});
document.querySelector("#eng-font-plus").addEventListener('click', (e) => {
  document.querySelectorAll('.english-text > p').forEach(element => {
    const currentFontSize = window.getComputedStyle(element, null).getPropertyValue("font-size");
    // console.log(currentFontSize)
    element.style.fontSize =  `${Number(currentFontSize.slice(0,currentFontSize.length - 2)) + 3}px`
  })
});
document.querySelector("#eng-font-minus").addEventListener('click', (e) => {
  document.querySelectorAll('.english-text > p').forEach(element => {
    const currentFontSize = window.getComputedStyle(element, null).getPropertyValue("font-size");
    // console.log(currentFontSize)
    element.style.fontSize =  `${Number(currentFontSize.slice(0,currentFontSize.length - 2)) - 3}px`
  })
});

document
  .querySelector('input[type="search"]')
  .addEventListener("search", (e) => {
    searchByName(e.target.value);
    e.target.value = ''
  });

function startloder(name) {
  Elements[name + "_loader"].style.display = "flex";
  Elements[name + "_loader"].parentElement.querySelector(
    `.${name}s`
  ).innerHTML = "";
}
function stoploder(name) {
  Elements[name + "_loader"].style.display = "none";
}

function scrollToTop(element) {
  const parentElement = element.parentElement;
  if (element.classList.contains("ayah")) {
    parentElement.scrollTo(0, element.offsetTop);
    return 0;
  }
  parentElement.scrollTo(0, element.offsetTop - element.offsetHeight);
}

function activeSurah(surahId) {
  const surah = document.getElementById(surahId);
  scrollToTop(surah);
  Elements.surahs.childNodes.forEach((e) => e.classList.remove("active"));
  surah.classList.add("active");
}

function searchByName(name) {
  
  name = name.toLocaleLowerCase();
  Elements.surahs.childNodes.forEach((node) => {
    let nodeName = node.dataset.name.toLocaleLowerCase();
    nodeName = nodeName.replace("'", "");
    nodeName = nodeName.replace("-", " ");
    if (nodeName.includes(name)) {
      scrollToTop(document.getElementById(node.id));
    }
  });
}

function playAyah(source, callback) {
  const audio = new Audio(source);
  audio.play().then((e) => {
    callback();
  });
}

function copyToClipBoard(ayah) {
  const arabic_text = ayah.querySelector(".arabic-text > p");
  const bangla_text = ayah.querySelector(".bangla-text > p");
  const english_text = ayah.querySelector(".english-text > p");
  const dummyElement = ayah.querySelector("#bar");
  // dummyElement.type = 'text';
  // dummyElement.id = "input"
  dummyElement.innerText = `
    Arabic: ${arabic_text.innerText}
    বাংলা: ${bangla_text.innerText}
    English: ${english_text.innerText}
  
      -(${ayah.id})
    `;
  // dummyElement.focus();
  // dummyElement.select();
  // dummyElement.setSelectionRange(0, 99999);
  // document.execCommand("copy");
  // console.log(dummyElement.value)
}
