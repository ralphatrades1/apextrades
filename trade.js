alert("trade.js loaded");

const chart = LightweightCharts.createChart(
    document.getElementById("chart"),
    {
        width: document.getElementById("chart").clientWidth,
        height: 380,
        layout: {
            background: { color: "#0f172a" },
            textColor: "#ffffff"
        },
        grid: {
            vertLines: { color: "#1f2937" },
            horzLines: { color: "#1f2937" }
        },
        rightPriceScale: {
            borderColor: "#374151"
        },
        timeScale: {
            borderColor: "#374151",
            timeVisible: true
        }
    }
);

const series = chart.addCandlestickSeries();

let currentPrice = 100;
let candles = [];

function updateChart() {

    const open = currentPrice;
    const close = open + (Math.random() - 0.5) * 2;
    const high = Math.max(open, close) + Math.random();
    const low = Math.min(open, close) - Math.random();

    currentPrice = close;

    candles.push({
        time: Math.floor(Date.now() / 1000),
        open,
        high,
        low,
        close
    });

    if (candles.length > 100) {
        candles.shift();
    }

    series.setData(candles);

    document.getElementById("price").textContent =
        currentPrice.toFixed(3);
}

updateChart();
setInterval(updateChart, 1000);

// ===== Resize Chart =====

window.addEventListener("resize", () => {
    chart.applyOptions({
        width: document.getElementById("chart").clientWidth
    });
});

// ===== Quick Stake Buttons =====

document.querySelectorAll(".quick button").forEach(btn => {

    btn.addEventListener("click", () => {

        const value = btn.textContent.replace("£", "");

        document.getElementById("stake").value = value;

    });

});

// ===== Demo Trade Buttons =====

document.querySelector(".buy-up").addEventListener("click", () => {

    alert("BUY UP order placed (demo)");

});

document.querySelector(".buy-down").addEventListener("click", () => {

    alert("BUY DOWN order placed (demo)");

});
