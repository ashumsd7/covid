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
            total_tested:' 3,35,123 ',
            total_ind_tested:'3,18,449',
            result: '',
            result1:'',

            mobile_number:'',
            subscribe_flag:false,
            notify:false

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
            var check_MobileNumber=  confirm(" Check Your Mobile Number "+this.mobile_number +" Is it ok? ");
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
              setTimeout(() => {
                this.notify= false;
                alert("अपडेट्स हेतु अपने आप को सब्सक्राइब करने के लिए आपका आभार | हम आपको प्रतिदिन एक मैसेज आपके इनबॉक्स में भेजंगे, जिसमे तब तक की टेस्टिंग, पॉज़ीटिव और ठीक होने वाले मामलो की संख्या रहेगी । नोट :  मैसेज केवल नॉन डीएनडी (Do not Disturb) Numbers पर ही जायेगा | ये सुविधा निःशुल्क है |  अपने घर पर रहिये सुरक्षित रहिये धन्यवाद ")
                window.location.reload();
              }, 2000);
                

                
        
            }
            else{
                window.location.reload();
            }
        },


        showMobileDialogue(){
            
            this.subscribe_flag=true;
        },


        my: function(){
            alert("Aads");
        },
        github(){
            document.location.href = "https://github.com/ashumsd7";
        },
        facebook(){
            document.location.href = "https://www.facebook.com/ashu027";
        },
        quora(){
            document.location.href = "https://www.quora.com/profile/%E0%A4%86%E0%A4%B6%E0%A5%81%E0%A4%A4%E0%A5%8B%E0%A4%B7-%E0%A4%86%E0%A4%A8%E0%A4%A8%E0%A5%8D%E0%A4%A6-%E0%A4%A4%E0%A4%BF%E0%A4%B5%E0%A4%BE%E0%A4%B0%E0%A5%80-Ashutosh-Anand-Tiwari";
        },
        twitter(){
            document.location.href = "https://twitter.com/WeWillStopCovid";
        },
        instagram(){
            document.location.href = "https://www.instagram.com/ashumsd7/";
        }

    },
})