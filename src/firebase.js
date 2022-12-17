import * as firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
//import 'firebase/analytics'

const firebaseConfig = {
    apiKey: "AIzaSyASZKS4Sa6DsnAxJfCxh4P2v5PJG84WrbM",
    authDomain: "petmet-268a4.firebaseapp.com",
    databaseURL: "https://petmet-268a4.firebaseio.com",
    projectId: "petmet-268a4",
    storageBucket: "petmet-268a4.appspot.com",
    messagingSenderId: "1082201721355",
    appId: "1:1082201721355:web:930a4a9192253fef1ed50e",
    measurementId: "G-6JBWLHV87K"
}

export const fire= firebase.initializeApp(firebaseConfig)
// firebase.analytics()
export const db= firebase.firestore()
export const auth= firebase.auth()
export const storage= firebase.storage()
