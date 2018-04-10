// start jquery________________________________
$(document).ready(function(){
  // start jquery________________________________

  // Reset firebase
  var config = {
    apiKey: "AIzaSyAayiGb2MpdsMjlULLVBDXew2A0GCHnsak",
    authDomain: "newtestforhomework.firebaseapp.com",
    databaseURL: "https://newtestforhomework.firebaseio.com",
    projectId: "newtestforhomework",
    storageBucket: "",
    messagingSenderId: "646767045265"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  // 2. Button for adding Trains
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#dest-input").val().trim();
    var firstTrain = $("#firstTrain-input").val().trim();
    var trainFreq = $("#freq-input").val().trim();

    // Creates local "temporary" object for holding train data
    var newTrain = {
      name: trainName,
      destination: trainDest,
      start: firstTrain,
      frequency: trainFreq
    };

    // Uploads train data to the database
    database.ref().push(newTrain);


    // Alert
    alert("Train successfully added");

    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#dest-input").val("");
    $("#firstTrain-input").val("");
    $("#freq-input").val("");
  });

  // 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().start;
    var trainFreq = childSnapshot.val().frequency;


    // Declare variable
    var trainFreq;

    // Time is to be entered on the entry form
    var firstTime = 0;

    // backtrack a year for accuracy
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");

    // Current Time
    var currentTime = moment();

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    // Time apart (remainder)
    var tRemainder = diffTime % trainFreq;

    // Minute Until Train
    var tMinutesTillTrain = trainFreq - tRemainder;

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");

    // Add each train's data into the table
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq +
    "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>");
  });

  // end jquery________________________________
});
// end jquery________________________________
