// Assignment code here
function randomLower(){
  var lowerLetters = "abcdefghijklmnopqrstuvwxyz";
  return lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
}

function randomUpper(){
  var upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return upperLetters[Math.floor(Math.random() * upperLetters.length)];
}

function randomNumber(){
  var numbers = "0123456789";
  return numbers[Math.floor(Math.random() * numbers.length)];
}

function randomSpecial(){
  var specialChars = "!#$%&'()*+,-./:;<=>?@[]^_`{|}~";
  return specialChars[Math.floor(Math.random() * specialChars.length)];
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
