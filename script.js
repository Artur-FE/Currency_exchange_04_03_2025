const currency = document.getElementById("currency");
let select = document.createElement("select");
select.id = "select";
let selectHeader = document.getElementById("selectHeader");
let currencyForSaleSelected = 'appleee';
let moneyForSale  = 0;
let moneyForPurchase = 0;
let moneyForPurchaseName = '';
let moneyForSaleName = '';
let inputCurrencyForPurchase = document.getElementById("inputCurrencyForPurchase");
let inputCurrencyForSale = document.getElementById("inputCurrencyForSale");



fetch(
  "https://openexchangerates.org/api/latest.json?app_id=ead5a20ec5224577bdd83ed2605ac073"
)
  .then((response) => {
    return response.json();
  })
  .then((latest) => {
    //console.log(`1 USD = ${latest.rates.RUB}`);
    const arrayKeys = Object.keys(latest.rates);
    //выпадающий список
    // arrayKeys.forEach((text, index) => {
    //     let option = new Option(text, "value" + index);
    //     select.add(option);
    //   });
    //   selectHeader.appendChild(select);

// //вывод всех курсов на странице
//     arrayKeys.forEach((element) => {
//       console.log(`1 USD = ${latest.rates[element]} ${element}`);
//       const li = document.createElement("li");
//       li.textContent = `
//         1 USD = ${latest.rates[element]} ${element}
//         `;
//       currency.appendChild(li);
//     });


// // получаем выбранную валюту в выпадающем списке для продажи

//const currencyForPurchase = document.getElementById('CurrencyForPurchase');
//const CurrencyForPurchaseValue = currencyForPurchase.options[currencyForPurchase.selectedIndex].value;

// //получаем выбранную валюту в выпадающем списке для покупки    
// let selectElement = document.getElementById('CurrencyForSale');
    // let selectedValue = selectElement.options[selectElement.selectedIndex].value;



     //получаем значение выбранное пользователем в выпадающем списке CurrencyForSale после нажатия на кнопку 
   
     currencyForSaleSelected = document.getElementById('CurrencyForSale');
     let currencyForPurchaseSelected = document.getElementById('CurrencyForPurchase'); 
     console.log(currencyForPurchaseSelected);
     

    currencyForPurchaseSelected.onchange = function() {
      
      console.log('onchange сработал');
      console.log(inputCurrencyForPurchase.value);
      
      
		currencyForSaleSelected = document.getElementById('CurrencyForSale').value; 
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
                  inputCurrencyForPurchase.value = moneyForPurchase/moneyForPurchase;
                inputCurrencyForSale.value = moneyForSale/moneyForPurchase;
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
      console.log(inputCurrencyForSale.value);      
      inputCurrencyForSale.value = inputCurrencyForPurchase.value * moneyForSale/moneyForPurchase; 
    };
// ловим значение (количество валюты) из input inputCurrencyForSale и выводим 
   // в inputCurrencyForPurchase итоговую сумму которую должен заплатить человек для получения того количества валюты 
   // которое он указал в inputCurrencyForSale

    inputCurrencyForSale.oninput = function() {
      console.log(inputCurrencyForPurchase.value);
      inputCurrencyForPurchase.value = inputCurrencyForSale.value / (moneyForSale/moneyForPurchase); 
    };
  });

    

  




  
  
  

