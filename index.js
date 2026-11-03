import { menuArray } from '/data.js'

const part1 = document.getElementById("part-1")

const preCheckout = document.getElementById('pre-checkout')
const orders = document.getElementById('orders')
const orderTotal = document.getElementById('order-total')
const total = document.getElementById('total')
const emptyCart = document.getElementById('empty-cart')

const ourMenu = menuArray.map(function(item){
                    const {name, ingredients, id, price, emoji} = item

                    return `
                        <section class ='sect' id = 'sect${id + 1}'>
                            <div class = 'item' id='item${id + 1}'>
                                <div class='menu-el'>
                                    <div class = 'emoji'><p>${emoji}</p></div>
                                    <div class = 'main-item'>
                                        <h4 class='item-title'>${name}</h4>
                                        <p class='item-desc'>${ingredients.join(', ')}</p>
                                        <p class='item-price'>$${price}</p>
                                    </div>
                                </div>
                                <button id = 'btn-${id + 1}'><i class="fa-solid fa-plus"></i></button>
                            </div>
                            <div class='separator'></div>
                        </section>
                    ` 

                })



part1.innerHTML += ourMenu.join('')

const itemDisplay = menuArray.map(function(element){
    const {id, name, price} = element
    return `
            <div id = 'order${id + 1}' class="orders">
                <div class = 'added'>
                    <h4 id = 'item-display${id + 1}'>${name}</h4>
                    <button id = 'remove${id + 1}' class= "remove">remove</button>
                </div>
                <p id = 'item-tot-price${id + 1}' class="unit-price">$${price}</p>
            </div>
            `
})

const btn1 = document.getElementById('btn-1')
const btn2 = document.getElementById('btn-2')
const btn3 = document.getElementById('btn-3')

const remove1 = document.getElementById('remove1')
const remove2 = document.getElementById('remove2')
const remove3 = document.getElementById('remove3')

const totPrice1 = document.getElementById('item-tot-price1')
const totPrice2 = document.getElementById('item-tot-price2')
const totPrice3 = document.getElementById('item-tot-price3')

const order1 = document.getElementById('order1')
const order2 = document.getElementById('order2')
const order3 = document.getElementById('order3')

let pizzaOrder = []
let humOrder = []
let beerOrder = []
let totalPrice = 0


/* ************************ All the functions ************************ */

function addBtnsFirst(menuArrayIndex, 
                orderArrCount, 
                totPriceDisplay)
    {
        emptyCart.textContent = ''
        preCheckout.style.display = 'block'

        orderArrCount.push(menuArray[menuArrayIndex].price)
        totalPrice += orderArrCount[0]
        
        orders.innerHTML += itemDisplay[menuArrayIndex]
        totPriceDisplay.textContent = `$${totalPrice}`
}

function addBtnsSecond(menuArrayIndex, 
                orderArrCount, 
                orderPriceDisplay, priceId, 
                totPriceDisplay, totalPriceId){
    
    orderPriceDisplay = document.getElementById(priceId) 
    totPriceDisplay = document.getElementById(totalPriceId)

    orderArrCount.push(menuArray[menuArrayIndex].price)  
    totalPrice += menuArray[menuArrayIndex].price

    orderPriceDisplay.textContent = `$${arrTotItem(orderArrCount)}`
    totPriceDisplay.textContent = `$${totalPrice}`

}

function removeBtns(itemId, elId, totPriceDisplay, totalPriceId, orderArrCount){
    itemId = document.getElementById(elId)
    totPriceDisplay = document.getElementById(totalPriceId)

    itemId.style.display = 'none'
    /* orders.textContent -= itemId */
    totalPrice -= arrTotItem(orderArrCount)

    orderArrCount.length = 0 // empty the array
    totPriceDisplay.textContent = `$${totalPrice}`
    if (totalPrice === 0){
        preCheckout.style.display = 'none'
        emptyCart.innerHTML = `<p>You just emptied your cart!</p>`
    }
}

function arrTotItem(arr){
    return arr.reduce(function(x, y){
            return x + y
    })
}



/* **************** EXECUTIONS ************************ */

btn1.addEventListener('click', function(){
    if (pizzaOrder.length === 0){
        addBtnsFirst(0, pizzaOrder, orderTotal)
    } else {
        addBtnsSecond(0, pizzaOrder, totPrice1, 'item-tot-price1',  orderTotal, 'order-total')
    }
    
})

btn2.addEventListener('click', function(){
    if (humOrder.length === 0){
        addBtnsFirst(1, humOrder, orderTotal)
    } else {
        addBtnsSecond(1, humOrder, totPrice2, 'item-tot-price2', orderTotal,'order-total')
    }
})

btn3.addEventListener('click', function(){
    if (beerOrder.length === 0){
        addBtnsFirst(2, beerOrder, orderTotal)
    } else {
        addBtnsSecond(2, beerOrder, totPrice3, 'item-tot-price3', orderTotal, 'order-total')
    }
})

// Check remove1 (already implemented, but shown for context)
if (remove1) {
    remove1.addEventListener('click', function() {
        removeBtns(order1, 'order1', orderTotal, 'order-total', pizzaOrder);
    });
}

// Add checks for remove2 and remove3 to prevent the TypeError
if (remove2) {
    remove2.addEventListener('click', function() {
        removeBtns(order2, 'order2', orderTotal, 'order-tota2', humOrder);
    });
}

if (remove3) {
    remove3.addEventListener('click', function() {
        removeBtns(order3, 'order3', orderTotal, 'order-tota3', beerOrder);
    });
}


/* if (!remove1){
    console.log('That item has not been created')
} else {
    remove1.addEventListener('click', function(){
        removeBtns(order1, 'order1', orderTotal, 'order-total', pizzaOrder)

    })

}


remove2.addEventListener('click', function(){
    removeBtns(order2, 'order2', orderTotal, 'order-tota2', humOrder)

})

remove3.addEventListener('click', function(){
    removeBtns(order3, 'order3', orderTotal, 'order-tota3', beerOrder)

}) */


/*

`
<form for = 'submit'>
    <h4>Enter card details</h4>
    <input type = 'text' id = 'name' name = 'name' placeholder = 'Enter your name'/>
    <input type = 'number' id = 'card-num' name = 'card-num' placeholder = 'Enter card number'/>
    <input type = 'number' id = 'cvv' name = 'cvv' placeholder = 'Enter CVV'/>
    <button type = 'submit' id = 'submit'>Pay</button>
</form> 
`

*/