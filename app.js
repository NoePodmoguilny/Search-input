// una funcionalidad que nos permita MOSTRAR LOS PRODUCTOS
// otra funcionalidad para BUSCAR
// evento click

/**
 * Spread Operator:
 *          --> Toma un array/objeto plano y separa todos los valores. Toma el array/objeto original y genera un NUEVO array/objeto con los valores del array/objeto original.
 *          --> Tambien se conoce como DESTRUCTURACIÓN: crea const con valores almacenados en un objt/array
 *                      [...array], {...objeto}
 */

// 1. Copiamos el array products. Sería como usar una API rest (tipo DB - base de datos)
let filteredProducts = [...products]; //esto viene del archivo products.js. Entonces esto es una COPIA no una referencia a memoria del array original

//tomo el div de HTML que contiene los productos, lo guardo en una variable:
const productsContainer = document.querySelector(".products-container")

// 2. Creamos la vista, funcion pra mostar todos los elementos (productos)
const displayProducts = () =>{
    //si el array NO tiene productos, mostramos una vista "No existe el producto"
    if(filteredProducts.length < 1) {
        productsContainer.innerHTML = "<h6>Sorry, no products matched your search</h6>"
        return; //Retorna un valor, o, EN ESTE CASO, rompe la ejecución de la función. Entonces no hace más nada, finaliza en este punto. Sería como una especie de "break"
    }
    //que pasa cuando SI hay valores(productos) en el array
    //Para mostrar los productos trabajamos con .map()
    // --> hace una copia modiicada del array.
    productsContainer.innerHTML = filteredProducts.map(function(product){
        //Destructuración de los valores del array products:
        const {id, title, image, price} = product;    
        return `<article class="product" data-id="${id}">
            <img src = "${image}"
            class = "product-img img"
            alt = "${title}>
            <footer>
                <h5 class = "product-name">${title}</h5>
                <span class = "product-price">${price}</span>
            </footer>
        </article>`; // "data- " es un atributo especial de los elementos del HTML. Selecciona un elemento sin alterar las propiedades de SEO.
        // --> en JS, "dataset" contiene TODOS los atributos data- agregados a un elemento HTML
    }).join(""); //que se genere un dato de tipo string sin espacios (para eliminar la coma que aparece)
};
displayProducts();

// 3. Text Filter. Agrego el evento Buscador:
const form = document.querySelector(".input-form");
const searchInput = document.querySelector(".search-input");
//cada vez que se desata el evento "keyup", tomamos del searchInput su value(valor) y se guarda en la const inputValue
form.addEventListener("keyup", () => {
    const inputValue = searchInput.value;
    filteredProducts = products.filter((product) =>{
        return product.title.toLowerCase().includes(inputValue); //en la variable filterProducts guardamos un array sólo con productos cuyo titulos incluye lo que se escribe en el inputValue 
    });
    displayProducts();
});

//4. Filter Buttons. 
//Tomamos los elementos de los botones y guardamos en la const
const companiesDOM = document.querySelector(".companies");
// Armmos los botones por companias:
const displayButtons = () => {
    const buttons = [
        "all",
        ...new Set(products.map((product)=> product.company)),
    ]; //Set es un tipo de array especial, no puede tener elementos repetidos
    //Set -> iterable que evita repeticiones
    // console.log(buttons);
    companiesDOM.innerHTML = buttons.map((company) => {
        return `<button 
                    class="company-btn"
                    data-id="${company}">
                    ${company}
                </button>`;
    }).join("");
};
displayButtons();

companiesDOM.addEventListener("click", (e) => {
    const el = e.target;
    if(el.classList.contains("company-btn")){
        //dataset -> permite la lectura de los atributos datos-
        if (el.dataset.id === "all") {
            filteredProducts = [...products];
        }else{
            filteredProducts = products.filter((product) => {
                return product.company === el.dataset.id;
            });
        }
        searchInput.value = "";
        displayProducts();
    }
});