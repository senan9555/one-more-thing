const eyebrow = document.getElementById("eyebrow");
const mainText = document.getElementById("mainText");
const touchArea = document.getElementById("touchArea");
const touchLabel = document.getElementById("touchLabel");
const orb = document.getElementById("orb");
const statusList = document.getElementById("statusList");
const screen = document.getElementById("screen");

let step = 0;
let busy = false;

const steps = [
  {
    eyebrow: "One more thing...",
    text: "",
    label: "Tap to begin"
  },
  {
    eyebrow: "Initializing...",
    text: "Getting things ready.",
    label: "Tap to continue"
  },
  {
    eyebrow: "System check",
    text: "Running a very serious analysis.",
    label: "Tap to continue"
  },
  {
    eyebrow: "Checking system",
    text: "Checking brightness...",
    label: "Tap to continue",
    status: "Checking brightness... ✓"
  },
  {
    eyebrow: "Checking system",
    text: "Checking mood...",
    label: "Tap to continue",
    status: "Checking mood... ✓"
  },
  {
    eyebrow: "Checking system",
    text: "Checking energy...",
    label: "Tap to continue",
    status: "Checking energy... ✓"
  },
  {
    eyebrow: "Final check",
    text: "Checking sunshine level...",
    label: "Tap to continue",
    status: "Checking sunshine level... ✓"
  },
  {
    eyebrow: "Analysis complete",
    text: "Everything looks normal.",
    label: "Tap to see the result"
  },
  {
    eyebrow: "System notice",
    text: "Something seems unusual.",
    label: "Tap to continue"
  },
  {
    eyebrow: "System notice",
    text: "⚠️ WARNING",
    label: "Tap to continue",
    warning: true
  },
  {
    eyebrow: "System notice",
    text: "Excessive sunshine detected.",
    label: "Tap to continue"
  },
  {
    eyebrow: "Measured result",
    text: "SUNSHINE LEVEL:",
    label: "Tap to reveal"
  },
  {
    eyebrow: "Measured result",
    text: "1000% ☀️",
    label: "Tap to continue",
    result: true
  },
  {
    eyebrow: "Recommended action",
    text: "Keep being yourself.",
    label: "Tap to continue"
  },
  {
    eyebrow: "Final analysis",
    text: "Some things can't be measured. ☀️",
    label: "Tap to continue"
  },
  {
    eyebrow: "Anyway...",
    text: "You're just Sunshine.",
    label: ""
  }
];

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function updateText(element, text) {
  element.classList.add("fade-out");

  setTimeout(() => {
    element.textContent = text;
    element.classList.remove("fade-out");
    element.classList.add("fade-in");
  }, 280);
}

function addStatus(text) {
  const item = document.createElement("div");

  item.className = "status-item";
  item.textContent = text;

  statusList.appendChild(item);

  requestAnimationFrame(() => {
    item.classList.add("visible");
  });
}

async function showStep(index) {

  const current = steps[index];

  eyebrow.classList.add("fade-out");
  mainText.classList.add("fade-out");

  await sleep(300);

  eyebrow.textContent = current.eyebrow;
  mainText.textContent = current.text;

  eyebrow.classList.remove("fade-out");
  mainText.classList.remove("fade-out");

  eyebrow.classList.add("fade-in");
  mainText.classList.add("fade-in");

  touchLabel.textContent = current.label;

  if (current.warning) {
    mainText.classList.add("warning");
  } else {
    mainText.classList.remove("warning");
  }

  if (current.result) {
    mainText.classList.add("result-number");
  } else {
    mainText.classList.remove("result-number");
  }

  if (current.status) {
    addStatus(current.status);
  }
}

async function nextStep() {

  if (busy) return;

  busy = true;

  step++;

  if (step >= steps.length) {
    finish();
    return;
  }

  await showStep(step);

  await sleep(500);

  busy = false;
}

async function finish() {

  screen.classList.add("final-state");

  touchArea.disabled = true;

  await sleep(900);

  eyebrow.textContent = "";

  mainText.classList.remove("fade-out");

  mainText.textContent = "You're just Sunshine.";

  mainText.classList.add("fade-in");

  touchLabel.textContent = "";
}

touchArea.addEventListener("click", nextStep);

/* Initial state */

mainText.textContent = "";
touchLabel.textContent = "Tap to begin";
