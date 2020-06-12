# Atividade Pontuada 2 - Análise e Desenvolvimento de Sistemas UVV
## Disciplina - Programação Web
## Objetivo
Fazer uma página com **HTML5** contendo um formulário para um negócio de reserva de hotel.

## Premissas
### Campos do Hóspede: 
* (✓) Nome, 
* (✓) e-mail.
* (✓) cpf, 
* (✓) identidade (RG), 
* (✓) Tel fixo, 
* (✓) celular, 
* (✓) estado civil, 
* (✓) data nascimento, 
* (✓) endereço(logradouro, número, complemento, bairro, cidade, estado, cep) , 

### "Campos" do Hotel: 
<!-- confuso -->
* (✓) foto do hotel e quartos/hall de entrada/logo do hotel(upload arquivo), 
* (✓) texto sobre o hotel, 
* (✓) endereço do hotel, 
* (✓) telefone do hotel, 
* (✓) celular do hotel, 
* (✓) e-mail do hotel, 
* (✓) o que é oferecido em cada tipo/categoria de quarto, 

<!-- ook -->
* (✓) data de entrada da estadia,
* (✓) data de saída da estadia, 
* (✓) mensagem (para algum pedido do hóspede), 
* (✓) categoria do quarto, 
* (✓) valor da diária em função da categoria do quarto, 
* (✓) valor total, 
* (✓) forma de pagamento (escolher entre: cartão Visa, cartão Mastercard, cartão American Express, boleto).

### Validações
Além de construir a página web do hotel que deve ter um form, implementar as seguintes validações/cálculos/formatações:

(✓) 1. Fazer a validação de campos numéricos, e-mail, cep, datas, estado, telefones, usando os recursos do html 5 (impute type e expressões regulares).

(✓) 2. Fazer uma função em javascript (arquivo validacoes.js) que valida a data de saída da estadia: a data de saída deve ser mais antiga que a data de entrada. Caso contrário, emitir uma mensagem de erro. A função deve se chamar validaDataSaida.

(✓) 3. Fazer uma função javascript  (arquivo validacoes.js) para computar valor total da diária em função de quantos dias o hóspede irá ficar hospedado. Atribuir para o campo valor total o valor computado pela função. A função deve se chamar computaValorDaEstadia.

(✓) 4. Usar CSS/style (arquivo regras.css) para customizar a página.

## Saídas

### Visão Geral

![Visão geral](https://github.com/carloscarrinho/kadhotel/blob/master/img/overview_kadhotel.gif)

### Topo do site
![Topo do site](https://github.com/carloscarrinho/kadhotel/blob/master/img/img_1.png)

### Seções sobre os recursos do hotel
![Seções do site](https://github.com/carloscarrinho/kadhotel/blob/master/img/img_2.png)

![Seções do site 2](https://github.com/carloscarrinho/kadhotel/blob/master/img/img_3.png)

### Carousel dos quartos
![Carousel de quartos](https://github.com/carloscarrinho/kadhotel/blob/master/img/gif_1.gif)

### Rodapé da página com informações sobre o hotel
![Imagem do rodapé](https://github.com/carloscarrinho/kadhotel/blob/master/img/img_4.png)

### Ativando o formulário e validação dos campos
![Ativando o formulário](https://github.com/carloscarrinho/kadhotel/blob/master/img/gif_2.gif)

### Campos de diária e valor total dinâmicos e mensagem de confirmação ao usuário
![Submetendo o formulário](https://github.com/carloscarrinho/kadhotel/blob/master/img/gif_3.gif)
