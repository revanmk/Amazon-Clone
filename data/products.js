import {formatCurrency} from '../scripts/utils/money.js';


class Product{
  id;
  image;
  name;
  rating;
  priceCents;

  constructor(productDetails){
    this.id= productDetails.id;
    this.image=productDetails.image;
    this.name=productDetails.name;
    this.rating=productDetails.rating;
    this.priceCents=productDetails.priceCents;
  }


  getStarsUrl(){
    return `images/ratings/rating-${this.rating.stars*10}.png`;
  }

  getPrice(){
    return `$${formatCurrency(this.priceCents)}`;
  }

  extraInfoHTML(){
    return '';
  }
}


class Clothing extends Product{
  sizeChartLink;
  constructor(productDetails){
    super(productDetails);
    this.sizeChartLink=productDetails.sizeChartLink;
  }

  extraInfoHTML(){
    return `
    <a href="${this.sizeChartLink}" target="_blank">Size Chart</a>
    `;
  }
}



export let products=[];


export function loadProductsFetch(){
  const promise=fetch('https://supersimplebackend.dev/products').then((response)=>{
    return response.json();
  }).then((productsData)=>{
    products=productsData.map((productDetails)=>{
      if(productDetails.type=='clothing')
        return new Clothing(productDetails);
      else
      return new Product(productDetails);
      });
      console.log('load Products');
      
  }).catch((error)=>{
        console.log('Unexpected error. Please try again.')

  })
  return promise;
}
// }
// loadProductsFetch().then(()=>{
//   console.log('next step');
// });

export function loadProducts(fun){
    const xhr=new XMLHttpRequest();

    xhr.addEventListener('load',()=>{
    products=JSON.parse(xhr.response).map((productDetails)=>{
      if(productDetails.type=='clothing')
        return new Clothing(productDetails);
      else
      return new Product(productDetails);
      });
      fun();
  });

  xhr.addEventListener('error',(error)=>{
    console.log('Unexpected error. Please try again.')
  });

  xhr.open('GET','https://supersimplebackend.dev/products');
  xhr.send();
}

export function getProduct(productId){
  let matchingProduct;

      products.forEach((product) => {
          if(product.id===productId){
              matchingProduct=product;
          }
      });
  return matchingProduct;
}