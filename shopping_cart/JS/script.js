
// ======================= ORACLE ============================
let prices = []

// ====================== HOME JS CONNECTION=============================
let con = document.getElementById("data")
let cards = document.getElementsByClassName("card")
let counterConnectin = document.querySelector(".counter")
let showCart = document.getElementById("toggleCart")
let showCard = document.getElementById("cardItemShow")
let finalPrice = document.querySelector(".priceLeft")
let toggleBlur = 0

// ======================== COMMON JS CONNECTION=============================
let quantityCounter = document.getElementById("data")
let price = document.getElementById("price")
let hideCounter = document.querySelector(".counter")

// ======================== CART JS CONNECTION=============================

let cartPrice = document.getElementById("cartPrice")
let priceSymbol = "₹"

let card = document.getElementById("mainCard")
let disapear = document.getElementsByClassName("totalPrice")[0]
let cartInfo = document.getElementsByClassName("cartInfo")

let itemCard = document.getElementsByClassName("cartContainer")[0]

let insertCart = document.querySelector(".insertBeforeCart")
let setCartImg
let setCartHeading
let setCartPrice
let setCartQuantity
// <<<<<<<<<<<<<<<<<=====================>>>>>>>>>>>>>>>


// ======================== HOME JS=============================

function show(){

    showCart.classList.toggle("showHideCart")
    showCard.classList.toggle("hideShowCard")
    hideCounter.classList.toggle("hideCounter")
    
    countCard()
    

}

function counterIcrem(num){
    let temp = Number.parseInt(counterConnectin.textContent)
    let f = temp + Number.parseInt(num)
    counterConnectin.textContent = f
}



function homeIncreaseQuantity(){
    let activeNode = document.activeElement.nextElementSibling.textContent
    let activeNodeINCRX = document.activeElement.nextElementSibling
    let temp = (Number.parseInt(activeNode)) + 1
    activeNodeINCRX.textContent = temp

}

function homeDecreaseQuantity(){
    let activeNode = document.activeElement.previousElementSibling.textContent
    let activeNodeDECX = document.activeElement.previousElementSibling

    if (activeNode <= 0) {
        alert("CANNOT DECREASE ITEM QUANTITY")
    }
    else{
        let temp = (Number.parseInt(activeNode) - 1)
        activeNodeDECX.textContent = temp
    }
    
}

// ======================== COMMON JS=============================

function getItem(){
    let dataList = []
    let dataNode = document.activeElement.parentNode.parentNode.childNodes
    let checkAdd = dataNode[3].children[6].textContent
    if(checkAdd==0){
        alert("CANNOT ADD ZERO ITEM")
        return
    }
    for (let i = 0; i < dataNode.length; i++) {
       
        if (i==1 || i==3) {
            dataList.push(dataNode[i])
        }
    }
    // =========home js=======
    let imgSource = (dataList[0].src.slice(21,)).replace("%","")
    let imgHeading = dataList[1].children[0].textContent
    let imgPrice = dataList[1].children[2].textContent
    let imgQuantity = dataList[1].children.data.textContent
    let totPrice = Number.parseInt(imgPrice)*Number.parseInt(imgQuantity)
    prices.push(totPrice)
   
    // ========== home cart counter ============
    let countrerNum = document.activeElement.parentNode.parentNode.children[1].children[6].textContent
    counterIcrem(countrerNum)
    // ========= cart clone ===========
    createCart(imgSource,imgHeading,imgQuantity,imgPrice,totPrice)
    
    // ============= crat total calculate ===========
    calcCartTotal()
    
}


// ======================== CART JS========s=====================
function calcCartTotal(){
    let add = (a,b)=>{
        return a+b
    }
    let x = prices.reduce(add)
    let f = finalPrice
    f.textContent = priceSymbol+x
}

function displayTotalContainer(){
    let child = document.children.length
    console.log(child)
    if(Number.parseInt(child) == 1 ){
        disapear.style.display = "none";
        nothingIsThere()
    }

}

function cartIncreaseQuantity(){
    let activeNodeINCR = document.activeElement.parentElement.children[1].textContent
    let activeNodeINCRX = document.activeElement.parentElement.children[1]

    let actualPrice = document.activeElement.parentElement.parentElement.children[0].children[0].children[1].children[1].children[0].textContent.replace("₹","")
    let finalSubPrice = document.activeElement.parentElement.parentElement.children[2].textContent.replace("₹","")
    let finalSubPriceX = document.activeElement.parentElement.parentElement.children[2]
    let priceTemp = ((Number.parseInt(actualPrice))+(Number.parseInt(finalSubPrice)))+priceSymbol
    finalSubPriceX.textContent = priceTemp

    let temp = Number.parseInt(activeNodeINCR)
    temp+=1
    activeNodeINCRX.textContent = temp
    updatecartpriceIcre(actualPrice)
    
}
function  updatecartpriceIcre(active){
    let x = Number.parseInt(active)
    let price = Number.parseInt(finalPrice.textContent.replace("₹",""))
    let update = x + price
    finalPrice.textContent = priceSymbol+update

}

function cartDecreaseQuantity(){

    let activeNodeDEC = document.activeElement.parentElement.children[1].textContent
    let activeNodeDECX = document.activeElement.parentElement.children[1]
    if (activeNodeDEC<=0) {
        let remCart = document.activeElement.parentElement.parentElement
        card.removeChild(remCart)
        if(Number.parseInt(card.children.length)<=0){
            disapear.style.display = "none";
            nothingIsThere()
        }
    }
    else{
        let temp = (Number.parseInt(activeNodeDEC))
        temp-=1
        activeNodeDECX.textContent=temp
        let actualPrice = document.activeElement.parentElement.parentElement.children[0].children[0].children[1].children[1].children[0].textContent.replace("₹","")
        let finalSubPrice = document.activeElement.parentElement.parentElement.children[2].textContent.replace("₹","")
        let finalSubPriceX = document.activeElement.parentElement.parentElement.children[2]
        let priceTemp = ((Number.parseInt(finalSubPrice))-(Number.parseInt(actualPrice)))+priceSymbol
        finalSubPriceX.textContent = priceTemp
        updatecartpriceDecr(actualPrice)
    }

}

function  updatecartpriceDecr(active){
    let x = Number.parseInt(active)
    let price = Number.parseInt(finalPrice.textContent.replace("₹",""))
    let update = price - x
    finalPrice.textContent = priceSymbol+update

}



function totalPrice(){
    let price = finalPrice
    let actualPrice = document.activeElement.parentElement.parentElement.children[0].children[0].children[1].children[1].children[0].textContent.replace("₹","")
    price.textContent = actualPrice + priceSymbol
    
}
function priceIN(){
     // ========= price dec=============
     let actualPrice = document.activeElement.parentElement.parentElement.children[0].children[0].children[1].children[1].children[0].textContent.replace("₹","")
     let finalSubPrice = document.activeElement.parentElement.parentElement.children[2].textContent.replace("₹","")
     let finalSubPriceX = document.activeElement.parentElement.parentElement.children[2]
     let priceTemp = (Number.parseInt(actualPrice))-(Number.parseInt(finalSubPrice))+priceSymbol
     finalSubPriceX.textContent = priceTemp
     if (finalSubPrice<=0) {
         alert("cannot dec price")
     }
     // ===================================
}


function cartUpdationINCR(){
    priceIN()
}

function decChecker(check){
    let temp = check.children.length
    if(temp<=0){
        card.removeChild(check)
    }
}


function booked(){
    if((Number.parseInt(finalPrice.textContent.replace("₹","")))==0){
        alert("CANNOT PLACED ORDER 0")
        return
    }
    let conStatus = confirm("DO YOU WANT TO CONFIRM YOUR ORDER")
    if(conStatus){
        alert("ORDER PLACED")
    }
    else{
        alert("ORDER NOT PLACED")
    }
}


function removeCard(){

    let remCart = document.activeElement.parentElement.parentElement.parentElement.parentElement
   
    card.removeChild(remCart)
    if(Number.parseInt(card.children.length)<=0){
        disapear.style.display = "none";
        nothingIsThere()
    }

}

  
function nothingIsThere(){
    let h1 = document.createElement("h1")
    let text = document.createTextNode("<<<======YOUR CART IS EMPTY======>>>")
    h1.appendChild(text)
    card.appendChild(h1)
}

function createCart(img,head,quantity,price,subPrice){
    let row = document.createElement("tr")
    row.className = "cartContainer"
    row.innerHTML = ` <td>
                    <div class="cartInfo">
                        <img src="${img}">
                        <div>
                            <p> ${head} </p>
                            <small>PRICE: <strong class="price" >${price}</strong></small>
                            <br>
                            <button type="button" class="removeBTN" onclick="removeCard()">REM</button>
                        </div>
                    </div>
                </td>
                <td>
                    <button class="upBorder" type="button" onclick="cartIncreaseQuantity()">▲</button>
                    <span>${quantity}</span>
                    <button class="downBorder" type="button" onclick="cartDecreaseQuantity()">▼</button>
                </td>
                <td id="cartPrice">${subPrice+priceSymbol}</td>`

    insertCart.appendChild(row)

}

function countCard(){
    let x = insertCart.children.length
   
    if(x==0){
        nothingIsThere()
       
    }
    let count = Number.parseInt(finalPrice.textContent)
    if(count == 0){
        disapear.style.display = "none";
    }

    
}
