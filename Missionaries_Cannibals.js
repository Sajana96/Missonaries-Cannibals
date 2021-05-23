//State = count on right side M,C and Boat 
//Boat = 1 (boat on right side)
//Operations = count inside the boat 
// [M,C,B]

const startState = [3,3,1]
const endState = [0,0,0]
var solutions = []

//possible actions inside the boat when going 
const operations = [[1,0,1],[0,1,1],[2,0,1],[0,2,1],[1,1,1]]

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