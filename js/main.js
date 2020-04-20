// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBBA8TWfMj49M_B1_fjdxaFOBJ4Et5zr5Y",
  authDomain: "rideshare-fd0e2.firebaseapp.com",
  databaseURL: "https://rideshare-fd0e2.firebaseio.com",
  projectId: "rideshare-fd0e2",
  storageBucket: "rideshare-fd0e2.appspot.com",
  messagingSenderId: "647353302472",
  appId: "1:647353302472:web:412d154497a7ad30af14fd",
  measurementId: "G-0XBSXP8RCT"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Firebase reference
var database = firebase.database();

var elmtTable = document.getElementById('allOffers');
var tableRows = elmtTable.getElementsByTagName('tr'); 
var rowCount = tableRows.length;
for (var x=rowCount-1; x>0; x--) {
  tableRows[x].innerHTML = '';
}

var elmtTable = document.getElementById('requests');
var tableRows = elmtTable.getElementsByTagName('tr'); 
var rowCount = tableRows.length;
for (var x=rowCount-1; x>0; x--) {
  tableRows[x].innerHTML = '';
}

var ref = database.ref('Offers');
ref.on('value', getData, errData);

function submitClick() {
    var nameText = document.getElementById("nameText").value;
    var fromBowdoin = document.getElementById("fromBowdoin").checked;
    var fromPWM = document.getElementById("fromPWM").checked;
    var fromOther = document.getElementById("fromOther").value;
    var fromLocation = "NONE";

    var toBowdoin = document.getElementById("toBowdoin").checked;
    var toPWM = document.getElementById("toPWM").checked;
    var toOther = document.getElementById("toOther").value;
    var toLocation = "NONE";

    var datepicker = document.getElementById("datepicker").value;
    var time = document.getElementById("time").value;
    var passengers = document.getElementById("numOfPassengers").value;
    var price = document.getElementById("price").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var addInfo = document.getElementById("addInfo").value;

    if (fromBowdoin) {
      fromLocation = "Bowdoin";
    } else if (fromPWM) {
      fromLocation = "PWM";
    } else {
      fromLocation = fromOther;
    }

    if (toBowdoin) {
      //toLocation = document.getElementById("toA").textContent;
      toLocation = "Bowdoin";
    } else if (toPWM) {
      toLocation = "PWM";
    } else {
      toLocation = toOther;
    }

    uploadData(nameText, fromLocation, toLocation, datepicker, time, passengers, price, email, phone, addInfo);

    var ids = ["nameText","fromBowdoin","fromPWM","fromOther","toBowdoin","toPWM",
    "toOther","datepicker","time","numOfPassengers","price","email","phone","addInfo"];
    reset(ids);

}

function reset(elementId){
  for (element of elementId) {
    var resetElement = document.getElementById(element);
    if (resetElement.type == "text" || resetElement.type == "time" || resetElement.type == "email" || resetElement.type == "tel"){
      resetElement.value= "";
    } else if (resetElement.type == "radio") {
      resetElement.checked = false;
    } else if (elementId == "numOfPassengers") {
      resetElement.value = "1";
    } else if (elementId == "addInfo") {
      resetElement.value = "";
    }
  }
}

function uploadData(name, from, dest, date, time, seats, price, email, phone, additional) {
  database.ref('Offers').push({
    'Name': name,
    'From': from,
    'Destination': dest,
    'Date': date,
    'Time': time,
    'Seats': seats,
    'Price': '$' + price,
    'Email': email,
    'Phone': phone,
    'Additional': additional
  })
}

function getData(data) {
  var elmtTable = document.getElementById('allOffers');
  var tableRows = elmtTable.getElementsByTagName('tr'); 
  var rowCount = tableRows.length;

  for (var x=rowCount-1; x>0; x--) {
    tableRows[x].innerHTML = '';
  }

  var elmtTable = document.getElementById('requests');
  var tableRows = elmtTable.getElementsByTagName('tr'); 
  var rowCount = tableRows.length;

  for (var x=rowCount-1; x>0; x--) {
    tableRows[x].innerHTML = '';
  }

  var offers = data.val();
  var keys = Object.keys(offers);
  console.log(keys);

  for (var i = 0; i < keys.length; i++) {
    var k = keys[i];

    var dateText = offers[k].Date;
    var fromText = offers[k].From;
    var destText = offers[k].Destination;
    var nameText = offers[k].Name;
    var priceText = offers[k].Price;
    var seatsText = offers[k].Seats;

    createCell(dateText, fromText, destText, nameText, priceText, seatsText);
  }
}

function errData(err) {
  console.log('ERROR!');
  console.log(err);
}

function createCell(dateInput, fromInput, destInput, nameInput, priceInput, seatsInput) {
  var table = document.getElementById("allOffers");
  var newBody = document.createElement("tbody");
  var newRow = document.createElement("tr");

  var pwmTable = document.getElementById("requests");

  var date = document.createElement("th");
  var from = document.createElement("td");
  var dest = document.createElement("td");
  var name = document.createElement("td");
  var price = document.createElement("td");
  var seats = document.createElement("td");

  date.innerHTML = dateInput;
  from.innerHTML = fromInput;
  dest.innerHTML = destInput;
  name.innerHTML = nameInput;
  price.innerHTML = priceInput;
  seats.innerHTML = seatsInput;

  newRow.append(date);
  newRow.append(from);
  newRow.append(dest);
  newRow.append(name);
  newRow.append(price);
  newRow.append(seats);

  newBody.append(newRow);
  table.append(newBody);
  var cln = newBody.cloneNode(true);
  pwmTable.append(cln);
}





if (document.getElementById("PWMRequestForm")) {
  // Get the modal
  var PWMrequestForm = document.getElementById("PWMRequestForm");

  // Get the button that opens the modal
  var btnMakePWMRequest = document.getElementById("btnMakePWMRequest");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on the button, open the modal
  btnMakePWMRequest.onclick = function () {
    PWMrequestForm.style.display = "block";
  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    PWMrequestForm.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == this.PWMrequestForm) {
      this.PWMrequestForm.style.display = "none";
    }
  }

};



$(document).ready(function () {
  $('#nav-placeholder').load("navbar.html", function (response, status) {
    if (status === 'error') {
      alert("Failed to load navbar.html");
    }
  });
});


$(document).ready(function () {
  $('#request-form').load("requestForm.html", function (response, status) {
    if (status === 'error') {
      alert("Failed to load requestForm.html");
    }
  });
});

$(document).ready(function () {
  $('#offer-form').load("offerForm.html", function (response, status) {
    if (status === 'error') {
      alert("Failed to load offerForm.html");
    }
  });
});