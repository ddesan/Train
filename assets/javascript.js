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

        // Calculate "Next arrival" and "Minutes Away" with moments

        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
        console.log(firstTimeConverted);

        // Current Time
        var currentTime = moment().format("HH:mm");
        console.log(currentTime);

        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log(diffTime);

        // Time apart (remainder)
        var tRemainder = diffTime % frequency;
        console.log(tRemainder);

        // Minute Until Train
        var tMinutesTillTrain = frequency - tRemainder;
        console.log(tMinutesTillTrain);

        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");

        var a = moment(nextTrain).format("hh:mm");
        console.log(a);

        // Push it to the data base in Firebase
        database.ref().push({
            trainName: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
            tMinutesTillTrain: tMinutesTillTrain,
            a: a,
        })

        // Clear input fields
        $("#train-name-input").val("");
        $("#destination-input").val("");
        $("#first-train-input").val("");
        $("#frequency-input").val("");
        
        // Validate changes in Firebase

        database.ref().on("value", function (snapshot){
            console.log(snapshot.val());
        })

    })

// 2. We need to show the information the user entry in the dashboard

    database.ref().on("child_added", function(childSnapshot) {
        
        // Store in a variable
         var dbTrainName = childSnapshot.val().trainName;
         var dbDesInput = childSnapshot.val().destination;
         var dbFirstTrainName = childSnapshot.val().firstTrain;
         var dbFrequencyInput = childSnapshot.val().frequency;
         var dbtMinutesTillTrain = childSnapshot.val().tMinutesTillTrain;
         var dbnextTrain = childSnapshot.val().a;

            console.log(dbTrainName);
            console.log(dbDesInput);
            console.log(dbFirstTrainName);
            console.log(dbFrequencyInput);
            console.log(dbtMinutesTillTrain);
            console.log(dbnextTrain);

        // Create the new row
        var newRow = $("<tr>").append(
            $("<td>").text(dbTrainName),
            $("<td>").text(dbDesInput),
            $("<td>").text(dbFrequencyInput),
            $("<td>").text(dbnextTrain),
            $("<td>").text(dbtMinutesTillTrain),
        );

        // Append the new row to the table
        $("#train-table > tbody").append(newRow);
    });

// 3. Calculate "Next arrival" and "Minutes Away" with moments

    // // First Time (pushed back 1 year to make sure it comes before current time)
    // var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    // console.log(firstTimeConverted);

    // // Current Time
    // var currentTime = moment();
    // console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    // // Difference between the times
    // var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    // console.log("DIFFERENCE IN TIME: " + diffTime);

    // // Time apart (remainder)
    // var tRemainder = diffTime % tFrequency;
    // console.log(tRemainder);

    // // Minute Until Train
    // var tMinutesTillTrain = tFrequency - tRemainder;
    // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // // Next Train
    // var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    // console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

// ----------------------------------------------------------------------
// Main Process
// ----------------------------------------------------------------------


