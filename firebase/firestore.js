import { firestore } from "./firebase";
import { v4 as uuidv4 } from "uuid";

async function addUser(email, fullname, username,uid ) {
  // const uid=uuidv4()
  firestore.collection("users").doc(uid).set({
    uid: uid,
    email: email,
    fullname: fullname,
    userName: username,
    followers: [],
    following: [],
    imageURL: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.ms_ni44c-_TBsdHzF0W5awHaHa%26pid%3DApi&f=1&ipt=bd6bf0cc645b437b48ee13f797ca6d3b484072dadfe65b0f7802200d5aeda34f&ipo=images",
  });
}
async function getAllUsers() {
  firestore    
    .collection("users")
    .get()
    .then(function (snapshot) {
      snapshot.forEach(function (cSnapshot) {
        return cSnapshot;
      });
    });
}
function getUserDetails(uid) {
  firestore
    .collection("users")
    .doc(uid)
    .get()
    .then((snapshot) => {
      return snapshot.data();
    });
}
async function addPost(userID, imageURL, caption,postUID,username,pp) {
  
  firestore.collection("posts").doc(postUID).set({
    uid: postUID,
    userID: userID,
    pp:pp,
    username:username,
    datePublished:Date(),
    imageURL: imageURL,
    caption: caption,
    likes: [],
    comments: [],
  });
}
async function addTask(userID, tasks, title) {
  const uuid=uuidv4()
  firestore.collection("tasks").doc(uuid).set({
    uid: uuid,
    userID: userID,
    datePublished:Date(),
    tasks: tasks.map((task)=>{return {task:task,completed:false}}),
    title:title,
  });
}

async function deleteTask(taskID) { 
  firestore.collection("tasks").doc(taskID).delete()
}
async function deleteUser(uid) { 
  firestore.collection("users").doc(uid).delete()
}
async function completeTask(taskID,tasks) { 
  
  firestore.collection("tasks").doc(taskID).update({
    tasks: tasks.map((task)=>{return {task:task.task,completed:task.completed}}),
  })
}

async function makeAdmin(uid) { 
  firestore.collection("users").doc(uid).update({
    admin: true,
  })
}
async function removeAdmin(uid) { 
  firestore.collection("users").doc(uid).update({
    admin: false,
  })
}

async function getUserPosts(uuid){
  const snapshot = await firestore.collection('posts').where('userID',"==",uuid).orderBy('datePublished','desc').get()
    return snapshot.docs.map(doc => doc.data());
}
async function getUserTasks(uuid){
  const snapshot = await firestore.collection('tasks').where('userID',"==",uuid).orderBy('datePublished','desc').get()
    return snapshot.docs.map(doc => doc.data());
}
async function getPosts(){
  const snapshot = await firestore.collection('posts').orderBy('datePublished','desc').get()
    return snapshot.docs.map(doc => doc.data());
}
async function like(post, userID) {
  console.log('post.likes:'+post.likes)
  let postLikes = post.likes
  // postLikes.push(post.likes)
  let uidIndex = postLikes.indexOf(userID)
  console.log('postLikes: '+postLikes)
  
  if (uidIndex !== -1) {
    console.log('user has liked the post')
    //if user already liked the post
    //create a new array without the user's id
   postLikes.splice(uidIndex, 1)
    console.log('newArray: '+postLikes)
    // then update array
    firestore.collection("posts").doc(post.uid).update({
      likes: postLikes,
    })
  } else {
    console.log('user has not liked the post')
    //if user has not liked the post
    //create a new array without the user's id
    postLikes.push(userID)
    console.log('newArray: '+postLikes)
    firestore.collection("posts").doc(post.uid).update({
      likes: postLikes,
    })
  }
}
  



export {
  addUser,
  getAllUsers,
  getUserDetails,
  addPost,
  getPosts,
  getUserPosts,
  deleteUser,
  like,
  getUserTasks,
  deleteTask,
  addTask,
  completeTask,
  makeAdmin,
  removeAdmin
};
