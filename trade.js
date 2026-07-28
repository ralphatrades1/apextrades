// ApexTrades Trading Engine

document.addEventListener("DOMContentLoaded", function () {

    initStorage();

    updateBalance();

    setupMarketSearch();

    createChart();

    setupQuickStakeButtons();

});

function updateBalance(){

    const balance=document.getElementById("balance");

    if(balance){

        balance.innerHTML="$"+getBalance().toFixed(2);

    }

}

function setupMarketSearch(){

    const search=document.getElementById("searchMarket");

    const market=document.getElementById("market");

    if(!search || !market) return;

    search.addEventListener("keyup",function(){

        const filter=this.value.toLowerCase();

        Array.from(market.options).forEach(function(option){

            option.style.display=

            option.text.toLowerCase().includes(filter)

            ? ""

            : "none";

        });

    });

}

function createChart(){

    const chartContainer=document.getElementById("chart");

    if(!chartContainer) return;

    chartContainer.innerHTML="";

    const chart=LightweightCharts.createChart(chartContainer,{

        width:chartContainer.clientWidth,

        height:450,

        layout:{
            background:{color:"#0d1117"},
            textColor:"#ffffff"
        },

        grid:{
            vertLines:{color:"#222"},
            horzLines:{color:"#222"}
        }

    });

    const series=chart.addAreaSeries({

        lineColor:"#00d084",

        topColor:"rgba(0,208,132,0.4)",

        bottomColor:"rgba(0,208,132,0.05)"

    });

    series.setData([

        {time:1,value:100},

        {time:2,value:101},

        {time:3,value:103},

        {time:4,value:102},

        {time:5,value:105},

        {time:6,value:107},

        {time:7,value:106},

        {time:8,value:109}

    ]);

}

function setupQuickStakeButtons(){

    const buttons=document.querySelectorAll(".quick-stakes button");

    const stake=document.getElementById("stake");

    buttons.forEach(function(btn){

        btn.addEventListener("click",function(){

            stake.value=this.innerText.replace("$","");

        });

    });

}

function executeTrade(direction){

    const stake=Number(document.getElementById("stake").value);

    if(stake<1){

        alert("Minimum stake is $1.00");

        return;

    }

    if(stake>getBalance()){

        alert("Insufficient balance");

        return;

    }

    setBalance(getBalance()-stake);

    updateBalance();

    setTimeout(function(){

        const win=Math.random()>0.5;

        if(win){

            const payout=stake*1.95;

            setBalance(getBalance()+payout);

            alert("🎉 Trade Won! +$"+payout.toFixed(2));

        }else{

            alert("❌ Trade Lost");

        }

        updateBalance();

    },3000);

}

document.addEventListener("click",function(e){

    if(e.target.classList.contains("buy-up")){

        executeTrade("UP");

    }

    if(e.target.classList.contains("buy-down")){

        executeTrade("DOWN");

    }

});
