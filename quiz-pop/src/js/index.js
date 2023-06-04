let score = 0;
console.log(localStorage.getItem("score"));

const div = document.getElementById("main");
const musicQuiz = document.querySelector("#music");
const modernArtQuiz = document.querySelector("#modern-art");
const codingQuiz = document.querySelector("#coding");
const options = document.createElement("ul");
const quizchosen = "";
if (localStorage.getItem("music") === "music") {
  musicQuiz.setAttribute("disabled", true);
}
if (localStorage.getItem("modern") === "modern") {
  modernArtQuiz.setAttribute("disabled", true);
}
if (localStorage.getItem("coding") === "coding") {
  codingQuiz.setAttribute("disabled", true);
}

if (
  localStorage.getItem("music") === "music" &&
  localStorage.getItem("modern") === "modern" &&
  localStorage.getItem("coding") === "coding"
) {
  localStorage.clear();
  div.innerHTML = `<button class="mainPage-btn"><a href="/index.html">You have tried all the Quizes Press here to Play Again</a></butto>
  `;
}

musicQuiz.addEventListener("click", getData);
modernArtQuiz.addEventListener("click", getData);
codingQuiz.addEventListener("click", getData);

function getData(chosen) {
  const optionsSelected = chosen.target.innerText;
  if (optionsSelected === "music") {
    localStorage.setItem("music", `${optionsSelected}`);
  } else if (optionsSelected === "modern") {
    localStorage.setItem("modern", `${optionsSelected}`);
  } else if (optionsSelected === "coding") {
    localStorage.setItem("coding", `${optionsSelected}`);
  }
  div.innerHTML = "";
  const movement = document.createElement("div");
  movement.classList.add("flexer");
  const nextBtn = document.createElement("button");
  const prevBtn = document.createElement("button");

  nextBtn.classList.add("moveBTN");

  prevBtn.classList.add("moveBTN");
  nextBtn.innerText = "Next Question";
  nextBtn.disabled = true;
  prevBtn.innerText = "Previous Question";
  const question = document.createElement("h2");

  const h4 = document.createElement("h4");
  fetch("https://api.npoint.io/ccbee995f5bc63e99a36")
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      return data[optionsSelected];
    })
    .then((optionsSelection) => {
      let x = 0;
      question.innerText = optionsSelection[x].question;
      options.innerHTML = ` <input type="radio" name="selection" class="classname" value= "${optionsSelection[x].options[0]}">${optionsSelection[x].options[0]}</input></br>
    <input type="radio" name="selection"class="classname" value= "${optionsSelection[x].options[1]}">${optionsSelection[x].options[1]}</input></br>
    <input type="radio" name="selection" class="classname" value= "${optionsSelection[x].options[2]}">${optionsSelection[x].options[2]}</input>
    </br>
    <input type="radio" name="selection" class="classname"  value="${optionsSelection[x].options[3]}">${optionsSelection[x].options[3]}</input>
    </br>
    <button id="finalscore" class ="mainPage-btn"> Score = ${score}</button>`;
      const elements = Array.from(options.getElementsByClassName("classname"));
      elements.forEach(function (element) {
        element.addEventListener("click", (e) => {
          const finalanswer = optionsSelection[x].answer;
          var optionsCollection = document.querySelectorAll(
            "input[name=selection]"
          );
          var optionsArr = Array.from(optionsCollection);
          optionsArr.forEach(function (current) {
            current.setAttribute("disabled", true);
          });

          console.log(e.target.value);
          localStorage.setItem(`${x}`, `${e.target.value}`);
          if (finalanswer.includes(e.target.value)) {
            score += 1;
          }
          nextBtn.disabled = false;
        });
      });

      nextBtn.addEventListener("click", () => {
        question.innerText = optionsSelection[x + 1].question;
        options.innerHTML = ` <input type="radio" name="selection" class="classname" value= "${
          optionsSelection[x + 1].options[0]
        }">${optionsSelection[x + 1].options[0]}</input></br>
    <input type="radio" class="classname" name="selection" value= "${
      optionsSelection[x + 1].options[1]
    }">${optionsSelection[x + 1].options[1]}</input></br>
    <input type="radio" class="classname" name="selection" value = "${
      optionsSelection[x + 1].options[2]
    }">${optionsSelection[x + 1].options[2]}</input></br>
    <input type="radio"class="classname"  name="selection" value="${
      optionsSelection[x + 1].options[3]
    }">${optionsSelection[x + 1].options[3]}</input></br>
    <button id="finalscore" class="classname" class ="mainPage-btn"> Score = ${score}</button>`;

        const elements = Array.from(
          options.getElementsByClassName("classname")
        );

        elements.forEach(function (element) {
          element.addEventListener("click", (e) => {
            nextBtn.disabled = true;
            var optionsCollection = document.querySelectorAll("input");
            var optionsArr = Array.from(optionsCollection);
            optionsArr.forEach(function (current) {
              current.setAttribute("disabled", true);
            });

            const finalanswer = optionsSelection[x + 1].answer;
            localStorage.setItem(`${x}`, `${e.target.value}`);

            if (finalanswer.includes(e.target.value)) {
              score += 1;
            }
            nextBtn.disabled = false;
          });
        });
        if (x < 8) {
          x = x + 1;
        } else if (x < 0) {
          x = 0;
        } else {
          console.log(optionsSelection[1].category);

          pageLoad();
        }
      });
      prevBtn.addEventListener("click", () => {
        if (x > 0) {
          console.log(localStorage.getItem(`${x}`));
          if (localStorage.getItem("x")) {
            var optionsCollection = document.querySelectorAll("input");
            var optionsArr = Array.from(optionsCollection);
            optionsArr.forEach(function (current) {
              current.setAttribute("disabled", true);
            });
          }
          question.innerText = optionsSelection[x - 1].question;

          options.innerHTML = ` <input type="radio" name="selection" disabled value= "${
            optionsSelection[x - 1].options[0]
          }">${optionsSelection[x - 1].options[0]} </input></br>
    <input type="radio" name="selection" disabled value= "${
      optionsSelection[x - 1].options[1]
    }">${optionsSelection[x - 1].options[1]}</input></br>
    <input type="radio" name="selection" disabled value = "${
      optionsSelection[x - 1].options[2]
    }">${optionsSelection[x - 1].options[2]}</input></br>
    <input type="radio" name="selection"disabled value="${
      optionsSelection[x - 1].options[3]
    }">${optionsSelection[x - 1].options[3]}</input></br>
    <button id="finalscore" disabled class ="mainPage-btn"> Score = ${score}</button>`;

          options.addEventListener("click", (e) => {
            const finalanswer = optionsSelection[x + 1].answer;

            if (finalanswer.includes(e.target.value)) {
              score += 1;
              console.log(score);
            }
          });

          x = x - 1;
        } else {
          backaction();
        }
      });
    });

  div.appendChild(question);
  options.appendChild(h4);

  div.appendChild(options);
  movement.appendChild(nextBtn);
  movement.appendChild(prevBtn);
  div.appendChild(movement);
}

function pageLoad() {
  div.innerHTML = `   
          <h2> You Are A VittyMan! </h2>
          <button id="finalscore" class ="mainPage-btn"> Score = ${score}</button>
          <button class="mainPage-btn"><a href="/index.html">Want to try Another Quiz</a></butto>
       `;
}
function backaction() {
  div.innerHTML = `   
  <h2> Legends never Go back </h2>
  <button id="finalscore" class ="mainPage-btn"> Score = ${score}</button>
  <button class="mainPage-btn"><a href="/index.html">Play Again</a></butto>
`;
}
