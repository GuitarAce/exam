function generateString(length) {
    characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    result = '';
    charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}
console.log(generateString(5));