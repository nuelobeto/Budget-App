//Grabbing variables
const balance = document.getElementById('bal');
const income = document.getElementById('inc');
const expense = document.getElementById('exp');
const list = document.getElementById('transactions');
const textInput = document.getElementById('text-input');
const amountInput = document.getElementById('amount-input');

//local storage
const localStorageData = JSON.parse(
  localStorage.getItem('TRANSACTIONS')
  );
let transactions = localStorage.getItem('TRANSACTIONS') !== null ? localStorageData : [];

//function to add transactions
function addTransaction() {
  if(textInput.value.trim() === '' || amountInput.value.trim() === ''){
    alert('please enter a transaction');
  }else{
    const transaction = {
      name: textInput.value,
      amount: +amountInput.value,
      id: transactions.length,
    }
    transactions.push(transaction);
    
    createTransaction(transaction);
    
    updateValues();
    
    textInput.value = '';
    amountInput.value = '';
    
    localStorage.setItem('TRANSACTIONS', JSON.stringify(transactions));
  }
}

//function to create transactions
function createTransaction(transaction) {
    
    const li = document.createElement('li');
      li.className = 'item';
      
    li.innerHTML = `<p class="text">${transaction.name}</p>
        <p class="amount">${transaction.amount}</p>
        <span class="delete" onclick="remove(${transaction.id})">×</span>`;
        
    if(transaction.amount > 0){
      li.style.borderRight = '5px solid green';
    }else{
      li.style.borderRight = '5px solid darkred';
    }
    
    list.appendChild(li);
    localStorage.setItem('TRANSACTIONS', JSON.stringify(transactions));
    
  }
  
// Update the balance, income and expense
function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const INCOME = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const EXPENSE = (
    amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  balance.innerText = `$${total}`;
  income.innerText = `$${INCOME}`;
  expense.innerText = `$${EXPENSE}`;
}
  
//function to delete transactions
function remove(id) {
   transactions = transactions.filter(transaction => transaction.id !== id);
   localStorage.setItem('TRANSACTIONS', JSON.stringify(transactions));
   location.reload();
 }
 
 //function to load the transactions to the ui
  function loadTransactions() {
    transactions.forEach(createTransaction);
    updateValues();
  }
  loadTransactions();
  
  
  