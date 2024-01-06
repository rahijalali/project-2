let transactions = [
  { id: 1, customerId: 1, credit: 200, date: "2022-01-01", debit: 0 },
  { id: 2, customerId: 2, credit: 1200, date: "2022-01-01", debit: 0 },
  { id: 3, customerId: 3, credit: 2200, date: "2022-01-01", debit: 0 },
  { id: 4, customerId: 3, credit: 2400, date: "2022-01-01", debit: 0 },
];
let balances = [
  {
    id: 1,
    customerId: 1,
    name: "Sogand",
    balance: 200,
  },
  { id: 2, customerId: 2, name: "Fati", balance: 1200 },
  { id: 3, customerId: 3, name: "Hassan", balance: 2200 },
];
function refresh() {
  document.getElementById("balanceList").innerHTML = "";
  for (let index = 0; index < balances.length; index++) {
    document.getElementById(
      "balanceList",
    ).innerHTML += `<tr><td>${balances[index].name}</td><td>${balances[index].balance}</td><td><input type='button' class='btn btn-warning' value='Transactions' onClick="customerTransactions(${balances[index].customerId})" /></td></tr>`;
  }
}

function customerTransactions(customerId) {
  let filteredTrans = [...transactions].filter(filterTrans(customerId));
  console.log(transactions.length);
  let tableStr = `<table class='table table-striped'><thead><tr><th>TransactionId</th><th>CustomerId</th><th>Credit</th><th>Debit</th><th>Date</th><th><a onClick='document.getElementById(
    "transactions").innerHTML = ""' href='#' style="color:red">X</a></th></tr></thead><tbody>`;
  let innerHTML = "";

  for (let index = 0; index < filteredTrans.length; index++) {
    let trans = filteredTrans[index];
    innerHTML += `<tr><td>${trans.id}</td><td>${trans.customerId}</td><td>${trans.credit}</td><td>${trans.debit}</td><td>${trans.date}</td></tr>`;
  }
  document.getElementById("transactions").innerHTML =
    tableStr + innerHTML + "</tbody></table>";
}
function filterTrans(customerId) {
  return (trans) => trans.customerId === customerId;
}

function addTransaction() {
  let customerId = balances.length + 1;
  if (
    balances.filter(
      (balance) =>
        balance.name === document.getElementById("customerName").value,
    ).length > 0
  )
    customerId = balances.filter(
      (balance) =>
        balance.name === document.getElementById("customerName").value,
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