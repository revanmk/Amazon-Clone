class Cart{
    cartItems;
    #localStorageKey;


    constructor(localStorageKey){
        this.#localStorageKey=localStorageKey;
        this.#loadFromStorage();
    }

    #loadFromStorage(){
        this.cartItems=JSON.parse(localStorage.getItem(this.#localStorageKey));
        if(!this.cartItems){
            this.cartItems=[];
        }
    }

    saveToStorage(){
            localStorage.setItem(this.#localStorageKey,JSON.stringify(this.cartItems));
    }

    addToCart(productId){
                    let matchingItem;
                    this.cartItems.forEach((cartItem)=>{
                        if(productId===cartItem.productId){
                            matchingItem=cartItem;
                        }
                    });
                    
                    if(matchingItem){
                        matchingItem.quantity+=1;
                    }
                    else{
                    this.cartItems.push({
                        productId:productId,
                        quantity:1,
                        deliveryOptionId:'1'
                    });
                }
            this.saveToStorage();  
        }
    
    removeFromCart(productId){
            const newCart=[];
            this.cartItems.forEach((cartItem)=>{
                if(cartItem.productId!=productId)
                    newCart.push(cartItem);
            })
            this.cartItems=newCart;
            this.saveToStorage();
        }

     updateDeliveryOption(productId,deliveryOptionId){
            let matchingItem;
            this.cartItems.forEach((cartItem)=>{
                if(productId==cartItem.productId)
                    matchingItem=cartItem;
            });
            matchingItem.deliveryOptionId=deliveryOptionId;
            this.saveToStorage();
        }

        calculateCartQuantity(){
            let cartQuantity=0;
                this.cartItems.forEach((cartItem) =>{
                    cartQuantity+=cartItem.quantity;
                });
            return cartQuantity;
        }
        
        updateCartQuantityUI() {
            const cartQuantity = this.calculateCartQuantity();
            document.querySelector('.js-cart-quantity').innerHTML = cartQuantity === 0 ? '' : cartQuantity;
        }

}

const cart=new Cart('cart-oop');
const bussinessCart= new Cart('cart-bussiness');

console.log(cart);
console.log(bussinessCart);
