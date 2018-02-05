  import * as firebase from "firebase";
  export var config = {
    apiKey: "AIzaSyDkLMChOucHlGyMilvmDojlaRrhiHxvJ3g",
    authDomain: "todo-app-with-react-redux-epic.firebaseapp.com",
    databaseURL: "https://todo-app-with-react-redux-epic.firebaseio.com",
    projectId: "todo-app-with-react-redux-epic",
    storageBucket: "todo-app-with-react-redux-epic.appspot.com",
    messagingSenderId: "58816814081"
  };
  firebase.initializeApp(config);







//////////////////////Fire Base Adding  /////////////////////////////////

  // firebase.database().ref('/users'+).set({
  //   username: "name",
  //   email: "email",
  //   profile_picture : "imageUrl"
  // });
// firebase.database().ref('users/' + 2).set({
//     username: "name",
//     email: "email",
//     profile_picture : "imageUrl"
//   });
//   firebase.database().ref('user' + 2).set({
//     username: "name",
//     email: "email",
//     profile_picture : "imageUrl"
//   });
// // firebase.database().ref('/' + 3).set({
//     username: "name",
//     email: "email",
//     profile_picture : "imageUrl"
//   });
// firebase.database().ref('' + 4).set({
//     username: "name",
//     email: "email",
//     profile_picture : "imageUrl"
//   });



// //////////////////////Fire Base Retriving  /////////////////////////////////

// firebase.database().ref('/').on('value', function(snapshot) {
//    console.log(snapshot.val());
// });

// firebase.database().ref('/').once('value', function(snapshot) {
//    console.log(snapshot.val());
// });



// //////////////////////Fire Base Updation  /////////////////////////////////

// firebase.database().ref('/key').update({ey:'Ne Pakistan'});
// firebase.database().ref('3/').update({email:null});
// firebase.database().ref().child('3/username').update({usename:'yasir'});
// firebase.database().ref().child('3').update({key:'yasir'});


// //////////////////////Fire Base Deletion  /////////////////////////////////

// firebase.database().ref('3/key').remove();
// firebase.database().ref('4/email').set({
//     email: null
//   });


