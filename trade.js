// ===============================
// ApexTrades V2
// Trade Engine - Part 1
// ===============================

let chart;
let candleSeries;
let candles = [];
let currentPrice = 100;

// Start App
document.addEventListener("DOMContentLoaded", () => {

    createChart();

    loadBalance();

    setupTabs();

    setupContractUI();

    setupStakeButtons();

    setupDigitButtons();

});

// --------------------
// Balance
// --------------------

function loadBalance(){

    const balance = document.getElementById("balance");

    if(balance){

        balance.textContent="$1000.00";

    }

}

// --------------------
// Chart
// --------------------

function createChart(){

    const container=document.getElementById("chart");

    chart=LightweightCharts.createChart(container,{

        width:container.clientWidth,

        height:container.clientHeight,

        layout:{
            background:{color:"#111827"},
            textColor:"#ffffff"
        },

        grid:{
            vertLines:{color:"#222"},
            horzLines:{color:"#222"}
        },

        rightPriceScale:{
            borderColor:"#333"
        },

        timeScale:{
            borderColor:"#333",
            timeVisible:true,
            secondsVisible:true
        }

    });

    candleSeries=chart.addCandlestickSeries({

        upColor:"#00d084",

        downColor:"#ff4d4f",

        wickUpColor:"#00d084",

        wickDownColor:"#ff4d4f",

        borderVisible:false

    });

    generateHistory();

    setInterval(addNewCandle,1000);

}

// --------------------
// History
// --------------------

function generateHistory(){

    candles=[];

    let time=Math.floor(Date.now()/1000)-100;

    currentPrice=100;

    for(let i=0;i<100;i++){

        const open=currentPrice;

        const close=open+(Math.random()-0.5)*2;

        const high=Math.max(open,close)+Math.random();

        const low=Math.min(open,close)-Math.random();

        candles.push({

            time:time+i,

            open,

            high,

            low,

            close

        });

        currentPrice=close;

    }

    candleSeries.setData(candles);

    updatePrice();

}

function addNewCandle(){

    const last=candles[candles.length-1];

    const open=last.close;

    const close=open+(Math.random()-0.5)*2;

    const high=Math.max(open,close)+Math.random();

    const low=Math.min(open,close)-Math.random();

    candles.push({

        time:last.time+1,

        open,

        high,

        low,

        close

    });

    if(candles.length>100){

        candles.shift();

    }

    candleSeries.setData(candles);

    currentPrice=close;

    updatePrice();

}

function updatePrice(){

    document.getElementById("price").textContent=currentPrice.toFixed(2);

}

// --------------------
// Tabs
// --------------------

function setupTabs(){

    const tabs=document.querySelectorAll(".tab");

    const trade=document.getElementById("tradePanel");

    const positions=document.getElementById("positionsPanel");

    const history=document.getElementById("historyPanel");

    tabs.forEach((tab,index)=>{

        tab.onclick=function(){

            tabs.forEach(t=>t.classList.remove("active"));

            tab.classList.add("active");

            trade.style.display="none";

            positions.style.display="none";

            history.style.display="none";

            if(index===0) trade.style.display="block";

            if(index===1) positions.style.display="block";

            if(index===2) history.style.display="block";

        };

    });

}
