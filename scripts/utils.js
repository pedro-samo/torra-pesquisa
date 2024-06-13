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
