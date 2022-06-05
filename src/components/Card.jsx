import React from 'react'

 const Card = () => {
  return (
	<div className="card">
            <div className="favorite">
              <img
                src="/img/heart-off.svg"
                width={30}
                height={30}
                alt="Add to favorite"
              />
            </div>
            <img src="/img/Decks/1.jpg" width={133} height={133} alt="Baker1" />
            <h5>BAKER BRAND LOGO DECK</h5>
            <div className="d-flex justify-between align-center">
              <div className="d-flex flex-column">
                <span>Price:</span>
                <b>99 USD</b>
              </div>
              <button className="button">
                <img src="/img/plus.svg" alt="Добавить" />
              </button>
            </div>
          </div>
  )
}

export default Card