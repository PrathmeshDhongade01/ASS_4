const form = document.getElementById("employeeForm");
const successMessage = document.getElementById("successMessage");

const fields = {
  name: document.getElementById("name"),
  email: document.getElementById("email"),
  password: document.getElementById("password"),
  phone: document.getElementById("phone"),
  department: document.getElementById("department")
};

function showError(fieldName, message) {
  document.getElementById(`${fieldName}Error`).textContent = message;
  fields[fieldName].classList.toggle("invalid", Boolean(message));
  fields[fieldName].setAttribute("aria-invalid", Boolean(message));
}

function validateForm() {
  let valid = true;
  const name = fields.name.value.trim();
  const email = fields.email.value.trim();
  const password = fields.password.value;
  const phone = fields.phone.value.replace(/[\s()+-]/g, "");
  const department = fields.department.value;

  const checks = {
    name: name.length >= 2 && /^[A-Za-z][A-Za-z .'-]*$/.test(name)
      ? "" : "Enter a valid name (at least 2 letters).",
    email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)
      ? "" : "Enter a valid email address.",
    password: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(password)
      ? "" : "Use at least 8 characters, including a letter and a number.",
    phone: /^\d{10}$/.test(phone)
      ? "" : "Enter a valid 10-digit phone number.",
    department: department ? "" : "Please select a department."
  };

  Object.entries(checks).forEach(([fieldName, message]) => {
    showError(fieldName, message);
    if (message) valid = false;
  });
  return valid;
}

Object.entries(fields).forEach(([fieldName, field]) => {
  field.addEventListener("input", () => {
    successMessage.textContent = "";
    if (field.classList.contains("invalid")) {
      // Recheck the form so corrected fields clear their messages.
      validateForm();
    }
  });
  field.addEventListener("change", () => {
    successMessage.textContent = "";
    if (field.classList.contains("invalid")) validateForm();
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  successMessage.textContent = "";

  if (!validateForm()) {
    const firstInvalid = form.querySelector(".invalid");
    if (firstInvalid) firstInvalid.focus();
    return;
  }

  const employeeName = fields.name.value.trim();
  successMessage.textContent = `Registration form validated successfully for ${employeeName}!`;
  form.reset();
  Object.keys(fields).forEach((fieldName) => showError(fieldName, ""));
});
