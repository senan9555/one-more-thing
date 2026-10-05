const eyebrow = document.getElementById("eyebrow");
const mainText = document.getElementById("mainText");
const progressBar = document.getElementById("progressBar");
const progressNumber = document.getElementById("progressNumber");
const statusList = document.getElementById("statusList");

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function setMainText(text) {
  mainText.classList.add("fade-out");

  setTimeout(() => {
    mainText.textContent = text;
    mainText.classList.remove("fade-out");
  }, 350);
}

function setEyebrow(text) {
  eyebrow.classList.add("fade-out");

  setTimeout(() => {
    eyebrow.textContent = text;
    eyebrow.classList.remove("fade-out");
  }, 300);
}

function addStatus(text, type = "") {
  const item = document.createElement("div");

  item.className = `status-item ${type}`;
  item.textContent = text;

  statusList.appendChild(item);

  requestAnimationFrame(() => {
    item.classList.add("visible");
  });

  return item;
}

async function runExperience() {

  eyebrow.textContent = "Please wait…";
  mainText.textContent = "Getting things ready.";

  await sleep(900);

  setEyebrow("Running a quick scan...");
  setMainText("Scanning…");

  let progress = 0;

  const progressTimer = setInterval(() => {
    progress += 1;

    progressBar.style.width = `${progress}%`;
    progressNumber.textContent = `${progress}%`;

    if (progress >= 100) {
      clearInterval(progressTimer);
    }
  }, 45);

  await sleep(700);

  addStatus("Checking brightness... ✓", "done");

  await sleep(800);

  addStatus("Checking mood... ✓", "done");

  await sleep(900);

  addStatus("Checking sunshine level... ⏳", "pending");

  await sleep(1400);

  const pending = statusList.querySelector(".pending");

  if (pending) {
    pending.textContent = "Checking sunshine level... ✓";
    pending.classList.remove("pending");
    pending.classList.add("done");
  }

  await sleep(700);

  setEyebrow("Scan complete");
  setMainText("Everything looks normal.");

  await sleep(1300);

  setEyebrow("System notice");
  setMainText("⚠️ WARNING");

  await sleep(1200);

  setMainText("Excessive sunshine detected.");

  await sleep(1500);

  setEyebrow("Measured result");
  setMainText("SUNSHINE LEVEL");

  await sleep(900);

  setMainText("1000% ☀️");

  await sleep(1600);

  setEyebrow("Unexpected result");
  setMainText("SYSTEM ERROR");

  await sleep(1200);

  setMainText("Sunshine level exceeds measurable limits.");

  await sleep(1800);

  setEyebrow("Okay… never mind.");
  setMainText("Some things can't be measured. ☀️");

  await sleep(1800);

  setEyebrow("");
  setMainText("You're just Sunshine. ☀️");

  progressBar.style.width = "100%";
  progressNumber.textContent = "100%";
}

runExperience();
