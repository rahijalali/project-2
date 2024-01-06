let balances = [
  { name: "Sogand", balance: 200 },
  { name: "Fati", balance: 1200 },
  { name: "Hassan", balance: 2200 },
];
function refresh() {
  document.getElementById("balanceList").innerHTML = "";
  for (let index = 0; index < balances.length; index++) {
    document.getElementsByName(
      "balanceList",
    ).innerHTML += `<tr><td>${balances[index].name}</td><td>${balances[index].balance}</td></tr>`;
  }
}
function addBalance() {
  balances.push({
    name: document.getElementById("name").value,
    balance: document.getElementById("balance").value,
  });
  document.getElementById("name").value = "";
  document.getElementById("balance").value = 0;
  refresh();
}
