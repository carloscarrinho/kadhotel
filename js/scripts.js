/**
 * Estabelecendo estado inicial da aplicação
 * (variáveis globais)
 */
// Campos do formulário de reserva
let form = null;
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
let divAlert = null;

// preços e valores
let standardPrice = 120;
let plusPrice = 200;
let masterPrice = 280;
let currentPrice = 0;
let reservationTotal = 0;

// número de dias da estadia
let day = null;

/**
 * Implementando a validação do formulário de reserva
 */

// função que carrega os elementos e monitora a mudança de estado no formulário
window.addEventListener("load", () => {
  // montando o estado da aplicação (carregando os campos do formulário)
  form = document.querySelector('#reservation_form');
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
  divAlert = document.querySelector('#msg-alert');
  days = 1;
  
  // atualizando o valor do campo 'Valor da diária'
  showRoomPrice();

  // estabelecendo data mínima para checkin
  setMinDateForCheckin();

  // monitorando e atualizando o total da reserva com base no número total de dias da estadia
  checkout.addEventListener('change', () => {
    countDays();
    computaValorDaEstadia();
  });

  // monitorando e atualizando o total da reserva com base no valor da diária
  roomType.addEventListener('change', () => {
    computaValorDaEstadia();
  });

  // monitorando envio do formulário
  submitButton.addEventListener("click", registerUser);
});

// função que chama as validações dos campos e realiza o registro do hóspede
function registerUser(event) {
  // desabilitando o carregamento da página após o clique no botão de submit
  event.preventDefault();

  // validando campos
  let mailIsValid = validateEmail(email);
  let cpfIsValid = validateCpf(cpf);
  let rgIsValid = validateRg(rg);
  let phoneIsValid = validatePhone(phone);
  let cellphoneIsValid = validateCellphone(cellphone);
  let birthIsValid = validateBirth(birth);
  let zipcodeIsValid = validateZipCode(zipCode);
  let checkoutIsValid = validaDataSaida(checkin, checkout);
  
  if(
    mailIsValid &&
    cpfIsValid &&
    rgIsValid &&
    phoneIsValid &&
    cellphoneIsValid &&
    birthIsValid &&
    zipcodeIsValid &&
    checkoutIsValid
  ) {
    catchUserData();
    showMsg("success");
  } else {
    return;
  }
  // capturando dados do formulário e imprimindo no console
}

// função que apresenta mensagem de retorno para usuário
function showMsg(type, field = null, nameField = "") {
  let box = document.createElement('div');
  box.setAttribute('role', 'alert');
  if(type === "error") {
    box.classList.add('alert', 'alert-warning');
    box.innerHTML = `Por favor, preencha corretamente o campo "${nameField}"!`;
    divAlert.appendChild(box);
    field.focus();
    setInterval(() => {
      divAlert.innerHTML = "";
    }, 5000);
  } else {
    box.classList.add('alert', 'alert-success');
    box.innerHTML = "Reserva efetuada com sucesso, até breve!"
    divAlert.appendChild(box);
    form.reset();
    setInterval(() => {
      divAlert.innerHTML = "";
    }, 5000);
  }
}

// função que realiza a validação de email com Regex
function validateEmail(field) {
  let mailRegex = /[a-z]{2,}@[a-z]{3,}.[a-z]{3}(.[a-z]+)?/;
  let isValid = mailRegex.test(field.value);
  if (!isValid) {
    showMsg("error", field, "e-mail");
    return isValid;
  }
  return isValid;
}

// função que realiza a validação de CPF com Regex
function validateCpf(field) {
  let cpfRegex = /[0-9]{11}/;
  let isValid = cpfRegex.test(field.value);
  if (!isValid) {
    showMsg("error", field, "CPF");
    return isValid;
  }
  return isValid;
}

// função que realiza a validação de RG com Regex
function validateRg(field) {
  let rgRegex = /[0-9]{7,10}/;
  let isValid = rgRegex.test(field.value);
  if (!isValid) {
    showMsg("error", field, "RG");
    return isValid;
  }
  return isValid;
}

// função que realiza a validação do Telefone Fixo com Regex
function validatePhone(field) {
  let phoneRegex = /[1-9][0-9]{9}/;
  let isValid = phoneRegex.test(field.value);
  if (!isValid) {
    showMsg("error", field, "Telefone Fixo");
    return isValid;
  }
  return isValid;
}

// função que realiza a validação do Celular com Regex
function validateCellphone(field) {
  let cellphoneRegex = /[1-9][0-9]{10}/;
  let isValid = cellphoneRegex.test(field.value);
  if (!isValid) {
    showMsg("error", field, "Celular");
    return isValid;
  }
  return isValid;
}

// função que valida se o usuário está tentando enviar data de nascimento no futuro
function validateBirth(field) {
  let userBirthday = Date.parse(field.value);
  let today = Date.now();
  let isValid = today > userBirthday;  
  if(!isValid) {
    showMsg('error', field, 'Data de Nascimento');
    return isValid;
  }
  return isValid;
}

// função que realiza a validação do CEP com Regex
function validateZipCode(field) {
  let zipCodeRegex = /[1-9]{5}\d{3}/;
  let isValid = zipCodeRegex.test(field.value);
  if (!isValid) {
    showMsg("error", field, "CEP");
    return isValid;
  }
  return isValid;
}

// função que formata a moeda para o padrão Brasileiro
function formatNumber(number) {
  // return numberFormat.format(number.toFixed(2));
  let string = `R$ ${number.toFixed(2)}`;
  let formatted = string.replace('.', ',');
  return formatted;
}

// função que apresenta o valor da diária conforme escolha do tipo de quarto
function showRoomPrice() {
  currentPrice = standardPrice;
  roomPrice.value = formatNumber(currentPrice);
  roomType.addEventListener("change", () => {
    if (roomType.value === "standard") {
      currentPrice = standardPrice;
      roomPrice.value = formatNumber(currentPrice);
    } else if (roomType.value === "plus") {
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
  let checkinDate = Date.parse(checkin.value);
  let checkoutDate = Date.parse(checkout.value);
  let isValid = checkoutDate > checkinDate;
  if(!isValid) {
    showMsg('error', checkout, 'Data de Saída');
    return isValid;
  }
  return isValid;
}

function countDays() { 
  let checkinDate = new Date(checkin.value);
  let checkoutDate = new Date(checkout.value);
  let milliseconds = checkoutDate - checkinDate;
  days = milliseconds / 86400000;
}

function computaValorDaEstadia() {
  reservationTotal = days * currentPrice;
  if(reservationTotal <= 0){
    bookTotal.value = "Erro na data";
    return;
  }
  bookTotal.value = formatNumber(reservationTotal);
}

// função que armazena os dados enviados em um objeto
function catchUserData() {
  let user = {
    // gerando um id aleatório entre 0 e 1000
    id: Math.floor(Math.random() * 1000),
    // capturando os valores atuais dos campos
    name: name.value,
    email: email.value,
    cpf: cpf.value,
    rg: rg.value,
    phone: phone.value,
    cellphone: cellphone.value,
    marital_status: maritalStatus.value,
    birth: birth.value,
    street: street.value,
    number: number.value,
    complement: complement.value,
    neighborhood: neighborhood.value,
    city: city.value,
    state: state.value,
    zip_code: zipCode.value,
    room_type: roomType.value,
    payment_method: paymentMethod.value,
    checkin: checkin.value,
    checkout: checkout.value,
    days_quantity: days,
    total_price: reservationTotal,
    client_message: clientMessage.value,
  }
  console.log(user);
}

// função que limpa o formulário
function formClear() {
  
}