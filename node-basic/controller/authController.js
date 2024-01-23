export const userController = (req,res) => {
    res.json({
     users: [
         {
             name: "mobin mostafa",
             age: 25
         },
         {
             name: "rafi ahmed",
             age: 26
         }
     ]
    })
 }