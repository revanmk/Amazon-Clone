export let cart;

loadFromStorage();

export function loadFromStorage(){
    cart=JSON.parse(localStorage.getItem('cart'));

if(!cart){
    cart=[];
}
}

function saveToStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
}

export function addToCart(productId){
    const select_quantity=Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
            let matchingItem;
            cart.forEach((cartItem)=>{
                if(productId===cartItem.productId){
                    matchingItem=cartItem;
                }
            });
            
            if(matchingItem){
                matchingItem.quantity+=select_quantity;
            }
            else{
            cart.push({
                productId:productId,
                quantity:select_quantity,
                deliveryOptionId:'1'
            });
        }
    saveToStorage();  
}

export function removeFromCart(productId){
    const newCart=[];
    cart.forEach((cartItem)=>{
        if(cartItem.productId!=productId)
            newCart.push(cartItem);
    })
    cart=newCart;
    saveToStorage();
}


export function calculateCartQuantity(){
     let cartQuantity=0;
         cart.forEach((cartItem) =>{
            cartQuantity+=cartItem.quantity;
        });
    return cartQuantity;
}


export function updateCartQuantityUI() {
  const cartQuantity = calculateCartQuantity();
  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity === 0 ? '' : cartQuantity;
}

export function updateDeliveryOption(productId,deliveryOptionId){
    let matchingItem;
    cart.forEach((cartItem)=>{
        if(productId==cartItem.productId)
            matchingItem=cartItem;
    })
    matchingItem.deliveryOptionId=deliveryOptionId;
    saveToStorage();
}