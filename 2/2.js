function Random(length){
    characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    result = '';
    let number = characters.length
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * number));
    }
    return result
}

function chckRandom(){
    let random = Random(4)
    let answer = 'ABCD';
    if (random == answer){
        console.log('true')
    }else{
        console.log('false')
    }
    return random
}
console.log(chckRandom())