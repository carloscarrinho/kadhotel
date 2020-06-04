/** 
 * Estabelecendo o estado inicial da aplicação: 
*/
  // Elementos HTML: formulário hospede
  let form = null;
  let first_name = null;
  let last_name = null;
  let email = null;
  let dob = null;
  let street = null;
  let number = null;
  let complement = null;
  let zip_code = null;
  let neighborhood = null;
  let city = null;
  let uf = null;
  let identity = null;
  let marital_status = null;

  // Dados do hóspede
  let user = [];

/** 
 * Iniciando aplicação a partir do carregamento da página
 */
window.addEventListener('load', () => {
  form = document.querySelector('#user');
  first_name = document.querySelector('#first_name');
  last_name = document.querySelector('#last_name');
  email = document.querySelector('#email');
  dob = document.querySelector('#dob');
  street = document.querySelector('#street');
  number = document.querySelector('#number');
  complement = document.querySelector('#complement');
  zip_code = document.querySelector('#zip_code');
  neighborhood = document.querySelector('#neighborhood');
  city = document.querySelector('#city');
  uf = document.querySelector('#uf');
  identity = document.querySelector('#identity');
  marital_status = document.querySelector('#marital_status');

  form.addEventListener('submit', registerUser);
});

// função que registra os dados do hóspede a partir do submit do formulário
function registerUser(event) {
  event.preventDefault();
  
  validateEmail(email.value);
  validateZipCode(zip_code.value);

  user.push(
    first_name.value,
    last_name.value,
    email.value,
    dob.value,
    street.value,
    number.value,
    complement.value,
    zip_code.value,
    neighborhood.value,
    city.value,
    uf.value,
    identity.value,
    marital_status.value
  );
}

// funções de validação dos campos

  // validação de email com Regex
  function validateEmail(mail) {
    let mailRegex = /[a-z]{2,}@[a-z]{3,}.[a-z]{3}(.[a-z]+)?/;
    let isValid = mailRegex.test(mail);

    if(!isValid) {
      return showMsg('error', 'e-mail');
    } 
    return showMsg('success');
  }

  function validateZipCode(number) {
    let zipCodeRegex = /[1-9]{5}\d{3}/
    let isValid = zipCodeRegex.test(number);
    
    if(!isValid) {
      return showMsg('error', 'CEP');
    } 
    return showMsg('success');
  }


// função que apresenta mensagem de retorno para usuário
function showMsg(type, field = '') {
  if(type === 'success') {
    console.log('Hóspede cadastrado com sucesso!'); 
  } else {
    console.log(`Por favor, preencha corretamente o campo ${field}`); 
  }
}