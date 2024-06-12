class Account {
    constructor(owner, balance = 0) {
        this.owner = owner;
        this.balance = balance;
    }

    deposit(amount) {
        this.balance += amount;
        this.logTransaction('Deposit', amount);
    }

    withdraw(amount) {
        if (amount <= this.balance) {
            this.balance -= amount;
            this.logTransaction('Withdraw', amount);
        } else {
            alert(`Insufficient funds for ${this.owner}`);
        }
    }

    transfer(amount, toAccount) {
        if (amount <= this.balance) {
            this.withdraw(amount);
            toAccount.deposit(amount);
            console.log(`${this.owner} transferred ${amount} to ${toAccount.owner}`);
        } else {
            alert(`Insufficient funds for transfer by ${this.owner}`);
        }
    }

    addInterest(rate) {
        const interest = this.balance * (rate / 100);
        this.deposit(interest);
        console.log(`${this.owner} received ${interest} as interest`);
    }

    logTransaction(type, amount) {
        console.log(`${this.owner}: ${type} of ${amount}. New balance: ${this.balance}`);
    }

    getDetails() {
        return `Owner: ${this.owner}\nBalance: ${this.balance.toFixed(2)}`;
    }
}

const account1 = new Account('Rajat', 100000);
const account2 = new Account('Jay', 50000);

function showDetails(account) {
    const detailsId = account === account1 ? 'account1-details' : 'account2-details';
    document.getElementById(detailsId).textContent = account.getDetails();
}

function deposit(account, inputId) {
    const amount = parseFloat(document.getElementById(inputId).value);
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount to deposit');
        return;
    }
    account.deposit(amount);
    showDetails(account);
}

function withdraw(account, inputId) {
    const amount = parseFloat(document.getElementById(inputId).value);
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount to withdraw');
        return;
    }
    account.withdraw(amount);
    showDetails(account);
}

function transfer(fromAccount, toAccount, inputId) {
    const amount = parseFloat(document.getElementById(inputId).value);
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount to transfer');
        return;
    }
    fromAccount.transfer(amount, toAccount);
    showDetails(fromAccount);
    showDetails(toAccount);
}

function addInterest(account, inputId) {
    const rate = parseFloat(document.getElementById(inputId).value);
    if (isNaN(rate) || rate <= 0) {
        alert('Please enter a valid interest rate');
        return;
    }
    account.addInterest(rate);
    showDetails(account);
}
