/*
   Filename: complexCode.js
   Content: This code demonstrates a complex implementation of a digital payment system using JavaScript.
*/

class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.balance = 0;
    this.transactions = [];
    this.rewards = {
      earnedPoints: 0,
      redeemedPoints: 0
    };
  }

  deposit(amount) {
    this.balance += amount;
    this.transactions.push({
      type: 'deposit',
      amount: amount
    });
  }

  withdraw(amount) {
    if (this.balance >= amount) {
      this.balance -= amount;
      this.transactions.push({
        type: 'withdrawal',
        amount: amount
      });
    } else {
      console.log("Insufficient funds!");
    }
  }

  transfer(amount, recipient) {
    if (this.balance >= amount) {
      recipient.deposit(amount);
      this.withdraw(amount);
      this.transactions.push({
        type: 'transfer',
        amount: amount,
        recipient: recipient
      });
    } else {
      console.log("Insufficient funds!");
    }
  }

  calculateRewards() {
    const pointsPerDollar = 10;
    const rewardsThreshold = 100;

    if (this.balance >= rewardsThreshold) {
      const earnedPoints = Math.floor(this.balance / rewardsThreshold) * pointsPerDollar;
      this.rewards.earnedPoints += earnedPoints;
      this.balance %= rewardsThreshold;
      this.transactions.push({
        type: 'rewards',
        earnedPoints: earnedPoints
      });
    }
  }

  redeemRewards(pointsToRedeem) {
    if (this.rewards.earnedPoints >= pointsToRedeem) {
      this.rewards.earnedPoints -= pointsToRedeem;
      this.rewards.redeemedPoints += pointsToRedeem;
      const redeemedAmount = Math.floor(pointsToRedeem / 10);
      this.balance += redeemedAmount;
      this.transactions.push({
        type: 'rewardRedemption',
        redeemedPoints: pointsToRedeem,
        redeemedAmount: redeemedAmount
      });
    } else {
      console.log("Not enough reward points!");
    }
  }
}

// Create users
const user1 = new User("John Doe", "john@example.com", "123456");
const user2 = new User("Jane Smith", "jane@example.com", "abcdef");

// Simulate transactions
user1.deposit(1000);
user1.transfer(500, user2);
user1.calculateRewards();
user2.redeemRewards(50);

console.log(user1);
console.log(user2);