window.addEventListener("load", function(){
  var sendEmailButton = document.getElementById('sendEmailButton');
  var emailData = document.getElementById('emailData');
  var emailField = document.getElementById('emailField');
  var emailError = document.getElementById('emailError');
  var showCurrency = document.getElementById('showCurrency');
  var dateToday = document.getElementsByClassName('dateToday')[0];
  var currencyExchange = document.getElementById('currencyExchange');
  //var tableCurrency = document.getElementsByClassName('tableCurrency')[0];
  var todayDate = new Date();
  
  //set date today for currency
  dateToday.innerHTML = todayDate.getDate() + " " + todayDate.getMonth()+1 + " " + todayDate.getFullYear() ;

  emailData.addEventListener('focus', function(e) {
    emailField.style.backgroundColor = '';
  });

  sendEmailButton.addEventListener('click', function(e) {
    var pattern = /^([a-z])+[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/g;
    if(!emailData.value.trim() || !pattern.test(emailData.value)){
      emailField.style.backgroundColor = '#eccfcf';
      emailData.value = "";
      emailError.innerHTML = '&#9993;&#10008;	';
      emailError.style.color = 'red';
      return;
    }
    var xhr = new XMLHttpRequest();
    emailError.innerHTML = '&#9993;&#10004';
    emailError.style.color = 'green';
    xhr.open('POST', '/sendEmail', true);
	
    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;

        if (xhr.status != 200) {
          console.log('Error ' + xhr.status + ': ' + xhr.statusText);
          return;
        }

		emailData.value = xhr.responseText;
      }
    xhr.send(JSON.stringify({mail:emailData.value}));
  });
  
  showCurrency.addEventListener('click', function(e) {
  
    var tableCurrency = document.createElement('div');
	tableCurrency.setAttribute('id', 'tableCurrency');
	currencyExchange.appendChild(tableCurrency);
	
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'getCurrency', true);
	
    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;

        if (xhr.status != 200) {
          console.log('Error ' + xhr.status + ': ' + xhr.statusText);
          return;
        }
		
		var res = JSON.parse(xhr.responseText);
		
		if(res == '') {
		  tableCurrency.innerHTML = '&#9785; Service is unavailable';
		  tableCurrency.style.color = 'red';
		}
		
		
		for(var i = 0; i < res.length; i++) {
		    var itemCurrency = document.createElement('div');
			itemCurrency.setAttribute('class', 'euroHolder');
			itemCurrency.innerHTML = "<b>From:</b> " + res[i].ccy + " <b>to:</b> " + res[i].base_ccy + ' <b>buy:</b> ' + res[i].buy + ' <b>sale:</b> ' + res[i].sale;
			tableCurrency.append(itemCurrency);
			console.log("in");
		} 
		
      }
    xhr.send(null);
  });
});