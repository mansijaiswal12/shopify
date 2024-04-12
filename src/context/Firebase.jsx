import {createContext, useContext, useState,useEffect} from 'react'
import {initializeApp} from 'firebase/app'
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup,onAuthStateChanged} from 'firebase/auth'
import {getFirestore,collection,addDoc, getDocs, doc, getDoc} from 'firebase/firestore'
import {getStorage,ref,uploadBytes,getDownloadURL} from "firebase/storage"


const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyBoRzKdjuffxGyHePH5KYOX9yKppmbvPEA",
  authDomain: "shopify-2a2fe.firebaseapp.com",
  projectId: "shopify-2a2fe",
  storageBucket: "shopify-2a2fe.appspot.com",
  messagingSenderId: "919843235005",
  appId: "1:919843235005:web:3a74dcf273b4fde45dc3d4"
};

export const useFirebase = () => {
  const firebase = useContext(FirebaseContext);
  return firebase;
}

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp)
const storage = getStorage(firebaseApp)


// Authentication 
const googleProvider = new GoogleAuthProvider()

export const FirebaseProvider = (props) => {
  const [user, setuser] = useState(null)

  useEffect(() => {
   onAuthStateChanged(firebaseAuth, (user) => {
    if (user) setuser(user);
    else setuser(null);
    console.log('user',user)
   })
  },[])
  

  
  const signUpWithEmailAndPassword = (email,password) => 
  createUserWithEmailAndPassword(firebaseAuth,email,password)

  const signinWithEmailAndPassword = (email,password) =>
  signInWithEmailAndPassword(firebaseAuth,email,password)

  const signinWithGoogle = () => signInWithPopup (firebaseAuth, googleProvider)

  //database
//create product men fun
  const handleCreateMen = async (title, price, img) => {
    const imageRef = ref(storage, `images/men/${img.name}`)
    const uploadResult = await uploadBytes(imageRef, img)
    
    return await addDoc(collection(firestore, 'products_men'), {
      title,
      price,
      
      imageUrl: uploadResult.ref.fullPath,

    })
    
  } 


  const handleCreatewomen = async (title, price, img) => {
    const imageRef = ref(storage, `images/women/${img.name}`)
    const uploadResult = await uploadBytes(imageRef, img)
    
    return await addDoc(collection(firestore, 'products_women'), {
      title,
      price,
      
      imageUrl: uploadResult.ref.fullPath,

    })
    
  } 

  //get all products men=fun
  const listProductMen = ()  => {
    return getDocs(collection(firestore,'products_men'))
  } 

  //get all pro women= fun
  const listProductwomen = () => {
    return getDocs(collection(firestore,'products_women'))
  }

const getProductByIdMen = async (id) =>{
  const docRef = doc(firestore, 'product_men',id)
  const result = await getDoc(docRef)
  return result
}

const getProductByIdwomen = async (id) =>{
  const docRef = doc(firestore, 'product_women',id)
  const result = await getDoc(docRef)
  return result
}

const getImageURL = (path) =>{
  return getDownloadURL(ref(storage,path))
}


  const sliderImg = async (img) =>{
     const imageRef = ref(storage,`images/slider/${img.name}`) 
     const uploadResult = await uploadBytes(imageRef,img);
     return await addDoc(collection(firestore,'slider_img'),{
      imageUrl:uploadResult.ref.fullPath,
      photoURL: user.photoURL,
     })
  }

  return(

    <FirebaseContext.Provider
    value={{
      signUpWithEmailAndPassword,
      signinWithEmailAndPassword,
      signinWithGoogle,
      handleCreateMen,
      listProductwomen,
      listProductMen,
      getProductByIdMen,
      handleCreatewomen,
      getProductByIdwomen,
      getImageURL,
      sliderImg
      // getImageURLProd
    }}
    >
      {props.children}
    </FirebaseContext.Provider>
  )


}
