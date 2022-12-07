
import React, {useState} from "react";
import CurrencyFormat from 'react-currency-format';
import {getUrl} from "../helper/url-helper";

function Transaction({transact, user}){
  const [selectTransaction, setSelectTransaction] = useState(false)
  const [transaction, setTransaction] = useState(transact);

  const handleStatus = name => event => {

    async function handle(){
      try{
        let response = await fetch(`${getUrl("transaction")}/transactions/set-status`, {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Authorization": user.token,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({status: name, id: transaction.id})
        })

        let rs = await response.json();

        if (rs.success){
          setTransaction({...transaction, currentStatus: rs.currentStatus});
          setSelectTransaction(false);
        } else {
          console.log(rs)
        }
      } catch(err){
        console.log(err);
      }
    }

    handle();
  }
  
  return (
    <>
      <div className="register__section__forms__content__history__details__row" onClick={() => {
        selectTransaction ? setSelectTransaction(false) : setSelectTransaction(true);
        }}>
        <div className="register__section__forms__content__history__details__entry">
          {new Date(transaction.date).toLocaleDateString()}
        </div>
        <div className="register__section__forms__content__history__details__entry">
          {transaction.id}
        </div>
        <div className="register__section__forms__content__history__details__entry">
          {transaction.bitcoinAmount}
        </div>
        <div className="register__section__forms__content__history__details__entry">
          <CurrencyFormat value={transaction.paymentAmount * transaction.bitcoinAmount} displayType={'text'} thousandSeparator={true} prefix={transaction.symbol} renderText={value => <span>{value}</span>} />
        </div>
        <div className="register__section__forms__content__history__details__entry">
          {transaction.transactionType}
        </div>
        <div className="register__section__forms__content__history__details__entry">
          {transaction.currentStatus}
        </div>
      </div>

      {selectTransaction && user.role === "admin" ? (
        <div className="payments__entry__wrapper">
          <button
            onClick={handleStatus("Pending")}
            className="payments__entry"
          >
            Pending
          </button>
          <button
            onClick={handleStatus("In Progress")}
            className="payments__entry"
            style={{color: "blue"}}
          >
            In Progress
          </button>
          <button
            onClick={handleStatus("Completed")}
            className="payments__entry"
            style={{color: "green"}}
          >
            Completed
          </button>
        </div>
      ) : null}
    </>
  )
}

export default Transaction;
