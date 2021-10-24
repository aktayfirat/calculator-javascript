const display = document.querySelector(".screen");
const keys = document.querySelector(".keys");

let displayValue = "0"; 
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

updateDisplay(); 

function updateDisplay(){
    display.value = displayValue;
}


keys.addEventListener('click',function(e){
    var element = e.target;

    if(!element.matches("button")) return; 
    if(element.classList.contains('operator')){ 
        console.log(element.value)
        handleOperator(element.value);
        updateDisplay();
        return;
    }  
    if(element.classList.contains('decimal')){ 
        inputDecimal(); 
        updateDisplay(); 
        return;
    } 
    if(element.classList.contains('clear')) {
        clearAll(); 
        updateDisplay();
        
        return;
    }
        
    if(element.classList.contains('abs')){
        Abs();
        updateDisplay();
        return;
    } 

    if(element.classList.contains('delete')){
        deleteLast();
        updateDisplay(); 
        return;
    } 

    inputNumber(element.value); 
    updateDisplay();            
});

function handleOperator(nextOperator){
    const value = parseFloat(displayValue);
    
   
    
    if(firstValue == null){ 
        firstValue = value; 
    }else if (operator){
        const result = calculate(firstValue, value, operator);
        displayValue = `${parseFloat(result.toFixed(5))}`;
        firstValue = result;
    }
    

    waitingForSecondValue = true;
    operator = nextOperator;
    console.log(displayValue, firstValue, operator, waitingForSecondValue);


}

function calculate(first, second, operator){
    if(operator === '+'){
        return first + second;
    }else if(operator === '-'){
        return first - second;
    }else if(operator === "*"){
        return first * second;
    }else if(operator === "/"){
        return first / second;
    }
     return second; 
}

function inputNumber(num){
     if(waitingForSecondValue){ 
        displayValue = num;
        waitingForSecondValue = false;
     }else{
       
        displayValue = displayValue === "0" ? num : displayValue + num;

     }
     console.log(displayValue, firstValue, operator, waitingForSecondValue);
     
}

function inputDecimal(){
    if(!displayValue.includes(',')) 
    displayValue += ","; 
}

function clearAll(){
    displayValue = "0";
}

function deleteLast(){
    if(displayValue.length > 1){ 
        displayValue = displayValue.slice(0,-1);
    }
    
}

function Abs(){
    displayValue = displayValue * (-1);
}
