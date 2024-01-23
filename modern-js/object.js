//************ */ object destructing


const userStudent = ({firstName, lastName}) => { // direct destructing
    // normal use

    //   return `First name : ${student.firstName} Last name : ${student.lastName}`

   // with destructing
    //  const {firstName, lastName} = student
    return `First name : ${firstName} Last name : ${lastName}`

}

const student1 = userStudent({
    firstName : "Mobin",
    lastName : "Mostafa"
})
console.log(student1)