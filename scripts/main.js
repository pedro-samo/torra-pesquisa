import { getEmailAndId, getSelectedValue, getMultiSelectedValue, showToastifyError } from "./utils";

window.addEventListener("DOMContentLoaded", () => {
  const optionsMaisBeneficios = document.querySelector(".subitem-beneficios");
  const nenhumaAlternativa = document.querySelector(`input[value="Nenhuma das alternativas acima"]`);
  const inputNenhumaAlternativa = document.querySelector(".subitem-nenhuma");
  const checkboxesExceptNenhuamAlternativa = document.querySelectorAll(
    'input[type="checkbox"]:not([value="Nenhuma das alternativas acima"])'
  );

  const showMaisBeneficiosOptions = () => {
    const maisBeneficios = document.querySelector(`input[value="Mais benefícios"]`);
    maisBeneficios.addEventListener("change", (e) => {
      optionsMaisBeneficios.classList.toggle("show");
      if (!e.target.checked) {
        const optionsInput = optionsMaisBeneficios.querySelectorAll("input");
        optionsInput.forEach((input) => (input.checked = false));
      }
    });
  };

  const showNenhumaInputText = () => {
    const allInputs = document.querySelectorAll(".control-box input");
    nenhumaAlternativa.addEventListener("change", (e) => {
      inputNenhumaAlternativa.classList.toggle("show");
      if (e.target.checked) {
        optionsMaisBeneficios.classList.remove("show");
        allInputs.forEach((input) => (input.checked = false));
        e.target.checked = true;
      }
    });
  };

  const uncheckNenhumaAlternativa = () => {
    checkboxesExceptNenhuamAlternativa.forEach(function (checkbox) {
      checkbox.addEventListener("click", function () {
        nenhumaAlternativa.checked = false;
        inputNenhumaAlternativa.classList.remove("show");
        inputNenhumaAlternativa.querySelector("input").value = "";
      });
    });
  };

  // const sendForm = () => {
  //   submitButton.addEventListener("click", async (e) => {
  //     e.preventDefault();
  //     const Email = getEmailAndId().email;
  //     const Customer_ID = getEmailAndId().id;
  //     const TipoPeleRosto = getSelectedValue("TipoPeleRosto");
  //     const BeneficiosRelevantesProtetorSolar = getMultiSelectedValue("BeneficiosRelevantesProtetorSolar input");
  //     const JaUsouVichyIdealSoleilClarify = getSelectedValue("JaUsouVichyIdealSoleilClarify");
  //     const JaUsouVichyCapitalSoleilUVPigmentControl = getSelectedValue("JaUsouVichyCapitalSoleilUVPigmentControl");
  //     const ProtetorSolarUsaAtualmente = document.getElementById("ProtetorSolarUsaAtualmente").value;
  //     const vichyIdealModalAnswers = () => {
  //       const result = {};
  //       vichyIdealModalQuestions.forEach((question) => {
  //         result[question] = getSelectedValue(question);
  //       });
  //       return result;
  //     };
  //     const vichyCapialModalAnswers = () => {
  //       const result = {};
  //       vichyCapialModalQuestions.forEach((question) => {
  //         result[question] = getSelectedValue(question);
  //       });
  //       return result;
  //     };
  //     if (!Email || !Customer_ID) {
  //       showToastifyError("Tivemos um erro para capturar seu e-mail");
  //       return;
  //     }
  //     if (
  //       !TipoPeleRosto ||
  //       !BeneficiosRelevantesProtetorSolar ||
  //       !JaUsouVichyIdealSoleilClarify ||
  //       !JaUsouVichyCapitalSoleilUVPigmentControl ||
  //       !ProtetorSolarUsaAtualmente
  //     ) {
  //       showToastifyError("Responda todas as perguntas");
  //       return;
  //     }
  //     const fields = {
  //       Email,
  //       Customer_ID,
  //       TipoPeleRosto,
  //       BeneficiosRelevantesProtetorSolar,
  //       JaUsouVichyIdealSoleilClarify,
  //       JaUsouVichyCapitalSoleilUVPigmentControl,
  //       ProtetorSolarUsaAtualmente,
  //       ...vichyIdealModalAnswers(),
  //       ...vichyCapialModalAnswers()
  //     };
  //     const data = JSON.stringify({
  //       deName: "tb_PesquisaProtetorSolarVichy",
  //       fields
  //     });
  //     submitButton.innerText = "Enviando...";
  //     submitButton.disabled = true;
  //     submitButton.style.pointerEvents = "none";
  //     try {
  //       const response = await fetch("/integracao-dermaclub-pesquisa", {
  //         method: "POST",
  //         body: data
  //       });
  //       if (!response.ok) {
  //         throw new Error("Erro no envio dos dados");
  //       }
  //       const responseData = await response.json();
  //       if (responseData.statusCode === 400) {
  //         showToastifyError("Ops! E-mail já cadastrado!");
  //       } else if (responseData.statusCode === 500) {
  //         showToastifyError("Ops! Revise seus dados e tente novamente!");
  //       } else {
  //         window.location.href =
  //           process.env.NODE_ENV === "production" ? "/dermaclub-vichy-success" : "/dermaclub-vichy-success.html";
  //       }
  //     } catch (error) {
  //       showToastifyError("Ops! E-mail já cadastrado!");
  //     } finally {
  //       setTimeout(() => {
  //         submitButton.innerText = "Enviar";
  //         submitButton.disabled = false;
  //         submitButton.style.pointerEvents = "auto";
  //       }, 1000);
  //     }
  //   });
  // };
  // sendForm();

  showMaisBeneficiosOptions();
  showNenhumaInputText();
  uncheckNenhumaAlternativa();
});
