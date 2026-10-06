const eyebrow = document.getElementById("eyebrow");
const mainText = document.getElementById("mainText");
const touchArea = document.getElementById("touchArea");
const touchLabel = document.getElementById("touchLabel");
const statusList = document.getElementById("statusList");
const screen = document.getElementById("screen");

let step = 0;
let busy = false;

const steps = [
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
    eyebrow: "Perhaps the most important one",
    text: "Some in the difference they make.",
    label: "Tap to continue"
  },

  {
    eyebrow: "Now the difficult question",
    text: "But can a person's value be measured?",
    label: "Tap to find out"
  },

  {
    eyebrow: "Attempting calculation...",
    text: "Calculating...",
    label: "Tap to continue"
  },

  {
    eyebrow: "Still calculating...",
    text: "Please wait.",
    label: "Tap to continue"
  },

  {
    eyebrow: "One more attempt",
    text: "Trying a different method...",
    label: "Tap to continue"
  },

  {
    eyebrow: "RESULT",
    text: "No number found.",
    label: "Tap to continue"
  },

  {
    eyebrow: "Unexpected conclusion",
    text: "Apparently, some things are too valuable to measure.",
    label: "Tap to continue"
  },

  {
    eyebrow: "Final observation",
    text: "Especially you.",
    label: ""
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

async function showStep(index) {

  const current = steps[index];

  eyebrow.classList.add("fade-out");

  await sleep(300);

  eyebrow.textContent = current.eyebrow;
  eyebrow.classList.remove("fade-out");

  await changeText(mainText, current.text);

  touchLabel.textContent = current.label;

  if (index === 9) {
    mainText.classList.add("result-number");
  } else {
    mainText.classList.remove("result-number");
  }

  if (index === steps.length - 1) {
    finish();
  }
}

async function nextStep() {

  if (busy) return;

  busy = true;

  step++;

  if (step >= steps.length) {
    busy = false;
    return;
  }

  await showStep(step);

  await sleep(550);

  busy = false;
}

function finish() {

  screen.classList.add("final-state");

  touchArea.disabled = true;

  setTimeout(() => {

    eyebrow.textContent = "";

    mainText.textContent = "Especially you.";

    mainText.classList.remove("fade-out");
    mainText.classList.add("fade-in");

    touchLabel.textContent = "";

  }, 700);
}

touchArea.addEventListener("click", nextStep);

/* Initial state */

eyebrow.textContent = "One more thing...";
mainText.textContent = "But what about a person?";
touchLabel.textContent = "Tap to continue";
