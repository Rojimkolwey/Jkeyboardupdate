const guessPara = document.getElementById("guess");
const inputTextbox = document.getElementById("input");
var wordList = null;
var idiomList = null;

$.ajax({
  url: "words.txt",
}).done(function (data) {
  wordList = data.split("\n");
});

$.ajax({
  url: "phrases.txt",
}).done(function (data) {
  idiomList = data.split("\n");
});

var acText = "";

inputTextbox.focus();
inputTextbox.onkeydown = detectSpecialKeys;

function textUpdated(input) {
  text = input.value;

  if (text == "") {
    setAutoCompleteText("", "");
    return;
  }
  let ending = text.endsWith(" ") ? "" : getRecommendedEnding(text);
  setAutoCompleteText(text, ending);
}

function detectSpecialKeys(e) {
  if (e.key == "Tab") {
    input.value = acText;
    e.preventDefault();
  } else if (e.key == "Escape") {
    input.value = "";
    e.preventDefault();
  }
}

function setAutoCompleteText(enteredText, autoCompleteEnding) {
  if (autoCompleteEnding == undefined) {
    autoCompleteEnding = "";
  }
  acText = enteredText + autoCompleteEnding;

  guessPara.innerHTML = `<span class='entered'>${enteredText}</span><span class='autocomplete'>${autoCompleteEnding}</span>`;
}

function getRecommendedEnding(text) {
  // This is where it gets interesting!
  //return text;

  let newText = text.toLowerCase();
  let idiomPart = "";

  if (text.includes(" ")) {
    let split = text.split(" ");

    newText = split[split.length - 1];

    if (split.length > 1) {
      let idiomSearch = split[split.length - 2] + " " + split[split.length - 1];
      let srch = searchIdiomList(idiomSearch);

      if (srch.length > 0) {
        idiomPart = srch;
        text = idiomSearch;
      }
    }
  }

  if (idiomPart.length > 0) {
    let ending = "";
    let split = idiomPart.split(text);

    if (split.length >= 3) {
      for (let part in split) {
        if (part > 0) {
          if (part != split.length - 1) ending += split[part] + text;
          else ending += split[part];
        }
      }
    } else {
      ending = split[1];
    }

    return ending;
  }

  let wordEnding = searchWordList(newText);
  let ending = wordEnding.split(newText)[1];

  return ending;
}

function searchWordList(search) {
  for (let word of wordList) {
    if (word.startsWith(search)) {
      return word;
    }
  }

  return "";
}

function searchIdiomList(search) {
  for (let idiom of idiomList) {
    if (idiom.startsWith(search)) {
      return idiom;
    }
  }

  return "";
}

// document.addEventListener("click", function () {
//   window.location.href = "keyboard.html";
// });
