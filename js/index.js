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
    }
    if(e.target.matches('#maximo')){
        searchObj.maximo = e.target.value;
    }
    if(e.target.matches('#puertas')){
        searchObj.puertas = e.target.value;
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
       const fileDB = await fetch('./db.json');
       const db = await fileDB.json();
       const { autos } = db;
       
       const result = autos.filter(filterBrand).filter(filterYear);
       console.log(result)
    

   } catch (error) {
       console.log(error);
   }
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


