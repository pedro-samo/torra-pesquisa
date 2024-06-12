export const showToastifyError = (text) => {
  Toastify({
    text: text,
    duration: 2000,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background: "#eb5757"
    }
  }).showToast();
};

export const getEmailAndId = () => {
  const searchParams = new URLSearchParams(new URL(window.location).search);
  const email = searchParams.get("email");
  return email;
};

export const getSelectedValue = (name) => {
  const radioButtons = document.querySelectorAll(`input[name="${name}"]`);
  let selectedValue;
  radioButtons.forEach((radioButton) => {
    if (radioButton.checked) {
      selectedValue = radioButton.getAttribute("value");
    }
  });
  return selectedValue ?? "";
};

export const getMultiSelectedValue = (selector) => {
  const radioButtons = document.querySelectorAll("." + selector);
  let selectedValue = [];

  radioButtons.forEach((radioButton) => {
    if (radioButton.checked) {
      selectedValue.push(radioButton.getAttribute("value"));
    }
  });

  return selectedValue.join("; ");
};

export const selectInpustMaximum = (element, maximumCheceked) => {
  const radioInputs = document.querySelectorAll("." + element);

  let checkedInputs = [];

  radioInputs.forEach(function (input) {
    input.addEventListener("change", function () {
      if (this.checked) {
        if (checkedInputs.length >= maximumCheceked) {
          clearPreviousSelections();
        }
        checkedInputs.push(this);
      } else {
        checkedInputs = checkedInputs.filter((item) => item !== this);
      }
    });
  });

  function clearPreviousSelections() {
    checkedInputs.forEach(function (input) {
      input.checked = false;
    });
    checkedInputs = [];
  }
};
