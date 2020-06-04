/**
 * Estabelecendo estado inicial da aplicação
 * (variáveis globais)
 */
// Campos do formulário de reserva
let name = null;
let email = null;
let cpf = null;
let rg = null;
let phone = null;
let cellphone = null;
let maritalStatus = null;
let birth = null;
let street = null;
let number = null;
let complement = null;
let neighborhood = null;
let city = null;
let state = null;
let zipCode = null;
let roomType = null;
let roomPrice = null;
let bookTotal = null;
let paymentMethod = null;
let checkin = null;
let checkout = null;
let clientMessage = null;

// botão de submit do formulário de reserva
let submitButton = null;

// alertas para o usuário
let warningAlert = null;
let successAlert = null;

// preços e valores
let standardPrice = 120;
let plusPrice = 200;
let masterPrice = 280;
let currentPrice = 0;
let reservationTotal = 0;

// número de dias da estadia
let day = 0;

/**
 * Implementando a validação do formulário de reserva
 */

// função que carrega os elementos e monitora a mudança de estado no formulário
window.addEventListener("load", () => {
  // montando o estado da aplicação (carregando os campos do formulário)
  name = document.querySelector("#name");
  email = document.querySelector("#email");
  cpf = document.querySelector("#cpf");
  rg = document.querySelector("#rg");
  phone = document.querySelector("#phone");
  cellphone = document.querySelector("#cellphone");
  maritalStatus = document.querySelector("#marital_status");
  birth = document.querySelector("#birth");
  street = document.querySelector("#street");
  number = document.querySelector("#number");
  complement = document.querySelector("#complement");
  neighborhood = document.querySelector("#neighborhood");
  city = document.querySelector("#city");
  state = document.querySelector("#state");
  zipCode = document.querySelector("#zip_code");
  roomType = document.querySelector("#room_type");
  roomPrice = document.querySelector("#room_price");
  bookTotal = document.querySelector("#book_total");
  paymentMethod = document.querySelector("#payment_method");
  checkin = document.querySelector("#checkin");
  checkout = document.querySelector("#checkout");
  clientMessage = document.querySelector("#client_message");
  submitButton = document.querySelector("#submit_button");
  warningAlert = document.querySelector(".alert-warning");
  successAlert = document.querySelector(".alert-success");

  // atualizando o valor do campo 'Valor da diária'
  showRoomPrice(roomType);

  // estabelecendo data mínima para checkin
  setMinDateForCheckin();

  // monitorando e atualizando o total da reserva com base no número total de dias da estadia
  checkout.addEventListener('change', () => {
    countDays();
    computaValorDaEstadia();
  });

  // monitorando envio do formulário
  submitButton.addEventListener("click", registerUser);
});

// função que chama as validações dos campos e realiza o registro do hóspede
function registerUser(event) {
  // desabilitando o carregamento da página após o clique no botão de submit
  event.preventDefault();

  // validateEmail(email.value);
  // validateBirth(birth.value);
  // validateCpf(cpf.value);
  // validateRg(rg.value);
  // validatePhone(phone.value);
  // validateCellphone(cellphone.value);
  // validateZipCode(zipCode.value);
  // validaDataSaida(checkin.value, checkout.value);
}

// função que apresenta mensagem de retorno para usuário
function showMsg(type, field = "") {
  if (type === "success") {
    console.log("Sua reserva foi realizada com sucesso!");
    successAlert.removeAttribute("hidden");
    warningAlert.setAttribute("hidden", "true");
  } else {
    console.log(`Por favor, preencha corretamente o campo ${field}`);
    warningAlert.removeAttribute("hidden");
    successAlert.setAttribute("hidden", "true");
  }
}

// função que realiza a validação de email com Regex
function validateEmail(string) {
  let mailRegex = /[a-z]{2,}@[a-z]{3,}.[a-z]{3}(.[a-z]+)?/;
  let isValid = mailRegex.test(string);

  if (!isValid) {
    return showMsg("error", "e-mail");
  }
  // return showMsg('success');
}

// função que realiza a validação de CPF com Regex
function validateCpf(number) {
  let cpfRegex = /[0-9]{11}/;
  let isValid = cpfRegex.test(number);

  if (!isValid) {
    return showMsg("error", "CPF");
  }
}

// função que realiza a validação de RG com Regex
function validateRg(number) {
  let rgRegex = /[0-9]{7,10}/;
  let isValid = rgRegex.test(number);

  if (!isValid) {
    return showMsg("error", "RG");
  }
}

// função que realiza a validação do Telefone Fixo com Regex
function validatePhone(number) {
  let phoneRegex = /[1-9]{10}/;
  let isValid = phoneRegex.test(number);

  if (!isValid) {
    return showMsg("error", "Telefone Fixo");
  }
}

// função que realiza a validação do Celular com Regex
function validateCellphone(number) {
  let cellphoneRegex = /[1-9]{11}/;
  let isValid = cellphoneRegex.test(number);

  if (!isValid) {
    return showMsg("error", "Celular");
  }
}

// função que valida se o usuário está tentando enviar data de nascimento no futuro
function validateBirth(date) {
  let userBirthday = Date.parse(date);
  let today = Date.now();
  if(userBirthday >= today ) {
    showMsg('error', 'Data de Nascimento');
    return;
  }
  return;
}

// função que realiza a validação do CEP com Regex
function validateZipCode(number) {
  let zipCodeRegex = /[1-9]{5}\d{3}/;
  let isValid = zipCodeRegex.test(number);

  if (!isValid) {
    return showMsg("error", "CEP");
  }
  return showMsg("success");
}

// função que formata a moeda para o padrão Brasileiro
function formatNumber(number) {
  // return numberFormat.format(number.toFixed(2));
  let string = `R$ ${number.toFixed(2)}`;
  let formatted = string.replace('.', ',');
  return formatted;
}

// função que apresenta o valor da diária conforme escolha do tipo de quarto
function showRoomPrice(roomTypeElement) {
  currentPrice = standardPrice;
  roomPrice.value = formatNumber(currentPrice);
  
  roomTypeElement.addEventListener("change", () => {
    if (roomTypeElement.value === "standard") {
      currentPrice = standardPrice;
      roomPrice.value = formatNumber(currentPrice);
    } else if (roomTypeElement.value === "plus") {
      currentPrice = plusPrice;
      roomPrice.value = formatNumber(currentPrice);
    } else {
      currentPrice = masterPrice;
      roomPrice.value = formatNumber(currentPrice);
    }
  });
}

// função que define a data atual como a mínima para checkin
function setMinDateForCheckin() {
  let today = new Date();
  let day = today.getDate();
  let month = today.getMonth();
  let year = today.getFullYear();
  today = `${year}-${month + 1}-${day}`;
  console.log();
  checkin.setAttribute('min', today);
  checkin.value = today;
}

// função que verifica se a data de entrada é posterior a data de saída
function validaDataSaida(checkin, checkout) {
  let checkinDate = Date.parse(checkin);
  let checkoutDate = Date.parse(checkout);
  if(checkinDate > checkoutDate) {
    showMsg('error', 'Data de Saída');
    return;
  }
  return;
}

function countDays() { 
  let checkinDate = new Date(checkin.value);
  let checkoutDate = new Date(checkout.value);
  let milliseconds = checkoutDate - checkinDate;
  days = milliseconds / 86400000;
}

function computaValorDaEstadia() {
  reservationTotal = days * currentPrice;
  bookTotal.value = formatNumber(reservationTotal);
}