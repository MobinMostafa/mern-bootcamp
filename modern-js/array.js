// array destructing

const [, ,item] = ["apple", "mango", "lemon"]

// console.log(item) //third one 


//***** */ spreed operator

const student1 = ["mobin", "mostafa", "rafi"]
const student2 = ["nahian", "arman", "dehan"]

const allStudent = [...student1, ...student2]
const allStu = allStudent.join(" ")
console.log(typeof allStudent)
