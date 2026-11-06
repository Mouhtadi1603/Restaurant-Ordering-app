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

function addBtns(
                menuArrayIndex, 
                orderArrCount, 
                orderPriceDisplay, priceId, 
                totPriceDisplay, totalPriceId)
    {
    if (orderArrCount.length === 0) {

        emptyCart.style.display = 'none'
        preCheckout.style.display = 'block'
        orderArrCount.push(menuArray[menuArrayIndex].price)
        totalPrice += orderArrCount[0]

        orders.innerHTML += itemDisplay[menuArrayIndex]
        totPriceDisplay.textContent = `$${totalPrice}`

    } else {

        orderPriceDisplay = document.getElementById(priceId) 
        totPriceDisplay = document.getElementById(totalPriceId)

        orderArrCount.push(menuArray[menuArrayIndex].price)  
        totalPrice += menuArray[menuArrayIndex].price

        orderPriceDisplay.textContent = `$${arrTotItem(orderArrCount)}`
        totPriceDisplay.textContent = `$${totalPrice}`

    }
}

function removeBtns(itemId, elId, totPriceDisplay, totalPriceId, orderArrCount){
    itemId = document.getElementById(elId)
    totPriceDisplay = document.getElementById(totalPriceId)

    itemId.remove()
    totalPrice -= arrTotItem(orderArrCount)

    orderArrCount.length = 0 // empty the array
    totPriceDisplay.textContent = `$${totalPrice}`
    if (totalPrice === 0){
        preCheckout.style.display = 'none'
        emptyCart.style.display = 'block'
        emptyCart.innerHTML = `<p>You just emptied your cart!</p>`
    }
}

function arrTotItem(arr){
    return arr.reduce(function(x, y){
            return x + y
    }, 0)
}



/* **************** EXECUTIONS ************************ */

btn1.addEventListener('click', function(){
    addBtns(0, 
            pizzaOrder, 
            totPrice1, 
            'item-tot-price1', 
            orderTotal,
            'order-total')  
})

btn2.addEventListener('click', function(){
    addBtns(1, 
            humOrder, 
            totPrice2, 
            'item-tot-price2', 
            orderTotal,
            'order-total')
    }
)

btn3.addEventListener('click', function(){{
    addBtns(2, 
            beerOrder, 
            totPrice3, 
            'item-tot-price3', 
            orderTotal, 
            'order-total')
    }
})



orders.addEventListener('click', function(e) {
    
    if (e.target.id === 'remove1'){
        removeBtns(order1, 
                'order1', 
                orderTotal, 
                'order-total', 
                pizzaOrder) 
        
    }
    else if (e.target.id === 'remove2'){
        removeBtns(order2, 
                'order2', 
                orderTotal, 
                'order-total', 
                humOrder) 
        
    } 
    else if (e.target.id === 'remove3'){
        removeBtns(order3, 
                'order3', 
                orderTotal, 
                'order-total', 
                beerOrder) 
        
    }
    else {
        console.warn("Element not found in the DOM.")

    }

})


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