// MODULOS
import showCars from "./index_db.js";

// VARIABLES
const d = document,
    currentYear = new Date().getFullYear(),
    minYear = currentYear - 11;

// Generando un objeto para la busqueda
const searchObj = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: '',
}

// EVENTOS
d.addEventListener('DOMContentLoaded', () => {
    showCars();
    addingYears();
    d.addEventListener('change', selectValues);
});

// FUNCIONES

// Agregando los años de los autos al `select` de año.
function addingYears(){
    for(let i = currentYear; i >= minYear; i--){
        const opcion = d.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion);
    }
}

// Leyendo los valores de los `select` de busqueda y agregandolos al `searchObj`.
function selectValues(e){
    if(e.target.matches('#marca')){
        searchObj.marca = e.target.value;
        filterCar();
    }
    if(e.target.matches('#year')){
        searchObj.year = e.target.value;
        filterCar();
    }
    if(e.target.matches('#minimo')){
        searchObj.minimo = e.target.value;
        filterCar();
    }
    if(e.target.matches('#maximo')){
        searchObj.maximo = e.target.value;
        filterCar();
    }
    if(e.target.matches('#puertas')){
        searchObj.puertas = e.target.value;
        filterCar();
    }
    if(e.target.matches('#transmision')){
        searchObj.transmision = e.target.value;
    }
    if(e.target.matches('#color')){
        searchObj.color = e.target.value;
    }
} 

// Función que filtra en base a la busqueda
async function filterCar(){
   try {
     cleanHTML();

     const fileDB = await fetch("./db.json");
     const db = await fileDB.json();
     const { autos } = db;

     const fragment = d.createDocumentFragment();
     
     const result = autos.filter(filterBrand).filter(filterYear).filter(filterMin).filter(filterMax).filter(filterDoor);
     //    console.log(result)
     
     result.forEach((auto) => {
       const { marca, modelo, year, puertas, transmision, precio, color } =
         auto;
       const autoHTML = d.createElement("P");
       // autoHTML.classList.add('separar');
       autoHTML.textContent = `
                ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmisión: ${transmision} - Precio: $${precio} -  Color: ${color}
            `;
       fragment.appendChild(autoHTML);
     });
     resultado.appendChild(fragment);
   } catch (error) {
       console.log(error);
   }
}

// Limpia el HTML que muestra los resultados
function cleanHTML(){
    while(resultado.firstChild) resultado.removeChild(resultado.firstChild);
}

// Función que filtra en base a la busqueda los autos de acuerdo a su marca
function filterBrand(auto){
    const { marca } = searchObj;
    if(marca) return auto.marca === marca;
    return auto;
}
// Función que filtra en base a la busqueda los autos de acuerdo a su año
function filterYear(auto){
    const { year } = searchObj;
    if(year) return auto.year === parseInt(year);
    return auto;
}
// Función que filtra en base al precio minimo del auto
function filterMin(auto){
    const { minimo } = searchObj;
    if(minimo) return auto.precio >= minimo;
    return auto;
}
// Función que filtra en base al precio máximo del auto
function filterMax(auto){
    const { maximo } = searchObj;
    if(maximo) return auto.precio <= maximo;
    return auto;
}
// Función que filtra en base número de puertas del auto
function filterDoor(auto){
    const { puertas } = searchObj;
    if(puertas) return auto.puertas === parseInt(puertas);
    return auto;
}


