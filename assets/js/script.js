// Assignment code here

/*
Gives the user a prompt and checks the validity of their input. If the input is invalid, a failure alert will pop 
up on the browser. If the input is valid, the function returns the user inputted entry.

@param {string} printPrompt     The string that is displayed to the user in the prompt
@param {string} promptFail      The string that is displayed when the user input is invalid
@param {function} checkValid    Function that returns a boolean when comparing the user input to a set of criteria
*/
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

/*
Assigns variables to the valid user input which is accepted by the userInput function. The selectCriteria section 
also ensures that at least one character type is selected by the user as it is required to create the password.

@return {array}     An array of objects with key value pairs of the variables inputted by the user. The key is the
                    variable name and the value is that of the variable.An array is used as the objects will later 
                    be filtered and the filter method is a method for arrays.
*/
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

/*
Takes in an array and shuffles the order of the items in the array.
This function was taken from: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
*/
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

/*
Generates a password given the required criteria selected by the user from the selectCriteria function
*/
function generatePassword(){
  var criteria = selectCriteria();
  var length = parseInt(criteria[0].length);
//Filters the results of the selectCriteria function to only accept those in which the user selected "y" to 
//include in the password
  var filteredCriteria = criteria.filter(charType => Object.values(charType)[0] == "y");
  
/*
A dictionary/object which associate/points the character type to the function that generates a random character of 
the corresponding type. No brackets placed after the function name as we are only pointing the function so as to 
generate a different character each time the genRandomChar key,value is called
*/
  var genRandomChar = {
    lowercase : randomLower,
    uppercase : randomUpper,
    numeric : randomNumber,
    specialChar : randomSpecial
  }

  var password = Array(length);
//Array of index values which is shuffled to place characters in the password at the shuffled index, thus creating
//a shuffled password (This randomizes the structure of the password to make it more secure)
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

//converts the password from an array to a string with no spaces in between the password array items(characters)
  return password.join('');
}

//generates a random lowercase letter 
function randomLower(){
  var lowerLetters = "abcdefghijklmnopqrstuvwxyz";
  return lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
}

//generates a random uppercase letter 
function randomUpper(){
  var upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return upperLetters[Math.floor(Math.random() * upperLetters.length)];
}

//generates a random number  
function randomNumber(){
  var numbers = "0123456789";
  return numbers[Math.floor(Math.random() * numbers.length)];
}

//generates a random special character
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
