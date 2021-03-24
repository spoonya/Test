const input = document.querySelector(".input");
const letterCase = document.querySelector(".case");
const lengthBtn = document.querySelector(".btn-length");
const substringBtn = document.querySelector(".btn-substring");
const output = document.querySelector(".output");
const words = getWords();

async function getWords() {
  const url =
    "https://cors-anywhere.herokuapp.com/http://www.mrsoft.by/data.json";
  const res = await fetch(url);
  const data = await res.json();

  return data.data;
}

async function appendOutput(filteredWords) {
  const words = await filteredWords;
  output.value = "";

  words.map((word) => {
    output.value += `${word}\n`;
  });

  if (!output.value) {
    output.value = "Слова не найдены";
  }
}

async function filterByLength(wordsArray) {
  const words = await wordsArray;
  const wordsCopy = words.slice();
  const length = +input.value;

  const filteredWords = wordsCopy.filter(
    (word) => input.value && word.length > length
  );

  return filteredWords;
}

async function filterByCase(wordsArray, isCaseMatter = false) {
  const words = await wordsArray;
  const wordsCopy = words.slice();
  const filteredWords = [];

  if (isCaseMatter) {
    wordsCopy.map((word) => {
      if (input.value && word.includes(input.value)) {
        filteredWords.push(word);
      }
    });
  } else {
    wordsCopy.map((word) => {
      if (
        input.value &&
        word.toLowerCase().includes(input.value.toLowerCase())
      ) {
        filteredWords.push(word);
      }
    });
  }

  return filteredWords;
}

lengthBtn.addEventListener("click", () => appendOutput(filterByLength(words)));
substringBtn.addEventListener("click", () =>
  appendOutput(filterByCase(words, letterCase.checked))
);
