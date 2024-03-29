// as if now there is not any persistent storage media to stor data so it will lose data after each run.
// sample data
let transactions = [
  { id: 1, customerId: 1, credit: 200, date: "2024-01-01", debit: 0 },
  { id: 2, customerId: 2, credit: 1200, date: "2023-01-06", debit: 0 },
  { id: 3, customerId: 3, credit: 2200, date: "2024-01-02", debit: 0 },
  { id: 4, customerId: 3, credit: 2400, date: "2024-01-09", debit: 0 },
  { id: 5, customerId: 1, credit: 3000, date: "2024-01-12", debit: 500 },
  { id: 6, customerId: 4, credit: 3000, date: "2024-01-11", debit: 0 },
];
let balances = [
  {
    id: 1,
    customerId: 1,
    name: "Sogand",
    balance: 2700,
  },
  { id: 2, customerId: 2, name: "Fati", balance: 1200 },
  { id: 3, customerId: 3, name: "Hassan", balance: 2200 },
  { id: 6, customerId: 4, name: "Sara", balance: 3000 },
];
//updates the latest balance
function refresh() {
  document.getElementById("balanceList").innerHTML = "";
  for (let index = 0; index < balances.length; index++) {
    document.getElementById(
      "balanceList",
    ).innerHTML += `<tr><td>${balances[index].name}</td><td>${balances[index].balance}</td><td><input type='button' class='btn btn-warning' value='Transactions' onClick="customerTransactions(${balances[index].customerId})" /></td></tr>`;
  }
}
// any given customers transactions
//In JavaScript, can use the spread operator to expand an iterable inside a specified receiver, as its name suggests.
//This recipient could be anything, such as an object, an array, and so on. And the iterable can be anything we can loop through, including a string, an array, an object, and so on.

function customerTransactions(customerId) {
  let filteredTrans = [...transactions].filter(filterTrans(customerId));
  console.log(transactions.length);
  let tableStr = `<table class='table table-striped'><thead><tr style="font-size:small"><th>Transaction Id</th><th>Customer Id</th><th>Credit</th><th>Debit</th><th>Date</th><th><a onClick='document.getElementById(
    "transactions").innerHTML = ""' href='#' style="color:red">X</a></th></tr></thead><tbody>`;
  let innerHTML = "";

  for (let index = 0; index < filteredTrans.length; index++) {
    let trans = filteredTrans[index];
    innerHTML += `<tr><td>${trans.id}</td><td>${trans.customerId}</td><td>${trans.credit}</td><td>${trans.debit}</td><td>${trans.date}</td></tr>`;
  }
  document.getElementById("transactions").innerHTML =
    tableStr + innerHTML + "</tbody></table>";
}
// filter transaction by costumer ID
function filterTrans(customerId) {
  return (trans) => trans.customerId === customerId;
}
// add transaction
function addTransaction() {
  let customerId = balances.length + 1;
  if (
    balances.filter(
      (balance) =>
        balance.name.toLocaleLowerCase() ===
        document.getElementById("customerName").value.toLocaleLowerCase(),
    ).length > 0
  )
    customerId = balances.filter(
      (balance) =>
        balance.name.toLocaleLowerCase() ===
        document.getElementById("customerName").value.toLocaleLowerCase(),
    )[0].customerId;
  let trans = {
    id: transactions.length + 1,
    customerId: customerId,
    credit: document.getElementById("credit").value,
    debit: document.getElementById("debit").value,
    date: new Date().toISOString(),
  };
  transactions.push(trans);
  if (customerId === balances.length + 1) {
    //New customer
    balances.push({
      name: document.getElementById("customerName").value,
      customerId: customerId,
      id: balances.length + 1,
      balance:
        document.getElementById("credit").value -
        document.getElementById("debit").value,
      id: balances.length + 1,
    });
  } else {
    balances.filter(filterTrans(customerId))[0].balance +=
      document.getElementById("credit").value -
      document.getElementById("debit").value;
  }

  document.getElementById("customerName").value = "";
  document.getElementById("credit").value = 0;
  document.getElementById("debit").value = 0;
  refresh();
}
