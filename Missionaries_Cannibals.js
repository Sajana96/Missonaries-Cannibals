//State = count on right side M,C and Boat 
//Boat = 1 (boat on right side)
//Operations = count inside the boat 
// [M,C,B]

const startState = [3,3,1]
const endState = [0,0,0]
var solutions = []

//possible actions inside the boat when going 
const operations = [[1,0,1],[0,1,1],[2,0,1],[0,2,1],[1,1,1]]

//Utility Functions
function arrayEquals(a, b) {
    return Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index]);
  }

function arrayAlreadyHasArray(arr, testArr){
    for(var i = 0; i<arr.length; i++){
        let checker = []
        for(var j = 0; j<arr[i].length; j++){
            if(arr[i][j] === testArr[j]){
                checker.push(true)
            } else {
                checker.push(false)
            }
        }
        if (checker.every(check => check === true)){
            return true
        }
    }
    return false
}

//Function to execute operations
const do_operation = (state, operation) =>{
    try {
        var updatedState=[]

        if(state[2]==1){
           var value;
            for(var i=0; i<state.length; i++ ){
                value = state[i]-operation[i]
                updatedState[i]=value
            }
        }

        else{
            var value;
            for(var i=0; i<state.length; i++ ){
                value = state[i]+operation[i]
                updatedState[i]=value
            }
        }

        return updatedState;

    } 
    catch (error) {
        console.log(error)
    }
}

//Function to return the state of opposite bank (left)
const oppositeBank = (currentBank) =>{
    var oppositeBank = []
    var value;
    for (var i=0; i<currentBank.length; i++){
        value = startState[i]-currentBank[i]
        oppositeBank[i]=value
    }
    return oppositeBank;
}

//Functions for the Rules
const isLegal = (state) => {
    if((state[0]>= 0 && state[0] <=3) && (state[1] >= 0 && state[1] <=3))
    return true;
    else
    return false;
}

const isBankSafe = (state) => {
    if(state[1]>state[0] && state[0]!=0)
    return false;
    else
    return true;
}

const isStateSafe = (state) => {
    if(isBankSafe(state) && isBankSafe(oppositeBank(state)))
    return true;
    else
    return false;
}


//Determining the next possible states available
const nextPossibleStates = (state,operationsList) =>{
    var nextPossibleRemainingStates=[]
    var nextState;
    operationsList.forEach(op => {
        nextState =do_operation(state,op)
       if(isLegal(nextState) && isStateSafe(nextState)) {
            nextPossibleRemainingStates.push(nextState)
       }
    })
    return nextPossibleRemainingStates
}

//Fucntion to solve the problem 
const run =(nextState, path) => {
    var copyOfPath = [...path]
    if(arrayEquals(nextState,endState)){
        copyOfPath.push(nextState)
        solutions.push(copyOfPath)
        return true
    }

    else if (arrayAlreadyHasArray(path,nextState)){
        return 
    }
        
    else{
        copyOfPath.push(nextState)
        nextPossibleStates(nextState,operations).forEach(st => {
            run(st,copyOfPath)
        })
    } 
}

//Main function 
const Main = () =>{
    run(startState,[])
    console.log(solutions)
}

Main();