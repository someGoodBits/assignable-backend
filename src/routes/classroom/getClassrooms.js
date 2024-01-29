const { firestore } = require("../../services/firebase-service");

function getAllClassrooms(req,res){

    if(req.user.isTeacher === true){
        firestore.collection('classroom').where("owner","==",req.user.uid).get()
        .then((snapshot)=>{
    
            res.status(200).json({
                status:"success",
                message : snapshot.docs.map(doc => ({...doc.data(),id:doc.id}))
            })
        }).catch(error =>{
            console.error(error);
            res.status(400).json({
                status:"failure",
                message : error.message
            })
        })
    } else if(req.user.isStudent === true){
        firestore.collection('enrolledStudents').where("studentID","==",req.user.uid).get()
        .then((snapshot)=>{
            res.status(200).json({
                status:"success",
                message : snapshot.docs.map(doc => ({...doc.data(),id:doc.id}))
            })
        }).catch(error =>{
            console.error(error);
            res.status(400).json({
                status:"failure",
                message : error.message
            })
        })
    } else {
        res.status(400).json({
            status:"failure",
            message : "Invalid Role"
        })
    }

}

module.exports = getAllClassrooms ;