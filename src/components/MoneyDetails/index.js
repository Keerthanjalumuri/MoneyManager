import {Component} from 'react'

import './index.css'

class MoneyDetails extends Component {
  render() {
    const {totalIncome, totalBalance, totalExpenses} = this.props
    return (
      <ul className="money-container">
        <div className="balance-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
            alt="balance"
            className="money-img"
          />
          <div>
            <p className="money-text">Your Balance</p>
            <p className="amount" data-testid="balanceAmount">
              RS {totalBalance}
            </p>
          </div>
        </div>
        <div className="income-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
            alt="income"
            className="money-img"
          />
          <div>
            <p className="money-text">Your Income</p>
            <p className="amount" data-testid="incomeAmount">
              RS {totalIncome}
            </p>
          </div>
        </div>
        <div className="expenses-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
            alt="expenses"
            className="money-img"
          />
          <div>
            <p className="money-text">Your Expenses</p>
            <p className="amount" data-testid="expensesAmount">
              RS {totalExpenses}
            </p>
          </div>
        </div>
      </ul>
    )
  }
}

export default MoneyDetails
