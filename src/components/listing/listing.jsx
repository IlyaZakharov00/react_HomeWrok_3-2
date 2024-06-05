import React from 'react'
import styles from "./listing.module.css"

export const Listing = (proops) => {
const {items} = proops
let titles = {}

const getPrice = (price, currency_code)=>{
  let symbol;

  switch (currency_code) {
    case "USD":
      symbol = "$"
      break;
    case "EUR":
      symbol = '€'
      break;
    case "GBP":
      symbol = currency_code
      return `${price} ${symbol}`
  }
  return symbol + price
}

const getLevel = (quantity)=>{
  let class_;
  
  if(quantity <= 10) {
    class_ = "level-low" 
  } else if(quantity > 10 && quantity <= 20){
    class_ = "level-medium" 
  } else  class_ = "level-high" 

  return class_
}

const showFullTitle = (e, id)=>{
  let fullTitle = titles[id]
  e.currentTarget.textContent = fullTitle
}

const smallTitle = (title, id)=>{
  titles[id] = title;
  
  if(title.length > 50){
    let fiftySymbols = [];

    for (let i = 0; i < 50; i++) {
      fiftySymbols.push(title[i])
    }

    let threeDot = <span className={styles['threeDot']} onClick={(e)=>{showFullTitle(e, id)}}>...</span>
    return (<>{fiftySymbols.join('')} {threeDot}</>)  
  } 
  return title
}


return (
  <div className={styles["item-list"]}>

    {items.map((item) => {
      
      if(!item.title) return null;
      
      const {title, price, quantity, currency_code, listing_id} = item

      return(      
      <div className={styles["item"]} key={Math.random()}>
        <div className={styles["item-image"]}>
          <a href="https://www.etsy.com/listing/292754135/woodland-fairy">
            <img src={item.MainImage.url_570xN} alt='product photo'></img>
          </a>
        </div>
        <div className={styles["item-details"]}>
          <p className={styles["item-title"]}>{smallTitle(title, listing_id)}</p>
          <p className={styles["item-price"]}>{getPrice(price, currency_code)}</p>
          <p className={[styles["item-quantity"], styles[getLevel(quantity)]].join(" ")}>{quantity} left</p>
        </div>
      </div>)
    })}
  </div>  
  )
}
