function agregarFila() {
    const tabla = document.getElementById('cuerpoTabla');
    const fila = `
        <tr>
            <td><input type="text" placeholder="Ej: Paral 60mm" class="nombre"></td>
            <td><input type="number" placeholder="ML totales" class="ml-total"></td>
            <td><input type="number" value="2.44" class="largo-p"></td>
            <td><button onclick="this.parentElement.parentElement.remove()">❌</button></td>
        </tr>`;
    tabla.insertAdjacentHTML('beforeend', fila);
}

function procesarCalculo() {
    const filas = document.querySelectorAll('#cuerpoTabla tr');
    let htmlResultado = "<h2>Lista de Compra Estimada</h2><ul>";
    const traslape = 0.20; // 20cm de traslape fijo

    filas.forEach(fila => {
        const nombre = fila.querySelector('.nombre').value || "Material";
        const mlTotal = parseFloat(fila.querySelector('.ml-total').value);
        const largoP = parseFloat(fila.querySelector('.largo-p').value);

        if (mlTotal && largoP) {
            // Lógica Senior: Cálculo compensado por traslapes
            // Cantidad inicial sin traslape
            let cantidadPiezas = Math.ceil(mlTotal / largoP);
            
            // Añadimos el extra por cada unión necesaria (cantidad - 1 uniones)
            let mlConTraslape = mlTotal + ((cantidadPiezas - 1) * traslape);
            
            // Recalculamos piezas con el nuevo largo total
            let piezasFinales = Math.ceil(mlConTraslape / largoP);
            
            // Añadimos un 5% de seguridad por cortes erróneos (desperdicio físico)
            piezasFinales = Math.ceil(piezasFinales * 1.05);

            htmlResultado += `<li><strong>${nombre}:</strong> ${piezasFinales} unidades de ${largoP}m</li>`;
        }
    });

    htmlResultado += "</ul>";
    document.getElementById('resultadoFinal').innerHTML = htmlResultado;
}
