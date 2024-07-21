import React from 'react'
import Navbar from './navbar';
import Footerr from './footer';
import "./styles.css";
import CakeCategories from './category';
import ChocolateCakeSection from './chocolateCake';
import FruitCakeSection from './FruitCake';
import CoffeeWalnutBlueberryCakeSection from './CoffeeWalnut';
import ButterscotchCakeSection from './ButterScotch';
import RedVelvetCakeSection from './RedVelvet';
import VanillaCakeSection from './VanillaCake';
function Product({cart,addToCart}){
    return(
        <div className='bg-beige'>
            <Navbar cart={cart || []}/>
            <CakeCategories/>
            <ChocolateCakeSection addToCart={addToCart}/>
            <FruitCakeSection addToCart={addToCart}/>
            <CoffeeWalnutBlueberryCakeSection addToCart={addToCart}/>
            <ButterscotchCakeSection addToCart={addToCart}/>
            <RedVelvetCakeSection addToCart={addToCart}/>
            <VanillaCakeSection addToCart={addToCart}/>
            <Footerr/>
        </div>
    )
}

export default Product;