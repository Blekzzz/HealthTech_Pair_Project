// var bcrypt = require('bcryptjs');
// var salt = bcrypt.genSaltSync(10);
// var hash = bcrypt.hashSync("B4c0/\/", salt);

// console.log(hash)

const nama = ['tes', 'tes', 'tes']

let input = 'tes'

// if (nama.indexOf(input)) {
//     console.log('masuk')
// } else {
//     console.log("ga masuk");
// }

// console.log(nama.indexOf(input))
let validateSameUser = nama.findIndex(el => el == input)

console.log(validateSameUser)

// if (validateSameUser >= 1) {
//     console.log("cegat")
// } else {
//     console.log("silahkan lewat");
// }