var config = {
    apiKey: "AIzaSyBumxOEr9sioQ1NtNsSbSissY9CRRspT4E",
    authDomain: "space-6d716.firebaseapp.com",
    databaseURL: "https://space-6d716.firebaseio.com",
    projectId: "space-6d716",
    storageBucket: "",
    messagingSenderId: "459450189725"
  };
  firebase.initializeApp(config);

var name = "";
var dest = "";
var first = 0;
var freq = 0;
var database = firebase.database();

$("#welcome").on("click", function(){
	$(".container").css("display","block");
})

$("#submit").on("click",function(){
	name = $("#name").val().trim();
	dest = $("#dest").val().trim();
	first = $("#first").val().trim();
	freq = $("#freq").val().trim();
	

	database.ref().push({
		Rocket_name:name,
		Destination:dest,
		First_trian:first,
		Frequency:freq,
		dateAdded: firebase.database.ServerValue.TIMESTAMP
	});
});

	// Assume the following situtation
	// First Rocket is 3:00 am
	// it comes every 60 minutes
	// the current time is 3:50 am
	// so it will be 10 minutes away

	// Mathematically
	// 50 - 00 = 50
	//  50 % 60 = 50
	//  60 - 50 = 10
	// 10 + 3:00 = 3:10

	



	var ref = database.ref();
	var filter = ref.orderByChild("dateAdded").limitToLast(1)

	filter.on("child_added", function(snapshot){
		
		var currentTime = moment();
	console.log(moment(currentTime).format("hh:mm"));
	var firstTimeConverted = moment(first, "hh:mm").subtract(1, "years");
	console.log(firstTimeConverted);
	console.log(moment(first,"hh:mm"));
	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	console.log(diffTime);
	var tRemainder = diffTime % freq;
	console.log(tRemainder);
	var tMinutesTill = freq - tRemainder;
	console.log(tMinutesTill);
	var nextRocket = moment().add(tMinutesTill, "minutes").format("hh:mm");
	// console.log(nextRocket.format("hh:mm"));


		var sv = snapshot.val();

		

		var tr = "<tr><td>"+sv.Rocket_name+"</td><td>"+sv.Destination+"</td><td>"+freq+"</td><td>"+nextRocket+"</td><td>"+tMinutesTill+"</td></tr>"

		$("#display").prepend(tr)
		
		// $("#name").text();
		// $("#dest").text(snapshot.val().dest);
		// $("#first").text(snapshot.val().first);
		// $("#freq").text(snapshot.val().freq);


	}, function(errorObject){
		console.log("Error handled: " + errorObject.code);
	});




