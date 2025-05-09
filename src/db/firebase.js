import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; //! para incluir firestore (base de datos para cloud )
import { getAuth } from "firebase/auth"; //! para conseguir la autentificacion en mi aplicacion 

const firebaseConfig = {
  apiKey:process.env.VUE_APP_APIKEY,
  authDomain:process.env.VUE_APP_AUTH ,
  projectId:process.env.VUE_APP_PROJECT ,
  storageBucket:process.env.VUE_APP_STORE ,
  messagingSenderId:process.env.VUE_APP_MESSAID ,
  appId:process.env.VUE_APP_APPID
};


const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
const db=getFirestore(app)

export {auth,db}