const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp();

exports.addAdminRole = functions.https.onCall(async(data,context) =>{
    // get user and add admin custom claim
    try{
        const user = await admin.auth().getUserByEmail(data.email);
        await admin.auth().setCustomUserClaims(user.uid,{
            admin:true
        });
        return{
            message: `Sucess! ${data.email} has been made an admin!`
        }
    }catch(err){
        return err;
    }
});
