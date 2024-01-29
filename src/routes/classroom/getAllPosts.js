const { firestore } = require("../../services/firebase-service");

// todo check only teachers and enrolled students can access



function getAllPosts(req,res){

    if(req.user.isTeacher === true) {
        firestore
        .collection('classroom')
        .doc(req.classroom.classroomID)
        .collection('posts')
        .get()
        .then((snapshot)=>{
            res.status(200).json({
                status:"success",
                message : snapshot.docs.map(doc => ({...doc.data(),postID:doc.id}))
            })
        }).catch(error =>{
            console.error(error);
            res.status(400).json({
                status:"failure",
                message : error.message
            })
        })
    } else if(req.user.isStudent === true) {
        firestore
        .collection('classroom')
        .doc(req.classroom.classroomID)
        .collection('posts')
        .where("isPublic","==",true)
        .get()
        .then((snapshot)=>{
            res.status(200).json({
                status:"success",
                message : snapshot.docs.map(doc => ({...doc.data(),postID:doc.id}))
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

module.exports = getAllPosts ;