import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyBEN5PSGgVT06U2wPdVHhMwPYchA3brUho",
    authDomain: "todoist-5b4f0.firebaseapp.com",
    databaseURL: "https://todoist-5b4f0.firebaseio.com",
    projectId: "todoist-5b4f0",
    storageBucket: "todoist-5b4f0.appspot.com",
    messagingSenderId: "307471461186",
    appId: "1:307471461186:web:e662f26a44d1ea5db5f6db",
});

export { firebaseConfig as firebase };