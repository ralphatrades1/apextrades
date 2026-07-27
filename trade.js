const chartContainer = document.getElementById("chart");

const chart = LightweightCharts.createChart(chartContainer, {
    width: chartContainer.clientWidth,
    height: 350,
    layout: {
        background: { color: "#111827" },
        textColor: "#ffffff"
    },
    grid: {
        vertLines: { color: "#1f2937" },
        horzLines: { color: "#1f2937" }
    }
});

const lineSeries = chart.addSeries(LightweightCharts.LineSeries, {
    color: "#3b82f6",
    lineWidth: 2
});

let price = 100;
let data = [];

function updateChart() {
    price += (Math.random() - 0.5) * 2;

    data.push({
        time: Math.floor(Date.now() / 1000),
        value: Number(price.toFixed(3))
    });

    if (data.length > 100) {
        data.shift();
    }

    lineSeries.setData(data);

    document.getElementById("price").textContent = price.toFixed(3);
}

updateChart();
setInterval(updateChart, 1000);

window.addEventListener("resize", () => {
    chart.applyOptions({
        width: chartContainer.clientWidth
    });
});

document.querySelectorAll(".quick button").forEach(button => {
    button.onclick = () => {
        document.getElementById("stake").value =
            button.textContent.replace("£", "");
    };
});

document.querySelector(".buy-up").onclick = () => {
    alert("BUY UP (Demo)");
};

document.querySelector(".buy-down").onclick = () => {
    alert("BUY DOWN (Demo)");
};
