export const shuffle = (arr: number[]) => {
    for (var i: number = arr.length - 1; i > 0; i--) {
        var j: number = Math.floor(Math.random() * (i + 1 ));
        var temp: number = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
};

const isUnique = (arr: number[], id: number): boolean => {
    for (var i: number = 0; i < arr.length; i++) {
        if (arr[i] == id) return false;
    }
    return true;
};

const getRandomInt = (min: number, max: number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const populateQuestions = (totalQuestions: number): number[] => {
    let arr = [];

    for (let i: number = 0; i < totalQuestions; i++) arr.push(i + 1);
    shuffle(arr);
    return arr; 
};

export const updateChoices = (correctId: number, totalQuestions: number): number[] => {
    let choices: number[] = [correctId];
    let newChoiceId: number;

    for (var i: number = 1; i < 4;) { // Hardcoded to 4 answer choices, but may be modified to include additional options
        newChoiceId = getRandomInt(1, totalQuestions);
        
        if (isUnique(choices, newChoiceId)) {
            choices.push(newChoiceId);
            i++;
        }
    }

    shuffle(choices);
    return choices;
};