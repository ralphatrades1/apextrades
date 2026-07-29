// ApexTrades Trade Engine - Part 1

let chart;
let candleSeries;
let candles = [];
let currentPrice = 100;

document.addEventListener("DOMContentLoaded", () => {

    loadBalance();

    updateMarketName();

    quickStakeButtons();

    createChart();

});

function loadBalance(){

    const balance=document.getElementById("balance");

    if(balance){

        if(typeof getBalance==="function"){

            balance.textContent="$"+getBalance().toFixed(2);

        }else{

            balance.textContent="$1000.00";

        }

    }

}

function updateMarketName(){

    const market=document.getElementById("market");

    const title=document.getElementById("selectedMarket");

    market.addEventListener("change",()=>{

        title.textContent=market.value;

    });

}

function quickStakeButtons(){

    const stake=document.getElementById("stake");

    document.querySelectorAll(".quick-stakes button").forEach(btn=>{

        btn.onclick=function(){

            stake.value=this.innerText.replace("$","");

        };

    });

}

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

        borderVisible:false,

        wickUpColor:"#00d084",

        wickDownColor:"#ff4d4f"

    });

    generateHistory();

    setInterval(addNewCandle,1000);

    window.addEventListener("resize",()=>{

        chart.applyOptions({

            width:container.clientWidth,

            height:container.clientHeight

        });

    });

}

function generateHistory(){

    candles=[];

    let time=Math.floor(Date.now()/1000)-120;

    currentPrice=100;

    for(let i=0;i<120;i++){

        const open=currentPrice;

        const close=open+(Math.random()-0.5)*2;

        const high=Math.max(open,close)+Math.random();

        const low=Math.min(open,close)-Math.random();

        candles.push({

            time:time+i,

            open:open,

            high:high,

            low:low,

            close:close

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

        open:open,

        high:high,

        low:low,

        close:close

    });

    if(candles.length>120){

        candles.shift();

    }

    candleSeries.setData(candles);

    currentPrice=close;

    updatePrice();

}

function updatePrice(){

    const price=document.getElementById("price");

    if(price){

        price.textContent=currentPrice.toFixed(2);

    }

}
// Dynamic contract controls

const contractType = document.getElementById("contractType");
const buyUp = document.getElementById("buyUp");
const buyDown = document.getElementById("buyDown");

const barrierBox = document.getElementById("barrierBox");
const digitBox = document.getElementById("digitBox");

const tradeMode = document.getElementById("tradeMode");
const timeBox = document.getElementById("timeBox");
const tickBox = document.getElementById("tickBox");

tradeMode.addEventListener("change", function(){

    if(this.value==="time"){

        timeBox.style.display="block";
        tickBox.style.display="none";

    }else{

        timeBox.style.display="none";
        tickBox.style.display="block";

    }

});

contractType.addEventListener("change", updateContractUI);

function updateContractUI(){

    barrierBox.style.display="none";
    digitBox.style.display="none";

    switch(contractType.value){

        case "risefall":

            buyUp.innerHTML="🟢 BUY UP";
            buyDown.innerHTML="🔴 BUY DOWN";

        break;

        case "higherlower":

            barrierBox.style.display="block";

            buyUp.innerHTML="🟢 HIGHER";
            buyDown.innerHTML="🔴 LOWER";

        break;

        case "evenodd":

            buyUp.innerHTML="🟢 EVEN";
            buyDown.innerHTML="🔴 ODD";

        break;

        case "overunder":

            digitBox.style.display="block";

            buyUp.innerHTML="🟢 OVER";
            buyDown.innerHTML="🔴 UNDER";

        break;

        case "matchesdiffers":

            digitBox.style.display="block";

            buyUp.innerHTML="🟢 MATCHES";
            buyDown.innerHTML="🔴 DIFFERS";

        break;

    }

}

updateContractUI();
