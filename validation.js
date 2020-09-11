window.onload = () => {
  if (document.cookie.length != 0) {
    var valueArray = document.cookie.split(' ');
    // var dataValue = JSON.parse(valueArray);
    var decipherUsername = crypt.decrypt(valueArray[1]);
    var decipherPwd = crypt.decrypt(valueArray[3]);
    if (decipherUsername == "LTI" && decipherPwd == "123") {
      cookieLogin(decipherUsername);
      document.getElementById("user").value = decipherUsername;
      document.getElementById("psw").value = decipherPwd;
    }
  }
}


function login() {
  var person = new Object();
  person.user = document.getElementById("user").value;
  person.pwd = document.getElementById("psw").value;

  if (person.user == "LTI" && person.pwd == "123") {
    cookieLogin(person.user);

    if (document.getElementById("remember").checked == true) {
      var now = new Date();
      now.setDate(now.getDate() + 1);
      var cipherUser = crypt.encrypt(person.user);
      var cipherPwd = crypt.encrypt(person.pwd);
      var storeData = {};
      storeData.username = ' ' + cipherUser + ' ';
      storeData.pwd = ' ' + cipherPwd + ' ';
      var jsonString = JSON.stringify(storeData);
      document.cookie = `data=${jsonString};expires=${now};`;
    }
  }
  else {
    document.getElementById("msg").innerHTML = "Invalid Username/Password. Try again!";
  }
}

cookieLogin = username => {
  alert(`Thank You for Login & You are Redirecting to Campuslife Website ${username}`);
  //Redirecting to other page or webste code or you can set your own html page.
  var queryString = "?user=" + username;
  window.location = "welcometoLTI.html" + queryString;
}

// Less secure the SHA
var crypt = {
  secret: "CIPHERKEY",
  encrypt: function (clear) {
    // encrypt() : encrypt the given clear text

    var cipher = CryptoJS.AES.encrypt(clear, crypt.secret);
    cipher = cipher.toString();
    return cipher;
  },
  decrypt: function (cipher) {
    // decrypt() : decrypt the given cipher text

    var decipher = CryptoJS.AES.decrypt(cipher, crypt.secret);
    decipher = decipher.toString(CryptoJS.enc.Utf8);
    return decipher;
  }
};