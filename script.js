const eyebrow = document.getElementById("eyebrow");
const mainText = document.getElementById("mainText");
const touchButton = document.getElementById("touchButton");
const touchLabel = document.getElementById("touchLabel");
const progressArea = document.getElementById("progressArea");
const progressBar = document.getElementById("progressBar");
const progressNumber = document.getElementById("progressNumber");
const statusList = document.getElementById("statusList");
const screen = document.getElementById("screen");

let step = 0;

const steps = [
  {
    eyebrow: "Ready",
    text: "Let's see what we find.",
    label: "Tap to begin"
  },
  {
    eyebrow: "Running a quick scan...",
    text: "Scanning…",
    label: "Tap to continue"
  },
  {
    eyebrow: "Checking system",
    text: "Brightness check",
    label: "Tap to continue"
  },
  {
    eyebrow: "Checking system",
    text: "Mood check",
    label: "Tap to continue"
  },
  {
    eyebrow: "Checking system",
    text: "Sunshine level",
    label: "Tap to continue"
  },
  {
    eyebrow: "Scan complete",
    text: "Everything looks normal.",
    label: "Tap to see the result"
  },
  {
    eyebrow: "System notice",
    text: "⚠️ WARNING",
    label: "Tap to continue"
  },
  {
    eyebrow: "System notice",
    text: "Excessive sunshine detected.",
    label: "Tap to continue"
  },
  {
    eyebrow: "Measured result",
    text: "SUNSHINE LEVEL",
    label: "Tap to reveal"
  },
  {
    eyebrow: "Measured result",
    text: "1000% ☀️",
    label: "Tap to continue"
  },
  {
    eyebrow: "Unexpected result",
    text: "SYSTEM ERROR",
    label: "Tap to continue"
  },
  {
    eyebrow: "Unexpected result",
    text: "Sunshine level exceeds measurable limits.",
    label: "Tap to continue"
  },
  {
    eyebrow: "Okay… never mind.",
    text: "Some things can't be measured. ☀️",
    label: "Tap to continue"
  },
  {
    eyebrow: "",
    text: "You're just Sunshine. ☀️",
    label: ""
  }
];

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function setText(element, text) {
  element.classList.add("fade-out");

  setTimeout(() => {
    element.textContent = text;
    element.classList.remove("fade-out");
    element.classList.add("fade-in");
  }, 250);
}

function addStatus(text, type = "done") {
  const item = document.createElement("div");

  item.className = `status-item ${type}`;
  item.textContent = text;

  statusList.appendChild(item);

  requestAnimationFrame(() => {
    item.classList.add("visible");
  });
}

function updateProgress() {
  const percentage = Math.round(
    (step / (steps.length - 1)) * 100
  );

  progressBar.style.width = `${percentage}%`;
  progressNumber.textContent = `${percentage}%`;
}

async function goToStep(nextStep) {

  if (nextStep >= steps.length) {
    finish();
    return;
  }

  step = nextStep;

  const current = steps[step];

  mainText.classList.remove("visible");
  eyebrow.classList.add("fade-out");

  await sleep(300);

  eyebrow.textContent = current.eyebrow;
  mainText.textContent = current.text;

  eyebrow.classList.remove("fade-out");
  mainText.classList.add("visible");

  touchLabel.textContent = current.label;

  updateProgress();

  if (step === 2) {
    addStatus("Checking brightness... ✓");
  }

  if (step === 3) {
    addStatus("Checking mood... ✓");
  }

  if (step === 4) {
    addStatus("Checking sunshine level... ✓");
  }

  if (step >= 5) {
    progressArea.classList.add("visible");
  }

  if (step === 13) {
    await sleep(900);
    finish();
  }
}

function finish() {

  screen.classList.add("final");

  touchButton.disabled = true;

  progressArea.classList.add("fade-out");
  statusList.classList.add("fade-out");

  setTimeout(() => {
    touchButton.classList.add("hidden");

    mainText.classList.remove("fade-out");
    mainText.classList.add("visible");

    eyebrow.textContent = "";
    mainText.textContent = "You're just Sunshine. ☀️";

    progressBar.style.width = "100%";
    progressNumber.textContent = "100%";
  }, 600);
}

touchButton.addEventListener("click", async () => {

  if (step >= steps.length - 1) {
    return;
  }

  touchButton.disabled = true;

  await goToStep(step + 1);

  setTimeout(() => {
    touchButton.disabled = false;
  }, 450);
});

mainText.textContent = "";
progressArea.classList.remove("visible");
