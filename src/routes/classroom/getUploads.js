const { firestore } = require("../../services/firebase-service");


function getUploads(req,res){

	const postID = req.query.postID; 
	const classroomID = req.query.classroomID;
	let uploadLocation = 'uploads';

	let fileRef =  firestore
    .collection("classroom")
    .doc(classroomID)
    .collection("posts")
    .doc(postID)
    .collection(`${uploadLocation}`)

	fileRef
	.get()
	.then((snapshot)=>{
		res.status(200).json({
			status:"success",
			message : snapshot.docs.map((doc)=>({...doc.data(),id:doc.id}))
		})
	})
	.catch((error)=>{
		console.error(error);
		res.status(400).json({
			status:"failure",
			message : error.message
		})
	})

}


module.exports = getUploads ; 