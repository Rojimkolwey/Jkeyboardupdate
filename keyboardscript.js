const searchInput = document.querySelector(".search");
const resultsWrapper = document.querySelector(".search-results");
const buttonImgs = document.querySelectorAll(".button");
const spansResults = document.querySelectorAll(".word-result");

let allWords = [];

function readTextFile(file) {
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {
        allWords = rawFile.responseText;
      }
    }
  };
  rawFile.send(null);
}

readTextFile("./words.txt");

let allWordsArr = allWords.split("\n");

const resultsSearch = () => {
  let results = [];
  let searchstr = searchInput.value;

  let strArr = searchstr.split(" ");
  let input = strArr[strArr.length - 1];

  if (input.length) {
    results = allWordsArr.filter((item) => {
      return item.toLowerCase().includes(input.toLowerCase());
    });
  }

  renderResults(results);
};

buttonImgs.forEach((buttonImg) => {
  buttonImg.addEventListener("click", () => {
    resultsSearch();
  });
});

searchInput.addEventListener("keyup", (e) => {
  resultsSearch();
});

let resultsSubArr = [];

function renderResults(results) {
  console.log("results", results);

  if (!results.length) {
    return resultsWrapper.classList.remove("show");
  }

  if (results.length > 5) {
    console.log("creating subarrray", results);
    resultsSubArr = results.slice(0, 6);
  } else {
    resultsSubArr = results;
  }

  console.log(resultsSubArr);

  let content = resultsSubArr
    .map((item, index) => {
      return `<span class="word-result" onClick = "addResult(${index})">${item}</span>`;
    })
    .join(" ");

  resultsWrapper.classList.add("show");
  resultsWrapper.innerHTML = content;
}

const addResult = (index) => {
  console.log("Clicked", resultsSubArr[index]);
  let searchstr = searchInput.value;
  let strArr = searchstr.split(" ");
  strArr.pop();
  let newSearchStr = strArr.join(" ");
  newSearchStr = newSearchStr + " " + resultsSubArr[index];

  searchInput.value = newSearchStr.trim() + " ";
  searchInput.focus();
};
