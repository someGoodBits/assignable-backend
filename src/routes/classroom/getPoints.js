const { firestore } = require("../../services/firebase-service");

function getPoints(req,res){

    const classroomID = req.query.classroomID;
    const postID = req.query.postID;
    const studentID = req.query.studentID;

    if(req.classroomPost.isPointsPublished || true){


    	firestore
	    .collection('classroom')
	    .doc(classroomID)
	    .collection('posts')
	    .doc(postID)
	    .collection('allotPoints')
	    .doc(studentID)
	    .get()
	    .then((docRef)=>{
	    	if(docRef.exist){
	    		const data = docRef.data();
	    		res.status(200).json({
					status : "success",
					message : {
						isPointsPublished:true,
						points:data.points || 0
					}
				})
	    		return;
	    	}
	    	else{
	    		res.status(200).json({
	    			isPointsPublished:false
	    		})
	    		return;
	    	}
	    })
    }
    else{

    	res.status(200).json({
    		isPointsPublished:false
    	})
    	return;
    }
        
}

module.exports = getPoints ;