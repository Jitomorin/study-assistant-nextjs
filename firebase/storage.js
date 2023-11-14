import { getURL, storage } from './firebase'
import {getDownloadURL} from 'firebase/storage'
// import {getDownloadURL} from "firebase/storage"
import { v4 as uuidv4 } from "uuid";

export const uploadMedia = async (uid,userID, file) => { 
    var postURL=''
    const post = storage.ref('posts/' + userID + '/' + uid)
    await post.put(file).then(() => {
        // getDownloadURL(post).then((url) => {
            
        //     postURL= url
                
        // })
        postURL= getDownloadURL(post)
         
    })
    // const postStorage =await  {
    //     postID: uid,
    //     URL: post.getDownloadURL(),
    // }
    return postURL 

}
export const setProfilePic = async (userID, file) => {
    storage.ref('profile_pics/' + userID).put(file).on("state_changed" , alert("Uploaded") , alert);
}