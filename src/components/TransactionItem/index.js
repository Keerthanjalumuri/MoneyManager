import {Component} from 'react'

import './index.css'

class TransactionItem extends Component {
  render() {
    const {id, title, amount, type, deleteTransaction} = this.props
    const onClickDeleteTransaction = () => {
      deleteTransaction(id)
    }
    return (
      <li className="tabel-container">
        <p className="table-items">{title}</p>
        <p className="table-items">{amount}</p>
        <p className="table-items">{type}</p>
        <button
          type="button"
          className="delete-btn"
          onClick={onClickDeleteTransaction}
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
            alt="delete"
            className="dlt-img"
          />
        </button>
      </li>
    )
  }
}

export default TransactionItem
