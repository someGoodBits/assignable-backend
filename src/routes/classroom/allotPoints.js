const { firestore } = require("../../services/firebase-service");

function allotPoints(req,res){

    const classroomID = req.body.classroomID;
    const studentID = req.body.studentID;
    const postID = req.body.postID;
    const points = req.body.points;
    const submissionId = req.body.submissionId;


    firestore
    .collection('classroom')
    .doc(classroomID)
    .collection('posts')
    .doc(postID)
    .collection('submission')
    .doc(submissionId)
    .update({
    	points
    })
    .then(()=>{
    	res.json({
			status : "success",
            message : "Marks alloted sent"
        })
    })
    .catch((error)=>{
        console.error(error);
        res.status(400).json({
            status : "failure",
            message : "Unable to allote marks"
        })
    })
    
}

module.exports = allotPoints ;