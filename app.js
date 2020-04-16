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
            total_tested:'3,02,956',
            total_ind_tested:'2,86,714',
            result: '',
            result1:''

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
            document.location.href = "https://twitter.com/T2Ashoo";
        },
        instagram(){
            document.location.href = "https://www.instagram.com/ashumsd7/";
        }

    },
})