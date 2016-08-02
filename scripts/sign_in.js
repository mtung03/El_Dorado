/* sign_in.js */

var request = new XMLHttpRequest();

request.open("GET", "data/accounts.json", true);

function verify() {
        var uName = document.getElementById("username_input");
        var pWord = document.getElementById("password_input");

        var accountData = request.responseText;
        console.log(accountData);
        var accounts = JSON.parse(accountData);

        console.log(accounts[uName] == pWord);
        console.log(uName.value);
        console.log(pWord.value);
}