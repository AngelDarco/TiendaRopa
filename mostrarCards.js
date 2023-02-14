export default function mostrarCards(like = false, car = false){

  Promise.resolve(fetchData()).then(data => {
       if (!data || data.length <= 0) return;
       const arr = data.sort((a,b)=> Math.random()-0.5)
      const user = window.localStorage.getItem('session');
      
      if(like){
        const database = JSON.parse(window.localStorage.getItem(user+'Likes'))
        let dataLike = [];
        if(database){
        for(let i = 0; i < database.data.length; i++){
          for(let ii = 0; ii < arr.length; ii++){
            if(database.data[i] === arr[ii].codepro)
            dataLike.push(arr[ii])
          }
        }
        loadObserver(dataLike,like,car);
      }else console.log('No favorite items found');
      }else if(car){
        const database = JSON.parse(window.localStorage.getItem(user+'Car'))
        let dataCar = [];
        if(database){
        for(let i = 0; i < database.data.length; i++){
          for(let ii = 0; ii < arr.length; ii++){
            if(database.data[i] === arr[ii].codepro)
            dataCar.push(arr[ii])
          }
        }
        loadObserver(dataCar,like,car)
      }else console.log('no car items found')
      }
      else loadObserver(arr,like,car)

     });
    }


    function loadObserver(arrLoaded,like,car){
      console.log(arrLoaded)
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 1
      }
      const obsvr = document.querySelector('.observer');
      const observer = new IntersectionObserver(entry =>{
        let data = [];
        let count;
        if(arrLoaded.length >= 3) count = 3 
        else count = arrLoaded.length;

       if(entry[0].isIntersecting){
          for(let i = 0; i < count; i++){
            data.push(arrLoaded[0]);
            arrLoaded.shift();
          }
          card(data,like,car);
        }else return;

        if(arrLoaded.length===0){
        arrLoaded=[]
        data=[]
        console.log('end', arrLoaded,data)
        card([]);
}
      }, options);
      observer.observe(obsvr)     
     }






  function card(arr,like,car){
    console.log(arr)
    if(arr.length ===0 ) return
    const template = document.querySelector('.template-card').content;
    const cajacard = document.querySelector('.img__main');
    const fragment = new DocumentFragment();
    
        let i = 0;
        arr.forEach( item => {
          const corazon = template.querySelector('.card-back figure .heart');
          const carro = template.querySelector('.card-back figure .car');
          
        template.querySelector('.card-front figure .img').setAttribute('src',item.imagen); 
        template.querySelector('.card-front figure figcaption').innerHTML = item.codepro; 
        template.querySelector('.card-front ul li .nombre').innerHTML = item.nombre; 
        template.querySelector('.card-front ul li .talla').innerHTML = item.talla;
        template.querySelector('.card-front ul li .precio').innerHTML = item.precio;
        template.querySelector('.card-front ul li .stock').innerHTML = item.stock;
        template.querySelector('.card-front ul li .genero').innerHTML = item.genero;
      
        // let nuevo = color(mostrar[i].colores);
        // let nodo = template.querySelector('.card-front ul .li-color ').children[0];
        // template.querySelector('.card-front ul .li-color ').replaceChild(nuevo,nodo);
      
        template.querySelector('.card-front ul li .span-descripcion').innerHTML = item.descripcion;
        template.querySelector('.card-back figure .img2').setAttribute('src',item.imagen); 
        template.querySelector('.card-back figure .img2').setAttribute('id',i); 
      
          /* Mostrar Corazon */
        // if(like)
        // corazon.classList.add('fas','fa-heart','like') 
        // else
        corazon.classList.add('far','fa-heart');

          /* Mostrar Carrito */
          // if(car)
          // carro.classList.add('fas','fa-cart-plus')
          // else
          carro.classList.add('fas','fa-shopping-cart')

          //  carro.classList.remove('fa','fa-cart-plus','fa-shopping-cart');
      //  let data = localStorage.getItem('carro');
      //  let data2 = data.split(' ');
      //  data2.forEach(code =>{
      //       if(code==item.codepro){
      //         carro.classList.remove('fa','fa-cart-plus','fa-shopping-cart');
      //         carro.classList.add('fa','fa-shopping-cart');
      //       }else {
      //         if(carro.classList.contains('fa-shopping-cart'))return;
      //         carro.classList.add('fa',"fa-cart-plus");}
      //     }) 
      
        const clone = template.cloneNode(true);
        fragment.appendChild(clone);
        i++;
        });
      
         cajacard.appendChild(fragment);
        //  eventoImagenes();
        //  meGusta();
        // await  carro();
      }



      async function fetchData() {
        return await fetch('./productosRead.php')
          .then(data => data.json())
          .then(data => data);
      }