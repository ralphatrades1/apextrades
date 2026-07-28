// ApexTrades Trading Engine - Part 1

document.addEventListener("DOMContentLoaded", () => {

    initStorage();

    loadBalance();

    quickStakeButtons();

    marketSelector();

    createChart();

});

function loadBalance(){

    const balance=document.getElementById("balance");

    if(balance){

        balance.innerHTML="$"+getBalance().toFixed(2);

    }

}

function quickStakeButtons(){

    const stake=document.getElementById("stake");

    document.querySelectorAll(".quick-stakes button").forEach(btn=>{

        btn.onclick=()=>{

            stake.value=btn.innerText.replace("$","");

        };

    });

}

function marketSelector(){

    const market=document.getElementById("market");

    const title=document.getElementById("selectedMarket");

    market.onchange=function(){

        title.innerHTML=this.value;

    };

}

let chart;
let candleSeries;

function createChart(){

    const container=document.getElementById("chart");

    chart=LightweightCharts.createChart(container,{

        width:container.clientWidth,

        height:container.clientHeight,

        layout:{
            background:{color:"#0d1117"},
            textColor:"#ffffff"
        },

        grid:{
            vertLines:{color:"#20252d"},
            horzLines:{color:"#20252d"}
        },

        rightPriceScale:{
            borderColor:"#333"
        },

        timeScale:{
            borderColor:"#333"
        }

    });

    candleSeries=chart.addCandlestickSeries();

    generateCandles();

    window.addEventListener("resize",()=>{

        chart.applyOptions({

            width:container.clientWidth,

            height:container.clientHeight

        });

    });

}

function generateCandles(){

    let data=[];

    let price=100;

    let time=Math.floor(Date.now()/1000)-100;

    for(let i=0;i<100;i++){

        let open=price;

        let close=open+(Math.random()-0.5)*3;

        let high=Math.max(open,close)+Math.random()*1.5;

        let low=Math.min(open,close)-Math.random()*1.5;

        data.push({

            time:time+i,

            open:open,

            high:high,

            low:low,

            close:close

        });

        price=close;

    }

    candleSeries.setData(data);

    setInterval(()=>{

        const last=data[data.length-1];

        const open=last.close;

        const close=open+(Math.random()-0.5)*3;

        const high=Math.max(open,close)+Math.random()*1.5;

        const low=Math.min(open,close)-Math.random()*1.5;

        data.push({

            time:last.time+1,

            open:open,

            high:high,

            low:low,

            close:close

        });

        if(data.length>120){

            data.shift();

        }

        candleSeries.setData(data);

    },1000);

}
