const currency = document.getElementById("currency");
let select = document.createElement("select");
select.id = "select";
let selectHeader = document.getElementById("selectHeader");
let moneyForSale  = 0;
let moneyForPurchase = 0;
let moneyForPurchaseName = '';
let moneyForSaleName = '';
let inputCurrencyForPurchase = document.getElementById("inputCurrencyForPurchase");
let inputCurrencyForSale = document.getElementById("inputCurrencyForSale");
let exchangeDataEntryForm = document.getElementById("exchangeDataEntryForm");

function clearExchangeDataEntryForm(){
  exchangeDataEntryForm.innerHTML =``;
}



fetch(
  "https://openexchangerates.org/api/latest.json?app_id=ead5a20ec5224577bdd83ed2605ac073"
)
  .then((response) => {
    return response.json();
  })
  .then((latest) => {
  
    const arrayKeys = Object.keys(latest.rates);

     //получаем значение выбранное пользователем в выпадающем списке CurrencyForSale после нажатия на кнопку 
     let currencyForPurchaseSelected = document.getElementById('CurrencyForPurchase'); 
     let currencyForSaleSelected = document.getElementById('CurrencyForSale');    

     // получаем доступ к input при первой загрузке страницы
     
     const startValueInputCurrencyForPurchase = document.getElementById("inputCurrencyForPurchase");
     const startValueInputCurrencyForSale = document.getElementById("inputCurrencyForSale");
    
     console.log(currencyForSaleSelected.value);
     moneyForPurchase = latest.rates[currencyForPurchaseSelected.value];
     moneyForSale  = latest.rates[currencyForSaleSelected.value];
    console.log(moneyForPurchase);
    console.log(moneyForSale);
    
    // выводим курс в input валют которые выбраны по умолчанию при первой загрузке страницы

     startValueInputCurrencyForPurchase.value = latest.rates[currencyForPurchaseSelected.value].toFixed(2);
     startValueInputCurrencyForSale.value = latest.rates[currencyForSaleSelected.value].toFixed(2);
     console.log(typeof latest.rates[currencyForPurchaseSelected.value]);
     
// функция пересчета курса выбранных валют в окнах input
    
    function exchange() {
      console.log('onchange сработал');
      console.log(inputCurrencyForPurchase.value);
      //очищаем выпадающее поле для обмена после установки новых значений в выпадающем списке валют 
     clearExchangeDataEntryForm();

		let currencyForSaleSelected = document.getElementById('CurrencyForSale').value; 
    let currencyForPurchaseSelected = document.getElementById('CurrencyForPurchase').value;      
      // выводим курс выбранных валют относительно друг-друга
        arrayKeys.forEach((element) => {
      //очищаем поле вывода от предыдущего значения 
          const currencyActualElement = document.getElementById('currencyActual');
              if(currencyActualElement) {
                currency.innerHTML = '';
              }
          
          if(element === currencyForSaleSelected) {
              
              //записываем в переменные курс и название валюты которую хотим купить
              moneyForSale  = `${latest.rates[element]}`;
              moneyForSaleName = `${element}`;
                // const li = document.createElement("li");
                // li.id = "currencyActual"
                // li.textContent = `
                //   1 USD = ${latest.rates[element] *0.1 + latest.rates[element]} ${element}
                //   `;
                // currency.appendChild(li);
            }

            //записываем в переменные курс и название валюты которую хотим продать

            if(element === currencyForPurchaseSelected) {
             moneyForPurchase = `${latest.rates[element]}`;
             moneyForPurchaseName = `${element}`;       
            }

            // проверяем, что значения валют покупки продажи найдены и выводим результат на страницу
           if(moneyForPurchase != 0 && moneyForSale != 0) {
              const li = document.createElement("li");
                li.id = "currencyActual"
                li.textContent = `
                  ${moneyForPurchase/moneyForPurchase} ${moneyForPurchaseName} = 
                  ${moneyForSale/moneyForPurchase} ${moneyForSaleName}
                  `;
               //выводим значения курсов в input на странице
                  inputCurrencyForPurchase.value = (moneyForPurchase/moneyForPurchase).toFixed(2);
                inputCurrencyForSale.value = (moneyForSale/moneyForPurchase).toFixed(2);
                currency.appendChild(li);
                return;
           }
            
          });
        
};

   // ловим значение (количество валюты) из input inputCurrencyForPurchase и выводим 
   // в inputCurrencyForSale итоговую сумму которую получит человек при обмене количества валюты из inputCurrencyForPurchase

    const inputCurrencyForSale = document.getElementById("inputCurrencyForSale");
    const inputCurrencyForPurchase = document.getElementById("inputCurrencyForPurchase");

    inputCurrencyForPurchase.oninput = function() {       
      inputCurrencyForSale.value = (inputCurrencyForPurchase.value * moneyForSale/moneyForPurchase).toFixed(2); 
     //очищаем выпадающее поле для обмена после установки новых значений в input 
      clearExchangeDataEntryForm();
    };
// ловим значение (количество валюты) из input inputCurrencyForSale и выводим 
   // в inputCurrencyForPurchase итоговую сумму которую должен заплатить человек для получения того количества валюты 
   // которое он указал в inputCurrencyForSale

    inputCurrencyForSale.oninput = function() {
      inputCurrencyForPurchase.value = (inputCurrencyForSale.value / (moneyForSale/moneyForPurchase)).toFixed(2); 
      //очищаем выпадающее поле для обмена после установки новых значений в input 
     clearExchangeDataEntryForm();
    };

// вызов функции exchange() при выборе нужной валюты в выпадающем списке

    currencyForPurchaseSelected.onchange = function() {
      exchange();
    }

    currencyForSaleSelected.onchange = function() {
      exchange();
    }

    butt.onclick = function() {
      exchangeDataEntryForm.innerHTML =`
      <li><label for="sell">You sell a quantity of currency ${currencyForPurchaseSelected.value}:</label>
      <input type="text" id="sell" readonly value="${inputCurrencyForPurchase.value}" /> </li> 

       <li><label for="ccNumberTransferMoney">Number of the card from which you will transfer the money:</label>
      <input type="text" id="ccNumberTransferMoney" value="" autocomplete="cc-number" /></li>
      
      <li><label for="purchase">You purchase a quantity of currency ${currencyForSaleSelected.value}:</label>
      <input type="text" id="purchase" readonly value="${inputCurrencyForSale.value}" /></li>

      <li><label for="ccNumberReceiveTheMoney">Number of the card to which you want to receive the money:</label>
      <input type="text" id="ccNumberReceiveTheMoney" value="" autocomplete="cc-number" /></li>

      <li><label for="name">Enter your name:</label>
      <input type="text" id="name" value="" autocomplete="given-name" /></li>

      <li><label for="email">Enter your email:</label>
      <input type="email" id="email" value="" autocomplete="on"/></li>

      <li><label for="phoneNumber">Enter your phone number:</label>
      <input type="tel" id="phoneNumber" value="" autocomplete="tel" /></li>
      
      <button id="btnExchangeRequest" type="submit">Exchange request</button>
      
      `
    }
  

  });

  // function outputOfTheExchangeDataEntryForm() {
  //   exchangeDataEntryForm.innerHTML =`
  //   <li></li>
  //   `
  // }
    

  




  
  
  

