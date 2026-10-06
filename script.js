const eyebrow = document.getElementById("eyebrow");
const mainText = document.getElementById("mainText");
const touchArea = document.getElementById("touchArea");
const touchLabel = document.getElementById("touchLabel");
const screen = document.getElementById("screen");

let step = 0;
let busy = false;

/*
  1-ci hissə:
  İstifadəçi toxunaraq irəliləyir.
*/
const interactiveSteps = [
  {
    eyebrow: "One more thing...",
    text: "But what about a person?",
    label: "Tap to continue"
  },

  {
    eyebrow: "A simple question",
    text: "Some things are measured in numbers.",
    label: "Tap to continue"
  },

  {
    eyebrow: "Another way",
    text: "Some in time.",
    label: "Tap to continue"
  },

  {
    eyebrow: "And sometimes...",
    text: "Some in memories.",
    label: "Tap to continue"
  },

  {
    eyebrow: "Perhaps the important part",
    text: "But the things that matter most are rarely measured so simply.",
    label: "Tap to continue"
  },

  {
    eyebrow: "Think about it",
    text: "In the moments they change.",
    label: "Tap to continue"
  },

  {
    eyebrow: "And in the people...",
    text: "In the people they touch.",
    label: "Tap to continue"
  },

  {
    eyebrow: "And what remains",
    text: "In the things they leave behind.",
    label: "Tap to continue"
  },

  {
    eyebrow: "The real question",
    text: "But can a person's value really be measured?",
    label: "Tap to find out"
  }
];


/*
  2-ci hissə:
  Buradan sonra artıq toxunuş yoxdur.
  Sistem özü davam edir.
*/
const automaticSteps = [
  {
    eyebrow: "Attempting calculation...",
    text: "Counting moments...",
    delay: 4200
  },

  {
    eyebrow: "Measuring memories...",
    text: "Measuring memories...",
    delay: 4200
  },

  {
    eyebrow: "Calculating the difference...",
    text: "Calculating the difference...",
    delay: 4600
  },

  {
    eyebrow: "Still calculating...",
    text: "Still calculating...",
    delay: 4800
  },

  {
    eyebrow: "A different perspective",
    text: "Perhaps value isn't found in what something costs...",
    delay: 5000
  },

  {
    eyebrow: "Maybe it is found elsewhere",
    text: "...but in what it means.",
    delay: 5000
  },

  {
    eyebrow: "Another thought",
    text: "Perhaps a life isn't measured by how long it exists...",
    delay: 5200
  },

  {
    eyebrow: "And perhaps...",
    text: "...but by what becomes different because it existed.",
    delay: 5500
  },

  {
    eyebrow: "Trying a different method...",
    text: "Some people pass through our lives and leave memories.",
    delay: 5000
  },

  {
    eyebrow: "And some...",
    text: "Some leave lessons.",
    delay: 4500
  },

  {
    eyebrow: "But sometimes...",
    text: "Some leave a difference we don't notice until much later.",
    delay: 5500
  },

  {
    eyebrow: "An unexpected result",
    text: "But some leave something harder to define.",
    delay: 5200
  },

  {
    eyebrow: "Still searching...",
    text: "Something you cannot count. Cannot calculate. Cannot put into words.",
    delay: 5600
  },

  {
    eyebrow: "RESULT",
    text: "RESULT",
    delay: 3500,
    result: true
  },

  {
    eyebrow: "The conclusion",
    text: "Some things can be counted.",
    delay: 4500
  },

  {
    eyebrow: "And some...",
    text: "Some things can be remembered.",
    delay: 4500
  },

  {
    eyebrow: "But perhaps...",
    text: "But some things can only be felt.",
    delay: 5200
  },

  {
    eyebrow: "Apparently...",
    text: "Apparently, some things are too valuable to measure.",
    delay: 5500
  },

  {
    eyebrow: "",
    text: "Especially you.",
    delay: 6500,
    final: true
  }
];


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


async function changeText(element, text) {

  element.classList.add("fade-out");

  await sleep(420);

  element.textContent = text;

  element.classList.remove("fade-out");
  element.classList.add("fade-in");
}


/*
  İlk mərhələdə bir addım dəyişir.
*/
async function showInteractiveStep(index) {

  const current = interactiveSteps[index];

  eyebrow.classList.add("fade-out");

  await sleep(300);

  eyebrow.textContent = current.eyebrow;

  eyebrow.classList.remove("fade-out");

  await changeText(mainText, current.text);

  touchLabel.textContent = current.label;
}


/*
  İstifadəçinin toxunduğu hissə.
*/
async function nextStep() {

  if (busy) return;

  busy = true;

  step++;

  if (step >= interactiveSteps.length) {

    startAutomaticSequence();

    busy = false;

    return;
  }

  await showInteractiveStep(step);

  await sleep(500);

  busy = false;
}


/*
  Avtomatik mərhələyə keçid.
*/
async function startAutomaticSequence() {

  busy = true;

  /*
    Orb və "Tap to continue"
    artıq lazım deyil.
  */
  screen.classList.add("final-state");

  touchArea.disabled = true;

  await sleep(1000);

  touchLabel.textContent = "";

  /*
    Avtomatik cümlələr başlayır.
  */
  for (let i = 0; i < automaticSteps.length; i++) {

    const current = automaticSteps[i];

    /*
      Eyebrow dəyişir.
    */
    eyebrow.classList.add("fade-out");

    await sleep(350);

    eyebrow.textContent = current.eyebrow;

    eyebrow.classList.remove("fade-out");

    /*
      RESULT üçün xüsusi görünüş.
    */
    if (current.result) {

      mainText.classList.remove("result-number");

      await changeText(mainText, current.text);

      /*
        RESULT bir az daha böyük görünsün.
      */
      mainText.classList.add("result-number");

    } else {

      mainText.classList.remove("result-number");

      await changeText(mainText, current.text);
    }

    /*
      Final cümlə.
    */
    if (current.final) {

      await sleep(800);

      eyebrow.textContent = "";

      mainText.classList.remove("result-number");

      mainText.classList.add("fade-out");

      await sleep(700);

      mainText.textContent = "Especially you.";

      mainText.classList.remove("fade-out");
      mainText.classList.add("fade-in");

      /*
        Final uzun müddət ekranda qalır.
      */
      await sleep(current.delay);

      break;
    }

    /*
      Növbəti cümləyə qədər gözlə.
    */
    await sleep(current.delay);
  }

  busy = false;
}


/*
  İlk ekran.
*/
eyebrow.textContent = "One more thing...";
mainText.textContent = "But what about a person?";
touchLabel.textContent = "Tap to continue";


/*
  İlk mərhələdə toxunuş işləyir.
  Avtomatik hissəyə keçəndən sonra
  düymə deaktiv edilir.
*/
touchArea.addEventListener("click", nextStep);
