import{renderOrderSummary} from '../../scripts/checkout/orderSummary.js'
import {loadFromStorage} from '../../data/cart.js';


describe('test suite: renderOrderSummary',()=>{
    it('displays the cart',()=>{
        document.querySelector('.js-test-container').innerHTML=`
            <div class="js-order-summary"></div>
        `;    
        spyOn(localStorage,'getItem').and.callFake(()=>{
                    return JSON.stringify([{
                        productId:'aaa65ef3-8d6f-4eb3-bc9b-a6ea49047d8f',
                        quantity: 1,
                        deliveryOptionId : '1',
                    }]);
                });
                loadFromStorage();
        renderOrderSummary();
        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);
        expect(document.querySelector('.js-product-quantity-aaa65ef3-8d6f-4eb3-bc9b-a6ea49047d8f').innerText).toContain(1);    
    
    });
    
});







