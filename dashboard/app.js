
import { 
    auth,
    app,
    db,
    doc,
    getDoc,
    onAuthStateChanged,
    signOut,
    getDocs,
    collection,
    addDoc, } from "../firebaseConfig.js";

    const logoutBtn = document.getElementById('logoutBtn')
    const userName = document.getElementById('userName');
    const email = document.getElementById('email');
    const userDesc = document.getElementById('userDesc');
    const postInput = document.getElementById('postInput');
    const postBtn = document.getElementById('postBtn');
    const postContentArea = document.querySelector('.postContentArea');
    const posttitle = document.getElementById('.posttitle');
    const activeUserName = document.getElementById('activeUserName');


// console.log(postBtn,postInput/)
  // console.log(userName);

let loggedInUser;
getPostData()
onAuthStateChanged(auth, (user) => {
  if (user) {
    
    const uid = user.uid;
    // console.log(uid);
    activeUserData(uid)
    getActiveUserData(uid)
  
    loggedInUser = uid    
  } else {
    // User is signed out
  window.location.href = "../index.html"
  
  }
});


async function getActiveUserData(uid){
  
  const docRef = doc(db, "users", uid);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  // console.log("Document data:", docSnap.data());
   
  const {firstName:firstNamefromDB, lastName:lastNamefromDB, email: emailformDB} = docSnap.data()
  userName.innerHTML = `${firstNamefromDB} ${lastNamefromDB} `
  // email.innerHTML = `${emailformDB}`
  activeUserName.innerHTML=`${firstNamefromDB} ${lastNamefromDB} `
  userDesc.innerHTML = "Web Developer Operation supervisor at Connect Logistic"
  getPostData(firstNamefromDB , lastNamefromDB)
} else {
  // docSnap.data() will be undefined in this case
  console.log("No such document!");
}
}


postBtn.addEventListener("click", postDataHandler)

async function postDataHandler(){

// console.log("function working")

try {
  const docRef = await addDoc(collection(db, "posts"), {
    activeUserId: loggedInUser,
    postContent: postInput.value,


  });
  getPostData()
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}

}

// editand delete functionalty

async function deletePostHandler(postId) {
  console.log(postId, "delete button working properly")

  await deleteDoc(doc(db, "posts", postId));
  alert("Your post deleted successfully")
  getPosts()
}
// editand delete functionalty


async function getPostData(firstname, lastname){

  const querySnapshot = await getDocs(collection(db, "posts"));
  querySnapshot.forEach(async(doc) => {
    
    // console.log(doc.id, " => ", doc.data());
  
    const {activeUserId, postContent} = doc.data();
  const userData = await activeUserData(activeUserId)
    const postElm = document.createElement('div');
    postElm.setAttribute('class','ContentBox');
       postElm.innerHTML = ` <div class="postContent">
    <div class="profile">          
    <img src="../assest/pp.jpg" alt="">
     <div class="userdata">
         <h5 id="activeUserName">${userData?.firstName} ${userData?.lastName}</h5>
         <h5 id="email">${userData?.email}</h5>
         <small id="userDesc">${userData.posttitle}</small>
       </div>
     </div>
     <div class="postdata">
       <h5>${postContent}</h5>
     </div>
      <div class="editsBtn"> <button class="editbtn"  onclick="editPostHandler('${userData?.postId}')"> Edit</button> <button class="deleteBtn" >Delete</button></div>
      
     </div>
     
     
     `
     postContentArea.appendChild(postElm); 
  
    // doc.data() is never undefined for query doc snapshots
  
  });
  
  }

async function activeUserData(uid){
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  // console.log("Document data:", docSnap.data());
  return docSnap.data()
} else {
  // docSnap.data() will be undefined in this case
  console.log("No such document!");
}

}
  
const logoutHandler = () => {
  signOut(auth).then(() => {
      // Sign-out successful.
      console.log("signout successfully")
      window.location.href = '../index.html'
  }).catch((error) => {
      // An error happened.
     
  });

}

logoutBtn.addEventListener('click', logoutHandler)
console.log("==>>logout" +logoutBtn);



window.deletePostHandler = deletePostHandler