import {addToCart,cart,loadFromStorage} from '../../data/cart.js';


describe('test suite : addToCart',()=>{
    it('add an existing product to the cart',()=>{
        spyOn(localStorage,'setItem');
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([{
                productId:'aaa65ef3-8d6f-4eb3-bc9b-a6ea49047d8f',
                quantity: 1,
                deliveryOptionId : '1',
            }]);
        });
        loadFromStorage()
        const productId = 'aaa65ef3-8d6f-4eb3-bc9b-a6ea49047d8f';
        const input = document.createElement('input');
        input.className = `js-quantity-selector-${productId}`;
        input.value = '1';
        document.body.appendChild(input);

        addToCart(productId);

        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual(productId);
        expect(cart[0].quantity).toEqual(2); // 1 + 1
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);

        document.body.removeChild(input); // 
  });

    it('add a new product to the cart',()=>{
        spyOn(localStorage,'setItem');
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([]);
        });
        loadFromStorage();

        const productId = 'abc123';
        const input = document.createElement('input');
        input.className = `js-quantity-selector-${productId}`;
        input.value = '1';
        document.body.appendChild(input);
        addToCart(productId);
  // Call the function under test
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual(productId);
        expect(cart[0].quantity).toEqual(1);
        document.body.removeChild(input);

    });
});