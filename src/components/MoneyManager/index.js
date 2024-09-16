import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    transactionList: [],
    title: '',
    amount: '',
    type: transactionTypeOptions[0]?.optionId || '',
    totalBalance: 0,
    totalIncome: 0,
    totalExpenses: 0,
  }

  addTransaction = event => {
    event.preventDefault()
    const {title, amount, type} = this.state

    if (title && amount && type) {
      const newTransaction = {
        id: uuidv4(),
        title,
        amount: parseFloat(amount),
        type,
      }

      this.setState(
        prevState => ({
          transactionList: [...prevState.transactionList, newTransaction],
          title: '',
          amount: '',
          type: transactionTypeOptions[0]?.optionId || '',
        }),
        this.calculateTotals,
      )
    }
  }

  calculateTotals = () => {
    const {transactionList} = this.state
    const income = transactionList
      .filter(eachItem => eachItem.type === 'INCOME')
      .reduce((acc, crr) => acc + crr.amount, 0)
    const expenses = transactionList
      .filter(eachItem => eachItem.type === 'EXPENSES')
      .reduce((acc, crr) => acc + crr.amount, 0)
    const balance = income - expenses

    this.setState({
      totalIncome: income,
      totalExpenses: expenses,
      totalBalance: balance,
    })
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amount: event.target.value})
  }

  onChangeType = event => {
    this.setState({type: event.target.value})
  }

  deleteTransaction = id => {
    this.setState(
      prevState => ({
        transactionList: prevState.transactionList.filter(
          transaction => transaction.id !== id,
        ),
      }),
      this.calculateTotals,
    )
  }

  render() {
    const {
      title,
      amount,
      type,
      transactionList,
      totalIncome,
      totalBalance,
      totalExpenses,
    } = this.state

    return (
      <div className="bg-container">
        <div className="header-container">
          <h1 className="header">Hi, Rechard</h1>
          <p className="header-description">
            Welcome back to your{' '}
            <span className="money-manager">Money Manager</span>
          </p>
        </div>
        <MoneyDetails
          transactionTypeOptions={transactionTypeOptions}
          totalIncome={totalIncome}
          totalBalance={totalBalance}
          totalExpenses={totalExpenses}
        />
        <div className="calculation-container">
          <form className="form-container" onSubmit={this.addTransaction}>
            <h1 className="form-heading">Add Transaction</h1>
            <label htmlFor="title-input" className="label-element">
              TITLE
            </label>
            <input
              id="title-input"
              className="input-element"
              type="text"
              value={title}
              placeholder="TITLE"
              onChange={this.onChangeTitle}
            />
            <label htmlFor="amount-input" className="label-element">
              AMOUNT
            </label>
            <input
              id="amount-input"
              className="input-element"
              type="text"
              value={amount}
              placeholder="AMOUNT"
              onChange={this.onChangeAmount}
            />
            <label htmlFor="type-input" className="label-element">
              TYPE
            </label>
            <select
              id="type-input"
              className="input-element"
              value={type}
              onChange={this.onChangeType}
            >
              {transactionTypeOptions.map(eachType => (
                <option
                  key={eachType.optionId}
                  value={eachType.optionId} // Ensure value matches state
                >
                  {eachType.displayText}
                </option>
              ))}
            </select>
            <button className="add-btn" type="submit">
              Add
            </button>
          </form>
          <ul className="history-container">
            <h1 className="history-heading">History</h1>
            <li className="table-container">
              <p className="table-heads">Title</p>
              <p className="table-heads">Amount</p>
              <p className="table-heads">Type</p>
              <p className="table-heads">Delete</p>
            </li>
            {transactionList.length === 0 ? (
              <li className="no-transactions">No transactions found</li>
            ) : (
              transactionList.map(eachItem => (
                <TransactionItem
                  key={eachItem.id}
                  id={eachItem.id}
                  type={eachItem.type}
                  title={eachItem.title}
                  amount={eachItem.amount}
                  deleteTransaction={this.deleteTransaction}
                />
              ))
            )}
          </ul>
        </div>
      </div>
    )
  }
}

export default MoneyManager
