const themeToggle = document.getElementById("themeToggle");
const downloadPdf = document.getElementById("downloadPdf");
const progressBars = document.querySelectorAll(".progress");
const jobEntries = document.querySelectorAll(".job-entry");
const toast = document.getElementById("toast");
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

window.addEventListener("load", () => {
  progressBars.forEach(bar => {
    bar.style.width = bar.getAttribute("data-width");
  });
});

jobEntries.forEach(entry => {
  entry.addEventListener("click", () => {
    const company = entry.getAttribute("data-company");
    showToast(`Learn more about my role at ${company}`);
  });
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

downloadPdf.addEventListener("click", () => {
  const element = document.getElementById("resume");
  const options = {
    margin: 0.5,
    filename: "resume.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" }
  };

  html2pdf().set(options).from(element).save();
});

contactForm.addEventListener("submit", event => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (name === "") {
    formMessage.textContent = "Please enter your name.";
    formMessage.style.color = "red";
    return;
  }

  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/i;
  if (!emailPattern.test(email)) {
    formMessage.textContent = "Please enter a valid email address.";
    formMessage.style.color = "red";
    return;
  }

  if (message.length < 10) {
    formMessage.textContent = "Message must be at least 10 characters long.";
    formMessage.style.color = "red";
    return;
  }

  alert("Message sent successfully!");
  formMessage.textContent = "";
  contactForm.reset();
});