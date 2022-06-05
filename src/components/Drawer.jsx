import React from 'react'

const Drawer = () => {
  return (
	<div  className="overlay ">
	
	<div className="drawer d-flex flex-column">
	<h2 className="d-flex justify-between mb-20">
	  Cart
	  <img
		className="removeBtn cu-p"
		src="/img/btn-remove.svg"
		alt="Remove"
	  />
	</h2>
	<div className="items">
	  <div className="cartItem d-flex align-center justify-between mb-20 ">
		<img
		  className="20"
		  src="/img/Decks/1.jpg"
		  width={80}
		  height={80}
		  alt="Deck"
		/>
		<div className="mr-20">
		  <p className="mb-5">BAKER BRAND LOGO DECK</p>
		  <b>99 USD</b>
		</div>
		<img
		  className="removeBtn"
		  src="/img/btn-remove.svg"
		  alt="Remove"
		/>
	  </div>
	  <div className="cartItem d-flex align-center justify-between mb-20 mt-20">
		<img
		  className="20"
		  src="/img/Decks/1.jpg"
		  width={80}
		  height={80}
		  alt="Deck"
		/>
		<div className="mr-20">
		  <p className="mb-5">BAKER BRAND LOGO DECK</p>
		  <b>99 USD</b>
		</div>
		<img
		  className="removeBtn"
		  src="/img/btn-remove.svg"
		  alt="Remove"
		/>
	  </div>
	  <div className="cartItem d-flex align-center justify-between mb-20 mt-20">
		<img
		  className="20"
		  src="/img/Decks/1.jpg"
		  width={80}
		  height={80}
		  alt="Deck"
		/>
		<div className="mr-20">
		  <p className="mb-5">BAKER BRAND LOGO DECK</p>
		  <b>99 USD</b>
		</div>
		<img
		  className="removeBtn"
		  src="/img/btn-remove.svg"
		  alt="Remove"
		/>
	  </div>
	  <div className="cartItem d-flex align-center justify-between mb-20 mt-20">
		<img
		  className="20"
		  src="/img/Decks/1.jpg"
		  width={80}
		  height={80}
		  alt="Deck"
		/>
		<div className="mr-20">
		  <p className="mb-5">BAKER BRAND LOGO DECK</p>
		  <b>99 USD</b>
		</div>
		<img
		  className="removeBtn"
		  src="/img/btn-remove.svg"
		  alt="Remove"
		/>
	  </div>
	</div>
	<div>
	  <div className="cartTotalBlock">
		<ul>
		  <li>
			<span>Total:</span>
			<div></div>
			<b>198 USD</b>
		  </li>
		  <li>
			<span>Tax 13%:</span>
			<div></div>
			<b>25.74 USD</b>
		  </li>
		</ul>
		<button className="greenButton">
		  Order{" "}
		  <img
			src="/img/arrow-right.svg"
			width={13}
			height={13}
			alt="Order"
		  />
		</button>
	  </div>
	</div>
  </div>
  </div>
  )
}

export default Drawer 