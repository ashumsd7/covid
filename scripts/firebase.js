var firebaseConfig = {
    apiKey: "AIzaSyCb17UFrF-iwOnF7jtzsD7u47gWRVLWdmQ",
    authDomain: "covid-19-updates-459b6.firebaseapp.com",
    databaseURL: "https://covid-19-updates-459b6.firebaseio.com",
    projectId: "covid-19-updates-459b6",
    storageBucket: "covid-19-updates-459b6.appspot.com",
    messagingSenderId: "194285663598",
    appId: "1:194285663598:web:819e2146b5fa7c8020fd7f",
    measurementId: "G-8PC5ZS12T1"
  }
  firebase.initializeApp(this.firebaseConfig);
  var db = firebase.database().ref("WistleCount");
  var newdb = db.push();
  var wistleCount;
  var wistlearray = [];
  var fakeKey = [];
  
  var count;
  var lastCount;
  window.onload = function () {

    // alert("firebase in js");
    // var wTag= document.getElementById("wistle-show")
  
    db.on("value", function (snapshot) {
      var data = snapshot.val();
      // console.log(data);
      wistleCount = Object.keys(data).length;
      // alert(participantsCount);
      console.log(wistleCount);
      for (const [key, val] of Object.entries(data)) {
        wistlearray.push(val);
        fakeKey.push(key);
      }
      lastCount= wistlearray[wistleCount-1];
    //   alert(Number(lastCount));
    lastCount= Number(lastCount);
      console.log(wistlearray);
    });
    // wTag.innerText=lastCount;
  
   
    //  newdb.set(3);
  };  

  function playsound(){
    //   alert("??")
    var audio = new Audio('./scripts/smile.mp3');
    audio.play();
  }
  function showTotalWistleCount(){
      var showcc= document.getElementById('wistle-show');
      showcc.innerText=wistleCount;
    //   alert(wistleCount);
  }

  function increaseCount(){
    //   alert(lastCount)
        playsound();

    // var audio = new Audio('smile.mp3');
    //     audio.play();
      var insertIt= ++lastCount;
      newdb.set(insertIt);
      setTimeout(() => {
        location.reload(true);
      }, 2000);
    

  }