import { getEmailAndId, showToastifyError } from "./utils";

window.addEventListener("DOMContentLoaded", () => {
  const submitButton = document.querySelector(".torra_form_button button");
  const checkboxes = document.querySelectorAll(
    ".torra_form .control-box .control-group > label > input[type='checkbox']"
  );
  const maisBeneficios = document.querySelector(`input[value="Mais benefícios"]`);
  const optionsMaisBeneficios = document.querySelector(".subitem-beneficios");
  const optionsMaisBeneficiosInputs = document.querySelectorAll(".subitem-beneficios input");
  const nenhumaAlternativa = document.querySelector(`input[value="Nenhuma das alternativas acima"]`);
  const inputNenhumaAlternativa = document.querySelector(".subitem-nenhuma");
  const checkboxesExceptNenhuamAlternativa = document.querySelectorAll(
    'input[type="checkbox"]:not([value="Nenhuma das alternativas acima"])'
  );
  const checkboxesExceptMaisBeneficios = document.querySelectorAll(
    'input[type="checkbox"]:not([value="Mais benefícios"])'
  );

  const onlyOneChecked = () => {
    checkboxesExceptMaisBeneficios.forEach((checkbox) => {
      checkbox.addEventListener("change", function () {
        if (this.checked) {
          checkboxesExceptMaisBeneficios.forEach((cb) => {
            if (cb !== this) {
              cb.checked = false;
            }
          });
        }
      });
    });
  };

  const clearMaisBeneficios = () => {
    checkboxesExceptMaisBeneficios.forEach((item) => {
      item.addEventListener("click", () => {
        if (!item.closest(".subitem-beneficios")) {
          optionsMaisBeneficios.classList.remove("show");
          maisBeneficios.checked = false;
          optionsMaisBeneficiosInputs.forEach((item) => (item.checked = false));
        }
      });
    });
  };

  const showMaisBeneficiosOptions = () => {
    maisBeneficios.addEventListener("change", (e) => {
      optionsMaisBeneficios.classList.toggle("show");
      if (!e.target.checked) {
        const optionsInput = optionsMaisBeneficios.querySelectorAll("input");
        optionsInput.forEach((input) => (input.checked = false));
      } else {
        checkboxesExceptMaisBeneficios.forEach((item) => (item.checked = false));
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

  const atLeastOneTrueOrValidString = (obj) => {
    return Object.keys(obj).some((key) => {
      const value = obj[key];
      return value === true || (typeof value === "string" && value.trim() !== "");
    });
  };

  const sendForm = () => {
    submitButton.addEventListener("click", async (e) => {
      e.preventDefault();

      const email = getEmailAndId();

      const qualidade_produto = document.querySelector(`input[value="Qualidade do produto"]`).checked;
      const variedade_produtos = document.querySelector(`input[value="Variedade de produtos"]`).checked;
      const disponibilidade_tamanhos = document.querySelector(`input[value="Disponibilidade de tamanhos"]`).checked;
      const menor_prazo_de_entrega = document.querySelector(`input[value="Menor prazo de entrega"]`).checked;
      const frete_gratis = document.querySelector(`input[value="Frete grátis"]`).checked;
      const facilidade_troca_devolucao = document.querySelector(
        `input[value="Facilidade para troca e devolução"]`
      ).checked;
      const cupom_desconto = document.querySelector(`input[value="Cupons de desconto"]`).checked;
      const desconto_progressivo = document.querySelector(`input[value="Descontos Progressivos"]`).checked;
      const programa_fidelidade = document.querySelector(`input[value="Programa de Fidelidade"]`).checked;
      const cashback_compras = document.querySelector(`input[value="Cashback nas Compras"]`).checked;
      const menor_preco = document.querySelector(`input[value="Menor Preço"]`).checked;
      const nenhuma_anterior = document.querySelector(`.input_nenhuma`).value;
      const motivo_escolha = document.querySelector(`.input_explicacao`).value;

      const fields = {
        qualidade_produto,
        variedade_produtos,
        disponibilidade_tamanhos,
        menor_prazo_de_entrega,
        frete_gratis,
        facilidade_troca_devolucao,
        cupom_desconto,
        desconto_progressivo,
        programa_fidelidade,
        cashback_compras,
        menor_preco,
        nenhuma_anterior
      };

      if (!atLeastOneTrueOrValidString(fields)) return showToastifyError("Selecione uma das opções");

      if (!email) {
        showToastifyError("Tivemos um erro para capturar seu e-mail");
        return;
      }

      const sendData = Object.assign(fields, { email, motivo_escolha });

      const data = JSON.stringify({
        deName: "Tb_cloudPage_pesquisa_reCompra",
        fields: sendData
      });

      submitButton.innerText = "Enviando...";
      submitButton.disabled = true;
      submitButton.style.pointerEvents = "none";

      try {
        const response = await fetch("/integracao-torra-pesquisa", {
          method: "POST",
          body: data
        });

        if (!response.ok) {
          throw new Error("Erro no envio dos dados");
        }

        const responseData = await response.json();

        if (responseData.statusCode === 400) {
          showToastifyError("Ops! Resposta já cadastrada!");
        }

        if (responseData.statusCode === 500) {
          showToastifyError("Ops! Revise seus dados e tente novamente!");
        }

        if (responseData.statusCode === 200) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Enviado com sucesso!",
            showConfirmButton: false,
            timer: 3000
          });

          document.querySelector("form").reset();
        }
      } catch (error) {
        showToastifyError("Ops! Resposta já cadastrada!");
      } finally {
        setTimeout(() => {
          submitButton.innerText = "Enviar";
          submitButton.disabled = false;
          submitButton.style.pointerEvents = "auto";
        }, 1000);
      }
    });
  };

  onlyOneChecked();
  clearMaisBeneficios();
  sendForm();
  showMaisBeneficiosOptions();
  showNenhumaInputText();
  uncheckNenhumaAlternativa();
});
