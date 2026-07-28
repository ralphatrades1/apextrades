// ApexTrades Wallet

document.addEventListener("DOMContentLoaded", () => {

    const balance = getBalance();

    const balanceElements = document.querySelectorAll(".wallet-balance");

    balanceElements.forEach(element => {
        element.textContent = "$" + balance.toFixed(2);
    });

});
