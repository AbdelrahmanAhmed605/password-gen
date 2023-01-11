// Assignment code here
function userInput(printPrompt,promptFail,checkValid){
  do{
    promptInput = prompt(printPrompt);
    if(checkValid(promptInput)){
      break;
    }
    else{
      alert(promptFail);
    }
  }while(true);
  return promptInput;
}

function selectCriteria(){
  var length = userInput(
    "Select desired length of password (length must at least be 8 characters and no more than 128 characters)",
    "Please enter a valid length",
    function(length){
      return length>=8 && length<=128
    }
  )

  var charTypeCheck = false;
  while(charTypeCheck == false){

    function yes_no_Check(charType){
      return charType == "y" || charType == "n";
    }

    var lowercase = userInput(
      "Do you want the password to include lowercase letters? (Reply y/n)",
      "Please enter a valid response",
      yes_no_Check
    );
    
    var uppercase = userInput(
      "Do you want the password to include uppercase letters? (Reply y/n)",
      "Please enter a valid response",
      yes_no_Check
    )

    var numeric = userInput(
      "Do you want the password to include numeric values? (Reply y/n)",
      "Please enter a valid response",
      yes_no_Check
    )

    var specialChar = userInput(
      "Do you want the password to include special characters? (Reply y/n)",
      "Please enter a valid response",
      yes_no_Check
    )

    if(lowercase == "y" || uppercase == "y" || numeric == "y" || specialChar == "y"){
      charTypeCheck = true;
    }
    else{
      alert("Please select at least one character type");
    }
  }

  return [
    {length},
    {lowercase},
    {uppercase},
    {numeric},
    {specialChar}
  ];
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

function generatePassword(){
  var criteria = selectCriteria();
  var length = parseInt(criteria[0].length);
  var filteredCriteria = criteria.filter(charType => Object.values(charType)[0] == "y");
  
  var genRandomChar = {
    lowercase : randomLower,
    uppercase : randomUpper,
    numeric : randomNumber,
    specialChar : randomSpecial
  }

  var password = Array(length);
  var indeces = [...Array(length).keys()];
  shuffleArray(indeces);

  var i=0;
  while(i<length){
    filteredCriteria.forEach(charType =>{
      if(i<length){
        password[indeces[i]] = genRandomChar[Object.keys(charType)[0]]();
        i++;
      }
    });
  }

  return password.join('');
}

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
