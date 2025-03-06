const currency = document.getElementById("currency");
let select = document.createElement("select");
select.id = "select";
let selectHeader = document.getElementById("selectHeader");
let currencyForSaleSelected = 'appleee';
let moneyForSale  = 0;
let moneyForPurchase = 0;


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


// получаем выбранную валюту в выпадающем списке для продажи

const currencyForPurchase = document.getElementById('CurrencyForPurchase');
const CurrencyForPurchaseValue = currencyForPurchase.options[currencyForPurchase.selectedIndex].value;
console.log(CurrencyForPurchaseValue);

//получаем выбранную валюту в выпадающем списке для покупки    
let selectElement = document.getElementById('CurrencyForSale');
    let selectedValue = selectElement.options[selectElement.selectedIndex].value;
    console.log(selectedValue);



     //получаем значение выбранное пользователем в выпадающем списке CurrencyForSale после нажатия на кнопку 

    butt.onclick = function() {
		currencyForSaleSelected = document.getElementById('CurrencyForSale').value; 
    let currencyForPurchaseSelected = document.getElementById('CurrencyForPurchase').value;     
     
      
      // выводим курс выбранной валюты относительно одного доллара
        arrayKeys.forEach((element) => {
//очищаем поле вывода от предыдущего значения 
          const currencyActualElement = document.getElementById('currencyActual');
              if(currencyActualElement) {
                currency.innerHTML = '';
              }
          
          
          if(element === currencyForSaleSelected) {
              
              //выводим курс валюты которую хотим купить
              moneyForSale  = `${latest.rates[element]} ${element}`;
              console.log(moneyForSale);
              
                console.log(`1 USD = ${latest.rates[element] *0.9 + latest.rates[element]} ${element}`);
                // const li = document.createElement("li");
                // li.id = "currencyActual"
                // li.textContent = `
                //   1 USD = ${latest.rates[element] *0.1 + latest.rates[element]} ${element}
                //   `;
                // currency.appendChild(li);
            }

            //выводим курс валюты которую хотим продать

            if(element === currencyForPurchaseSelected) {
             moneyForPurchase = `${latest.rates[element]} ${element}`;
             console.log(moneyForPurchase);
             
            }

            // проверяем, что значения валют покупки продажи найдены и выводим результат на страницу
           if(moneyForPurchase != 0 && moneyForSale != 0) {
              const li = document.createElement("li");
                li.id = "currencyActual"
                li.textContent = `
                  ${moneyForPurchase} = ${moneyForSale}
                  `;
                currency.appendChild(li);
                return;
           }
            
          });
        
};

    // for (const key in latest.rates) {

    //       //  console.log(key, latest.rates[key]);
    //         console.log(`1 USD = ${latest.rates[key]} - ${key}`)
    // }
  });

    

  




  
  
  

