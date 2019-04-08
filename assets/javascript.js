// INITIALIZE FIREBASE
var config = {
    apiKey: "AIzaSyDhiVP9nWVVVDSAcq4g29cYGfhJWdDvrOE",
    authDomain: "train-station-20ca1.firebaseapp.com",
    databaseURL: "https://train-station-20ca1.firebaseio.com",
    projectId: "train-station-20ca1",
    storageBucket: "train-station-20ca1.appspot.com",
    messagingSenderId: "497969176386"
  };

  firebase.initializeApp(config);

// ----------------------------------------------------------------------
// Variables
// ----------------------------------------------------------------------

var database = firebase.database();

console.log(database);

var trainName = "";
var destination = "";;
var firstTrain = "";;
var frequency = "";;

// ----------------------------------------------------------------------
// Formulas
// ----------------------------------------------------------------------
// 1. We need to storage the input from the user to the variables and to firebase
    
    $("#add-train-btn").on("click", function(event){
        
        event.preventDefault();

        // Input
        trainName = $("#train-name-input").val().trim();
        destination = $("#destination-input").val().trim();
        firstTrain = $("#first-train-input").val().trim();
        frequency = $("#frequency-input").val().trim();

        // Change in Firebase
        database.ref().set({
            trainName: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
        })
    });

    // Validate changes in Firebase

    database.ref().on("value", function (snapshot){
        console.log(snapshot.val());
    })

// 2. We need to show the information the user entry in the dashboard

// ----------------------------------------------------------------------
// Main Process
// ----------------------------------------------------------------------


