const path = require("path") ;
const { storage, firestore } = require("../../services/firebase-service");

function deleteFile(req,res){
    // 
	const filePath = req.body.filePath;
    const postID = req.body.postID; 
	const uploadID = req.body.uploadID; 
    const classroomID = req.body.classroomID;
    console.log({filePath, postID, uploadID })
    let location = "uploads" ;
    if(req.user.isStudent === true) {
        location = "submission" ;
    }

    let fileRef =  firestore
    .collection("classroom")
    .doc(classroomID)
    .collection("posts")
    .doc(postID)
    .collection(location)
    .doc(uploadID);
    
    fileRef.get().then((docRef)=>{
        if(docRef.exists){
                fileRef.delete()
                .then(()=>{
                    console.log('Deleted!')
                })
            
                storage.file(filePath)
                .exists()
                .then(()=>{
                    storage
                    .file(filePath)
                    .delete()
                    .then(()=>{
                        res.json({
                            status: "success",
                            message: "File deleted",
                        });
                    })
                })
        } else {
            res.status(405).json({
                status: "failure",
                message: "File Do Not Exist",
            });
        }
    })
    .catch((error)=>{
        console.error(error.message);
        res.status(400).json({
            status: "failure",
            message: error.message,
        });
    }) 
    
}

module.exports = deleteFile ;