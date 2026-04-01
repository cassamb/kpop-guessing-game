const shuffle = (arr: number[]) => {
    for (var i: number = arr.length - 1; i > 0; i--) {
        var j: number = Math.floor(Math.random() * (i + 1 ));
        var temp: number = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}

export const getRandomInt = (min: number, max: number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const populateQuestions = (totalQs: number): number[] => {
    let arr = [];

    for (let i: number = 0; i < totalQs; i++) arr[i] = i + 1;
    shuffle(arr);
    return arr; 
}