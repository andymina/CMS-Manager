// Initialize Firebase
var config = {
	apiKey: "AIzaSyB6I3lDmMfYVjpwQCmgbCxEOvMl5VMiv9c",
	authDomain: "cms-manager-ebdfa.firebaseapp.com",
	databaseURL: "https://cms-manager-ebdfa.firebaseio.com",
	projectId: "cms-manager-ebdfa",
	storageBucket: "cms-manager-ebdfa.appspot.com",
	messagingSenderId: "541952564148"
};

firebase.initializeApp(config);
let db = firebase.database();
db.ref().on("value", gotData, errData);

function gotData(data){
	$("#header").text(data.val().landing.header);
	$("#tagline").text(data.val().landing.tagline);
	$("#img").css("background-image", "url(" + data.val().landing.imgURL + ")");
}

function errData(err){
	console.log("Error!", err);
}

window.onbeforeunload = function(e) {
	$("#header").val(data.val().landing-o.header);
	$("#tagline").text(data.val().landing-o.tagline);
	$("#img").css("background-image", "url('https://firebasestorage.googleapis.com/v0/b/cms-manager-ebdfa.appspot.com/o/bg-masthead.jpg?alt=media&token=9907cdf6-9638-46c5-8977-d023936ce503')");

	db.ref("landing").set({
		header: "NULL",
		tagline: "NULL",
		imgURL: "https://firebasestorage.googleapis.com/v0/b/cms-manager-ebdfa.appspot.com/o/bg-masthead.jpg?alt=media&token=9907cdf6-9638-46c5-8977-d023936ce503"
	});
};
