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
	$("#header-item").val(data.val().landing.header);
	$("#tagline-item").text(data.val().landing.tagline);
	$("#imgURL").css("background-image", "url(" + data.val().landing.imgURL + ")");
}

function updateDB(){
	let new_header = $("#header-item").val();
	let new_tagline = $("#tagline-item").val();
	let new_img = $("#imgUpload")[0].files[0];

	if (new_img != undefined){
		let uploadTask = storageRef.child("img").put(new_img);

		uploadTask.on("state_changed", null, null, () => {
			uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
				let data = {
					header: new_header,
					tagline: new_tagline,
					imgURL: downloadURL
				};

				db.ref().child("landing").set(data);
			});
		});
	} else {
		let data = {
			header: new_header,
			tagline: new_tagline,
			imgURL: "https://firebasestorage.googleapis.com/v0/b/cms-manager-ebdfa.appspot.com/o/bg-masthead.jpg?alt=media&token=9907cdf6-9638-46c5-8977-d023936ce503"
		}

		db.ref().child("landing").set(data);
	}
}

function errData(err){
	console.log("Error!", err);
}

window.onbeforeunload = function(e) {
	db.ref("landing").set({
		header: "YOUR FAVORITE BOOTSTRAP THEMES",
		tagline: "Start Bootstrap can help you build better websites using the Bootstrap framework! Just download a theme and start customizing, no strings attached!",
		imgURL: "https://firebasestorage.googleapis.com/v0/b/cms-manager-ebdfa.appspot.com/o/bg-masthead.jpg?alt=media&token=9907cdf6-9638-46c5-8977-d023936ce503"
	});

	$("#header-item").val(data.val().landing.header);
	$("#tagline-item").text(data.val().landing.tagline);
	$("#imgURL").css("background-image", "url(" + data.val().landing.imgURL + ")");
};
