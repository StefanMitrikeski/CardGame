const nameInput = document.getElementById("nameInp");
const submitBtn = document.getElementById("submit_btn");
const charactersWarning = document.getElementById("character_warning");
const capitalLetter = document.getElementById("capital_letter");
const storage = JSON.parse(localStorage.getItem("user"));

const validation = [
  {
    message: "Length must be bigger than 3.",
    predicate: value => value.length < 3
  },
  {
    message: "The first letter must be a capital letter.",
    predicate: value => value[0] && value[0] !== value[0].toUpperCase()
  }
]

const inputField = () => {
  const name = nameInput.value;
  const warningsElement = document.getElementById('warnings')

  const warnings = []
  for (let warning of validation) {
    if (warning.predicate(name)) {
      warnings.push(
        `<label>${warning.message}</label>`
      )
    }
  }

  if (warnings.length === 0) {
    submitBtn.addEventListener("click", () => {
      window.location.href = "second_page.html";
      const storage = nameInput.value;
      localStorage.value = "";
      localStorage.setItem('user',JSON.stringify(storage))
    });
  }

  const warningsBody = warnings.join('\n')

  warningsElement.innerHTML = warningsBody

};

nameInput.addEventListener("change", inputField);
