// ----------------------------------------------------------------------
// INITIALIZE FIREBASE
// ----------------------------------------------------------------------

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

        // Push it to the data base in Firebase
        database.ref().push({
            trainName: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
        })

        // Clear input fields
        $("#train-name-input").val("");
        $("#destination-input").val("");
        $("#first-train-input").val("");
        $("#frequency-input").val("");

    });

    // Validate changes in Firebase

    database.ref().on("value", function (snapshot){
        console.log(snapshot.val());
    })

// 2. We need to show the information the user entry in the dashboard

    database.ref().on("child_added", function(childSnapshot) {
        
        // Store in a variable
         var dbTrainName = childSnapshot.val().trainName;
         var dbDesInput = childSnapshot.val().destination;
         var dbFirstTrainName = childSnapshot.val().firstTrain;
         var dbFrequencyInput = childSnapshot.val().frequency;

            console.log(dbTrainName);
            console.log(dbDesInput);
            console.log(dbFirstTrainName);
            console.log(dbFrequencyInput);

        // Create the new row
        var newRow = $("<tr>").append(
            $("<td>").text(dbTrainName),
            $("<td>").text(dbDesInput),
            $("<td>").text(dbFirstTrainName),
            $("<td>").text(dbFrequencyInput),
        );

        // Append the new row to the table
        $("#train-table > tbody").append(newRow);
    });


// ----------------------------------------------------------------------
// Main Process
// ----------------------------------------------------------------------


