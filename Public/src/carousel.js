var index = 1;
var index02 = index + 1;
var index03 = index - 1;
const carousel_arr = [
    "url('https://placekitten.com/200/200')",
    "url('https://placekitten.com/200/300')",
    "url('https://placekitten.com/200/400')",
];

//Starting state of the imgs
document.querySelector(".img01").style.backgroundImage = carousel_arr[0]
document.querySelector(".img02").style.backgroundImage = carousel_arr[1]
document.querySelector(".img03").style.backgroundImage = carousel_arr[2]

console.log(index);
console.log(carousel_arr[index]);

//Toggling towards the right
function toggleRight() {
    if (index < carousel_arr.length - 1) {
        index++;
    } else {
        index = 0;
    }
    console.log(index);
    console.log(carousel_arr[index]);
    document.querySelector(".img02").style.backgroundImage = carousel_arr[index];
}

function toggleRight02() {
    if (index02 < carousel_arr.length - 1) {
        index02++;
    } else {
        index02 = 0;
    }
    console.log(index02);
    console.log(carousel_arr[index02]);
    document.querySelector(".img03").style.backgroundImage = carousel_arr[index02];
}

function toggleRight03() {
    if (index03 < carousel_arr.length - 1) {
        index03++;
    } else {
        index03 = 0;
    }
    console.log(index03);
    console.log(carousel_arr[index03]);
    document.querySelector(".img01").style.backgroundImage = carousel_arr[index03];
}


//Toggling towards the left
function toggleLeft() {
    if (index > 0) {
        index--;
    }
    else if (index <= 0) {
        index = carousel_arr.length - 1;
    }
    console.log(index);
    console.log(carousel_arr[index]);
    document.querySelector(".img02").style.backgroundImage = carousel_arr[index];
}


function toggleLeft02() {
    if (index02 > 0) {
        index02--;
    }
    else if (index02 <= 0) {
        index02 = carousel_arr.length - 1;
    }
    console.log(index);
    console.log(carousel_arr[index]);
    document.querySelector(".img03").style.backgroundImage = carousel_arr[index02];
}


function toggleLeft03() {
    if (index03 > 0) {
        index03--;
    }
    else if (index03 <= 0) {
        index03 = carousel_arr.length - 1;
    }
    console.log(index);
    console.log(carousel_arr[index]);
    document.querySelector(".img01").style.backgroundImage = carousel_arr[index03];
}