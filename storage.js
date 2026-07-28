// ApexTrades Storage System

const DEFAULT_BALANCE = 1000;

function initStorage() {

    if (localStorage.getItem("balance") === null) {
        localStorage.setItem("balance", DEFAULT_BALANCE);
    }

    if (localStorage.getItem("deposits") === null) {
        localStorage.setItem("deposits", JSON.stringify([]));
    }

    if (localStorage.getItem("withdrawals") === null) {
        localStorage.setItem("withdrawals", JSON.stringify([]));
    }

    if (localStorage.getItem("trades") === null) {
        localStorage.setItem("trades", JSON.stringify([]));
    }

}

function getBalance() {
    return Number(localStorage.getItem("balance"));
}

function setBalance(amount) {
    localStorage.setItem("balance", amount);
}

function addDeposit(amount) {

    const deposits = JSON.parse(localStorage.getItem("deposits"));

    deposits.push({
        amount: Number(amount),
        date: new Date().toLocaleString(),
        status: "Completed"
    });

    localStorage.setItem("deposits", JSON.stringify(deposits));

    setBalance(getBalance() + Number(amount));

}

function addWithdrawal(amount) {

    const withdrawals = JSON.parse(localStorage.getItem("withdrawals"));

    withdrawals.push({
        amount: Number(amount),
        date: new Date().toLocaleString(),
        status: "Completed"
    });

    localStorage.setItem("withdrawals", JSON.stringify(withdrawals));

    setBalance(getBalance() - Number(amount));

}

initStorage();
