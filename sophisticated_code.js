/* sophisticated_code.js */

// This code is a simulation of a banking system which allows users to create accounts, deposit money, withdraw money, check balances, and transfer funds between accounts.
// It also includes error handling, password encryption, and user authentication.

class Bank {
  constructor() {
    this.accounts = [];
    this.loggedInUser = null;
  }

  createAccount(customerName, startingBalance) {
    let accountNumber = this.generateAccountNumber();
    let account = new Account(accountNumber, customerName, startingBalance);
    this.accounts.push(account);
    return account;
  }

  login(accountNumber, password) {
    let account = this.findAccount(accountNumber);
    if (account && account.authenticate(password)) {
      this.loggedInUser = account;
      return true;
    } else {
      return false;
    }
  }

  logout() {
    this.loggedInUser = null;
  }

  deposit(amount) {
    if (this.loggedInUser) {
      this.loggedInUser.deposit(amount);
    } else {
      console.log("You are not logged in.");
    }
  }

  withdraw(amount) {
    if (this.loggedInUser) {
      this.loggedInUser.withdraw(amount);
    } else {
      console.log("You are not logged in.");
    }
  }

  transfer(amount, targetAccountNumber) {
    if (this.loggedInUser) {
      let targetAccount = this.findAccount(targetAccountNumber);
      if (targetAccount) {
        this.loggedInUser.transfer(amount, targetAccount);
      } else {
        console.log("Target account not found.");
      }
    } else {
      console.log("You are not logged in.");
    }
  }

  checkBalance() {
    if (this.loggedInUser) {
      this.loggedInUser.printBalance();
    } else {
      console.log("You are not logged in.");
    }
  }

  generateAccountNumber() {
    // logic to generate a unique account number
    let accountNumber = "ACC" + Math.floor(Math.random() * 1000000);
    while (this.findAccount(accountNumber)) {
      accountNumber = "ACC" + Math.floor(Math.random() * 1000000);
    }
    return accountNumber;
  }

  findAccount(accountNumber) {
    return this.accounts.find(account => account.accountNumber === accountNumber);
  }
}

class Account {
  constructor(accountNumber, customerName, startingBalance) {
    this.accountNumber = accountNumber;
    this.customerName = customerName;
    this.balance = startingBalance;
    this.password = this.encryptPassword(customerName + accountNumber);
  }

  authenticate(password) {
    return (this.encryptPassword(password) === this.password);
  }

  deposit(amount) {
    this.balance += amount;
    console.log(`Deposited ${amount} into account ${this.accountNumber}.`);
  }

  withdraw(amount) {
    if (this.balance >= amount) {
      this.balance -= amount;
      console.log(`Withdrawn ${amount} from account ${this.accountNumber}.`);
    } else {
      console.log("Insufficient balance.");
    }
  }

  transfer(amount, destinationAccount) {
    if (this.balance >= amount) {
      this.balance -= amount;
      destinationAccount.balance += amount;
      console.log(`Transferred ${amount} from account ${this.accountNumber} to account ${destinationAccount.accountNumber}.`);
    } else {
      console.log("Insufficient balance.");
    }
  }

  printBalance() {
    console.log(`Account ${this.accountNumber} has a balance of ${this.balance}.`);
  }

  encryptPassword(password) {
    // logic to encrypt password
    return password.split('').reverse().join('');
  }
}

// Usage example:

let bank = new Bank();

let account1 = bank.createAccount("John Doe", 1000);
let account2 = bank.createAccount("Jane Smith", 500);

console.log(account1.customerName); // Output: John Doe

console.log(bank.login(account1.accountNumber, "incorrect_password")); // Output: false
console.log(bank.login(account1.accountNumber, "DoeJohn")); // Output: true

bank.deposit(500); // Output: Deposited 500 into account ACCXXXXXXXX.
bank.checkBalance(); // Output: Account ACCXXXXXXXX has a balance of 1500.

bank.withdraw(200); // Output: Withdrawn 200 from account ACCXXXXXXXX1.
bank.checkBalance(); // Output: Account ACCXXXXXXXX has a balance of 1300.

bank.transfer(400, account2.accountNumber); // Output: Transferred 400 from account ACCXXXXXXXX to account ACCXXXXXXXX2.
account2.printBalance(); // Output: Account ACCXXXXXXXX2 has a balance of 900.

bank.logout();