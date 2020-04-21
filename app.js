var corona = new Vue({
    el: "#app",
    mounted: function () {
        this.method1() //method1 will execute at pageload
        this.loadStateData();
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
            last_updated: '',


            total_tested: '462621 ',
            total_ind_tested: '447812',
            today_tested_icmr: '26943 ',
            today_positive_icmr: '[report mein nahin btaya gya]',
            date_icmr: '21 अप्रैल 2020  9PM',


            result: '',
            result1: '',




            download_App_Loading: false,

            DisttConfirmArray: '',
            DisttNewCaseArray: '',

            feedback_conatiner_flag: true,
            subscribe_contaoner_flag: true,


           

            disttConfirmCases: [],
            disttConformNewCases: [],
            listOfDistt: [],
            listOfDisttHindi: ['आगरा','अलीगढ',
                'अमरोहा',
                'औरैया',
                'आजमगढ़',
                'बागपत',
                'बांदा',
                'बाराबंकी',
                'बरेली',
                'बस्ती',
                'भदोही',
                'बिजनौर',
                'बदायूं',
                'बुलंदशहर',
                'एटा',
                'इटावा',
                'फिरोजाबाद',
                'नोएडा',
                'गाज़ियाबाद',
                'गाजीपुर',
                'गोंडा',
                'हापुड़',
                'हरदोई',
                'हाथरस',
                'जौनपुर',
                'कन्नौज',
                'कानपुर',
                'कासगंज',
                'कौशाम्बी',
                'खेरी',
                'लखनऊ',
                'महराजगंज',
                'मैनपुरी',
                'मथुरा',
                'मऊ',
                'मेरठ',
                'मिर्जापुर',
                'मुरादाबाद',
                'मुजफ्फरनगर',
                'पीलीभीत',
                'प्रतापगढ़',
                'प्रयागराज',
                'रायबरेली',
                'रामपुर',
                'सहारनपुर',
                'संभल',
                'संतकबीरनगर',
                'शाहजहांपुर',
                'शामली',
                'सीतापुर',
                'सुल्तानपुर',
                'उन्नाव',
                'वाराणसी',
                'नहीं पता '],

            showFeedbackForm: false,
            showSubscribeForm: false,

            wistleCount: '',




        }
    },
    methods: {
        method1: function () {
            axios
                .get('https://api.covid19india.org/data.json')
                .then(response => {
                    this.result = JSON.stringify(response);

                    this.active_tt = JSON.parse(this.result).data.statewise[0].active;
                    this.confirmed_tt = JSON.parse(this.result).data.statewise[0].confirmed;
                    this.deaths_tt = JSON.parse(this.result).data.statewise[0].deaths;
                    this.recovered_tt = JSON.parse(this.result).data.statewise[0].recovered;

                    this.active_td = JSON.parse(this.result).data.statewise[0].active;
                    this.confirmed_td = JSON.parse(this.result).data.statewise[0].deltaconfirmed;
                    this.deaths_td = JSON.parse(this.result).data.statewise[0].deltadeaths;
                    this.recovered_td = JSON.parse(this.result).data.statewise[0].deltarecovered;
                    this.last_updated = JSON.parse(this.result).data.statewise[0].lastupdatedtime;



                })





        },

        loadStateData() {
            axios
                .get('https://api.covid19india.org/state_district_wise.json')
                .then(response => {
                    var result = JSON.stringify(response);
                    var data = JSON.parse(result).data;
                    var state = "Uttar Pradesh";
                    var disttCollection;
                    for (const [getState, distt] of Object.entries(data)) {

                        if (getState == state) {
                            disttCollection = distt;
                        }
                    }
                    var disttObj = disttCollection.districtData;

                    // console.log(this.nameOfDistt);   //success list of distt

                    var arr = [];

                    for (const [distt, disttValues] of Object.entries(disttObj)) {
                        arr.push(disttValues);
                        this.listOfDistt.push(distt);
                    }

                    console.log(this.listOfDistt);  //list of distt eng
                    // changing Name of Distt
                    for (let i in this.listOfDistt) {
                        if (this.listOfDistt[i] == "Gautam Buddha Nagar") {
                            this.listOfDistt[i] = "Noida";
                        }

                        if (this.listOfDistt[i] == "Sant Kabir Nagar") {
                            this.listOfDistt[i] = "SantKabirNagar";
                        }

                        // if (this.listOfDistt[i] == "Unknown") {
                        //     this.listOfDisttHindi.push("अज्ञात");
                        // }..
                    }


                    for (let i in arr) {
                        this.disttConfirmCases.push(arr[i].confirmed);
                        this.disttConformNewCases.push(arr[i].delta.confirmed)
                    }
                    for (let i in this.disttConformNewCases) {
                        if (this.disttConformNewCases[i] == 0) {
                            this.disttConformNewCases[i] = "--";
                        }
                    }

                    console.log(this.listOfDisttHindi);


                    //console.log(this.disttConfirmCases); //list of cases success all distt
                    //console.log(this.disttConformNewCases); //list of new cases of all distt               
                })
        },

        playWistle() {
 
            firebaseConfig= {
                apiKey: "AIzaSyCb17UFrF-iwOnF7jtzsD7u47gWRVLWdmQ",
                authDomain: "covid-19-updates-459b6.firebaseapp.com",
                databaseURL: "https://covid-19-updates-459b6.firebaseio.com",
                projectId: "covid-19-updates-459b6",
                storageBucket: "covid-19-updates-459b6.appspot.com",
                messagingSenderId: "194285663598",
                appId: "1:194285663598:web:819e2146b5fa7c8020fd7f",
                measurementId: "G-8PC5ZS12T1"
            },
            firebase.initializeApp(firebaseConfig);
            var db = firebase.database().ref("NEwDB");
          
           
            // setTimeout(() => {
            //     this.reloadPage();
            // }, 2000);

            db.on("value",function(snapshot){ 
                var data= snapshot.val();
                console.log(data);
             var objlen= Object.keys(data).length;

             var wistleArray=[];
             for(const[key,val] of Object.entries(data)){
                wistleArray.push(val);
             }
             console.log(wistleArray[objlen-1]);


            var latestWistleCount= wistleArray[objlen-1];

            this.wistleCount= latestWistleCount+1;
            console.log(this.wistleCount);

            })

            var newdb = db.push();
            newdb.set(5);


        },


        reloadPage(){
            location.reload(true);
        },



        downloadApp() {
            this.download_App_Loading = true;
            document.location.href = "https://docs.google.com/uc?export=download&id=1OTxCrJHCChbOW0NpZZVLBrVEV55_jKOT";
            setTimeout(() => {
                this.download_App_Loading = false;
            }, 2000);
        },

        // isNumber: function (evt) {
        //     evt = evt ? evt : window.event;
        //     var charCode = evt.which ? evt.which : evt.keyCode;
        //     if (
        //         charCode > 31 &&
        //         (charCode < 48 || charCode > 57) &&
        //         charCode !== 46
        //     ) {
        //         evt.preventDefault();
        //         this.input_warning = true;
        //     } else {
        //         this.input_warning = false;
        //         return true;
        //     }
        // },


        // my: function () {
        //     alert("Aads");
        // },

        twitter() {
            document.location.href = "https://twitter.com/WeWillStopCovid";
        },

        showSubscribeFormMethod(){
         ;
          this.subscribe_contaoner_flag=false;
          this.showSubscribeForm= true;
        

        },

        showFeedbackFormMethod(){
           
            this.feedback_conatiner_flag=false;
            this.showFeedbackForm= true;
  
        },

        hideFeedBackForm(){
           
            this.feedback_conatiner_flag=true;
            this.showFeedbackForm= false;
        },
        hideSubscribeForm(){
            this.subscribe_contaoner_flag=true;
          this.showSubscribeForm= false;
        }


    },
})