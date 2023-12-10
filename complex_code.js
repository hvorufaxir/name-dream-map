/* complex_code.js */

// This code is a simulation of a banking system

// Class representing a bank account
class BankAccount {
  constructor(accountNumber, accountHolder) {
    this.accountNumber = accountNumber;
    this.accountHolder = accountHolder;
    this.balance = 0;
    this.transactions = [];
  }

  deposit(amount) {
    if (amount <= 0) {
      throw new Error("Deposit amount must be positive");
    }

    this.balance += amount;
    this.transactions.push({ type: "deposit", amount });
  }

  withdraw(amount) {
    if (amount <= 0) {
      throw new Error("Withdrawal amount must be positive");
    }

    if (amount > this.balance) {
      throw new Error("Insufficient funds");
    }

    this.balance -= amount;
    this.transactions.push({ type: "withdrawal", amount });
  }

  getTransactionHistory() {
    return this.transactions;
  }
}

// Function to generate a unique account number
function generateAccountNumber() {
  const prefix = "AC";
  const randomSuffix = Math.floor(Math.random() * 10000);
  return prefix + randomSuffix;
}

// Main program

// Create bank accounts
const account1 = new BankAccount(generateAccountNumber(), "John Doe");
const account2 = new BankAccount(generateAccountNumber(), "Jane Smith");

// Perform transactions
account1.deposit(5000);
account2.deposit(10000);
account1.withdraw(2000);
account2.withdraw(500);
account1.deposit(3000);
account2.deposit(1500);

// Show transaction history
console.log("Transaction history for account 1:");
console.log(account1.getTransactionHistory());

console.log("Transaction history for account 2:");
console.log(account2.getTransactionHistory());

// Output account balances
console.log("Account 1 balance:", account1.balance);
console.log("Account 2 balance:", account2.balance);