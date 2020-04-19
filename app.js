var corona= new Vue({
    el: "#app",
    mounted: function () {
        this.method1() //method1 will execute at pageload
    },
    data() {
        return {
            active_tt: '',
            active_td: '',
            confirmed_tt: '',
            confirmed_td: '',
            deaths_tt: '',
            deaths_td: '',
            recovered_tt: '',
            recovered_td: '',
            last_updated:'',
            total_tested:' 3,72,123 ',
            total_ind_tested:'3,54,969',
            result: '',
            result1:'',

            mobile_number:'',
            subscribe_flag:false,
            notify:false,


            input_warning: false,

        }
    },
    methods: {
        method1: function () {
            axios
                .get('https://api.covid19india.org/data.json')
                .then(response => {
                   this.result= JSON.stringify(response);

                   this.active_tt= JSON.parse(this.result).data.statewise[0].active;
                   this.confirmed_tt= JSON.parse(this.result).data.statewise[0].confirmed;
                   this.deaths_tt= JSON.parse(this.result).data.statewise[0].deaths;
                   this.recovered_tt= JSON.parse(this.result).data.statewise[0].recovered;

                   this.active_td= JSON.parse(this.result).data.statewise[0].active;
                   this.confirmed_td= JSON.parse(this.result).data.statewise[0].deltaconfirmed;
                   this.deaths_td= JSON.parse(this.result).data.statewise[0].deltadeaths;
                   this.recovered_td= JSON.parse(this.result).data.statewise[0].deltarecovered;

                   this.last_updated= JSON.parse(this.result).data.statewise[0].lastupdatedtime;
                

                  
                })

            // fetch('https://jsonplaceholder.typicode.com/todos/1')
            //     .then(response => response.json())
            //     .then(json => console.log(json))



        },

        subscribeMobileNumber(e){
            e.preventDefault();
            var check_MobileNumber=  confirm(" क्या ये  "+this.mobile_number +"  आप ही का नंबर है? जांच लें, सही है तो ओके करें ");
            if(check_MobileNumber){
            const firebaseConfig = {
                apiKey: "AIzaSyCb17UFrF-iwOnF7jtzsD7u47gWRVLWdmQ",
                authDomain: "covid-19-updates-459b6.firebaseapp.com",
                databaseURL: "https://covid-19-updates-459b6.firebaseio.com",
                projectId: "covid-19-updates-459b6",
                storageBucket: "covid-19-updates-459b6.appspot.com",
                messagingSenderId: "194285663598",
                appId: "1:194285663598:web:819e2146b5fa7c8020fd7f",
                measurementId: "G-8PC5ZS12T1"
              };
              firebase.initializeApp(firebaseConfig);
         
                let db= firebase.database().ref("Subscribtions");
                var newdb= db.push();
                newdb.set(this.mobile_number);
                
                this.subscribe_flag=false;
                this.notify= true;

              this.sendMessageNow();

              setTimeout(() => {
                this.notify= false;
                alert(" अपडेट्स हेतु अपने आप को सब्सक्राइब करने के लिए आपका आभार | हम आपको प्रतिदिन एक मैसेज आपके इनबॉक्स में भेजंगे, जिसमे तब तक की टेस्टिंग, पॉज़ीटिव और ठीक होने वाले मामलो की संख्या रहेगी । नोट :  मैसेज केवल नॉन डीएनडी (Do not Disturb) Numbers पर ही जायेगा | ये सुविधा निःशुल्क है |  अपने घर पर रहिये सुरक्षित रहिये धन्यवाद");
                window.location.reload();
              }, 3000);
                

                
        
            }
            else{
                window.location.reload();
            }
        },


        showMobileDialogue(){
            
            this.subscribe_flag=true;
        },
        
        downloadApp(){
            document.location.href = "https://drive.google.com/uc?id=1OTxCrJHCChbOW0NpZZVLBrVEV55_jKOT&export=download";
        },



          sendMessageNow(){
            // var settings = {
            //     "async": true,
            //     "crossDomain": true,
            //     "url": "https://www.fast2sms.com/dev/bulk",
            //     "method": "POST",
            //     "headers": {
            //       "authorization": "wLr7nZRfemK0lptNoIEaM5gGc2VQY9JvDyb1H4A3jqF86SUsXxS9xKen4PtTskwH0dgQAfEa68MXrZhb",
            //     },
            //     "data": {
            //       "sender_id": "FSTSMS",
            //       "message": "This is a test message",
            //       "language": "english",
            //       "route": "p",
            //       "numbers": this.mobile_number,
            //     }
            //   }
              
            //   $.ajax(settings).done(function (response) {
            //    alert(response)
            //   });






            //   var postData = {
            //     "sender_id": "FSTSMS",
            //            "message": "This is a test message",
            //          "language": "english",
            //           "route": "p",
            //            "numbers": this.mobile_number,
            //   };
              
            //   let axiosConfig = {
            //     headers: {
            //         "async": true,
            //         "crossDomain": true,
            //         "method": "POST",
            //         // 'Content-Type': 'application/json;charset=UTF-8',
            //         "Access-Control-Allow-Origin": "*",
            //     }
            //   };
              
            //   axios.post('https://www.fast2sms.com/dev/bulk', postData, axiosConfig)
            //   .then((res) => {
            //     console.log("RESPONSE RECEIVED: ", res);
            //   })
            //   .catch((err) => {
            //     console.log("AXIOS ERROR: ", err);
            //   })



            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://www.fast2sms.com/dev/bulk?authorization=wLr7nZRfemK0lptNoIEaM5gGc2VQY9JvDyb1H4A3jqF86SUsXxS9xKen4PtTskwH0dgQAfEa68MXrZhbY&sender_id=FSTSMS&language=english&route=qt&numbers=7800818001&message=YOUR_QT_TEMPLATE_ID&variables={AA}|{CC}&variables_values=12345|asdaswdx",
                "method": "GET",
                "headers": {
                  "cache-control": "no-cache"
                }
              }
              
              $.ajax(settings).done(function (response) {
                console.log(response);
              });

        },

        isNumber: function(evt) {
            evt = evt ? evt : window.event;
            var charCode = evt.which ? evt.which : evt.keyCode;
            if (
              charCode > 31 &&
              (charCode < 48 || charCode > 57) &&
              charCode !== 46
            ) {
              evt.preventDefault();
              this.input_warning = true;
            } else {
              this.input_warning = false;
              return true;
            }
          },


        my: function(){
            alert("Aads");
        },
        github(){
            document.location.href = "";
        },
        facebook(){
            document.location.href = "";
        },
        quora(){
            document.location.href = "";
        },
        twitter(){
            document.location.href = "https://twitter.com/WeWillStopCovid";
        },
        instagram(){
            document.location.href = "";
        }

    },
})