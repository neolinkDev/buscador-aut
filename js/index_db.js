const d = document;

export default async function showCars(){
    
    try {
        const file = await fetch('./db.json');
        const db = await file.json();
        
        const { autos } = db;
        const fragment = d.createDocumentFragment();

        autos.forEach(auto => {
            const { marca, modelo, year, puertas, transmision, precio, color  } = auto;
            const autoHTML = d.createElement('P');
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
