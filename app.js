var corona = new Vue({
    el: "#app",
    mounted: function () {
        this.method1() //method1 will execute at pageload
        this.loadStateData();
        this.collectAllStateData();

        setTimeout(() => {
            this.showAnyPopUp();

        }, 4000);
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

            total_tested:'12,76,781',
            today_tested_icmr:'84,835',
            last_updated:'',
            date_icmr: '6 मई 2020 9AM',
            betweenDates:'5 मई 9AM से 6 मई  9AM तक ',


            result: '',
            result1: '',




            download_App_Loading: false,

            DisttConfirmArray: '',
            DisttNewCaseArray: '',

            feedback_conatiner_flag: true,
            subscribe_contaoner_flag: true,


           

            disttConfirmCases: [],
            disttConformNewCases: [],
            disttRecovered:[],
            disttdeceased:[],
            listOfDistt: [],
            listOfDisttHindi: ['आगरा','अलीगढ','अमेठी',
                'अमरोहा',
                'औरैया',
                'आजमगढ़',
                'बागपत',
                'बहराइच',
                 'बलरामपुर',
                'बांदा',
                'बाराबंकी',
                'बरेली',
                'बस्ती',
                'भदोही',
                'बिजनौर',
                'बदायूं',
                'बुलंदशहर',
                'चित्रकूट',
                'देवरिया',
                'एटा',
                'इटावा',
                'फिरोजाबाद',
                'नोएडा',
                'गाज़ियाबाद',
                'गाजीपुर',
                'गोंडा',
                'गोरखपुर',
                'हापुड़',
                'हरदोई',
                'हाथरस',
                'जालौन ',
                'जौनपुर',
                'झाँसी ',
                'कन्नौज',
                'कानपुर दे.',
                'कानपुर न.',
                'कासगंज',
                'कौशाम्बी',
                'लखीमपुर',
                'कुशीनगर ',
                'लखनऊ',
                'महोबा',
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
                'श्रावस्ती',
                'सिद्धार्थनगर',
                'सीतापुर',
                'सुल्तानपुर',
                'उन्नाव',
                'वाराणसी',
                'अयोध्या',
                'नहीं पता '],

            showFeedbackForm: false,
            showSubscribeForm: false,

            wistleCount: '',

            stateConfirmed:[],
            stateRecovered:[],
            stateActive:[],
            stateDeaths:[],
            stateDeltaConfirmed:[],
            stateDeltaRecovered:[],
            stateDeltaDeaths:[],
            stateLastTimeUpdated:[],
            stateNameFilteredEng:[],
            stateNameHindi:['महाराष्ट्र',
                'गुजरात',
                'दिल्ली',
                'तमिलनाडु',
                'राजस्थान', 
                'मध्यप्रदेश',   
               
                
                'उत्तरप्रदेश',
                'आंध्रप्र.',
                'पंजाब',
                'पश्चिमबं',
                
                
                'तेलंगाना',
                
                
                'जम्मूक.',
                'कर्नाटक',
                'हरियाणा',
                'बिहार',
                
                'केरल',             
                
         
                
                
                'ओडिशा',
                'झारखंड',
                'चंडीगढ़',
                'उत्तराखंड',
                'छत्तीसगढ़',
                'असम',
                'लद्दाख',
                'हिमाचल',
                
                
                
                'अंडमान',
                'त्रिपुरा',
               
               
                'मेघालय',
                'पुडुचेरी',
                'गोवा',
                
                'मणिपुर',
                
                'मिजोरम',
                'अरुणाचल',
                'नगालैंड',
                'दादरा',
                'दमनदीव',
                'लक्षद्वीप',
                'सिक्किम'],
            showPopPup: false




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

                    // console.log(this.listOfDistt);  //list of distt eng
                    // changing Name of Distt
                    for (let i in this.listOfDistt) {
                        if (this.listOfDistt[i] == "Lakhimpur Kheri") {
                            this.listOfDistt[i] = "Lakhimpur";
                        }
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
                        this.disttRecovered.push(arr[i].recovered);
                        this.disttdeceased.push(arr[i].deceased)
                    }
                    for (let i in this.disttConformNewCases) {
                        if (this.disttConformNewCases[i] == 0) {
                            this.disttConformNewCases[i] = "-";
                        }
                    }

                    for (let i in this.disttRecovered) {
                        if (this.disttRecovered[i] == 0) {
                            this.disttRecovered[i] = "-";
                        }
                    }

                    for (let i in this.disttdeceased) {
                        if (this.disttdeceased[i] == 0) {
                            this.disttdeceased[i] = "-";
                        }
                    }

                     console.log(this.listOfDisttHindi);


                    //console.log(this.disttConfirmCases); //list of cases success all distt
                    //console.log(this.disttConformNewCases); //list of new cases of all distt               
                })
        },


        collectAllStateData(){
            axios
            .get('https://api.covid19india.org/data.json')
            .then(response => {
                this.result = JSON.stringify(response);

                var fullData= JSON.parse(this.result).data.statewise;

               
                var stateName=[];
               
                for(let eachObj of fullData)
                {
                    // console.log(eachObj.confirmed);
                    this.stateConfirmed.push(eachObj.confirmed);
                    this.stateRecovered.push(eachObj.recovered);
                    this.stateActive.push(eachObj.active);
                    this.stateDeaths.push(eachObj.deaths);
                    this.stateDeltaConfirmed.push(eachObj.deltaconfirmed);
                    this.stateDeltaRecovered.push(eachObj.deltarecovered);
                    this.stateDeltaDeaths.push(eachObj.deltadeaths);
                    stateName.push(eachObj.state);
                    this.stateLastTimeUpdated.push(eachObj.lastupdatedtime);
                }

                for (let i in this.stateDeaths) {
                    if (this.stateDeaths[i] == 0) {
                        this.stateDeaths[i] = "-";
                    }
                }

                
                for (let i in this.stateConfirmed) {
                    if (this.stateConfirmed[i] == 0) {
                        this.stateConfirmed[i] = "-";
                    }
                }

                for (let i in this.stateRecovered) {
                    if (this.stateRecovered[i] == 0) {
                        this.stateRecovered[i] = "-";
                    }
                }

               
//please if u looking at this code make it automatic I could also make it, and I will make , but if possible and u have time do it now. Thank u
                for(let i in stateName)
                {
                    if(stateName[i]=="Madhya Pradesh")
                    {
                        stateName[i]="MP";
                    }

                    if(stateName[i]=="Uttar Pradesh")
                    {
                        stateName[i]="UP";
                    }

                    if(stateName[i]=="Jammu and Kashmir")
                    {
                        stateName[i]="J&K";
                    }

                    if(stateName[i]=="Himachal Pradesh")
                    {
                        stateName[i]="Himachal";
                    }


                    if(stateName[i]=="Dadra and Nagar Haveli")
                    {
                        stateName[i]="Dadra&NH";
                    }

                    if(stateName[i]=="Andhra Pradesh")
                    {
                        stateName[i]="Andhra";
                    }

                    if(stateName[i]=="Andaman and Nicobar Islands")
                    {
                        stateName[i]="AndamanNB";
                    }

                    if(stateName[i]=="Daman and Diu")
                    {
                        stateName[i]="Daman&D.";
                    }
                    if(stateName[i]=="Arunachal Pradesh")
                    {
                        stateName[i]="Arunachal";
                    }
                    if(stateName[i]=="Tamil Nadu")
                    {
                        stateName[i]="TN";
                    }
                    if(stateName[i]=="West Bengal")
                    {
                        stateName[i]="WB";
                    }
                }
                this.stateNameFilteredEng= stateName;

                this.stateConfirmed.shift();
                this.stateRecovered.shift();
                this.stateActive.shift();
                this.stateDeaths.shift();
                this.stateDeltaConfirmed.shift();
                this.stateLastTimeUpdated.shift();
                this.stateDeltaRecovered.shift();
                this.stateDeltaDeaths.shift();
                this.stateNameFilteredEng.shift();


                // console.log(stateName);

            //   console.log(fullData);



            })


        },

        showAnyPopUp(){
            this.showPopPup= true;
            window.scrollBy(0, 500);
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