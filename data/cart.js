export const cart=[];


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
                quantity:select_quantity
            });
        }  
}