// Agregar una fila inicial al cargar
window.onload = () => agregarFila();

function agregarFila() {
    const tabla = document.getElementById('cuerpoTabla');
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td><input type="text" placeholder="Ej. Paral 6cm" class="nombre"></td>
        <td><input type="number" placeholder="0.00" class="ml-total"></td>
        <td><input type="number" value="2.44" class="largo-p"></td>
        <td><button class="btn-delete" onclick="this.parentElement.parentElement.remove()">&times;</button></td>
    `;
    tabla.appendChild(tr);
}

function procesarCalculo() {
    const filas = document.querySelectorAll('#cuerpoTabla tr');
    const contenedor = document.getElementById('resultadoFinal');
    contenedor.innerHTML = ""; // Limpiar
    
    const traslape = 0.20; // 20cm

    filas.forEach(fila => {
        const nombre = fila.querySelector('.nombre').value || "Material";
        const mlTotal = parseFloat(fila.querySelector('.ml-total').value);
        const largoP = parseFloat(fila.querySelector('.largo-p').value);

        if (mlTotal > 0) {
            // Lógica de traslapes: (Largo Total / (Largo Perfil - Traslape))
            // Es la forma más precisa de calcular tramos continuos
            let piezas = Math.ceil(mlTotal / (largoP - traslape));
            
            // Margen de error/desperdicio del 5%
            let totalConDesperdicio = Math.ceil(piezas * 1.05);

            const card = document.createElement('div');
            card.className = 'result-card';
            card.innerHTML = `
                <h3>${nombre}</h3>
                <p>Necesitas: <strong>${totalConDesperdicio} piezas</strong></p>
                <small>Basado en ${mlTotal}ml con traslape de 20cm</small>
            `;
            contenedor.appendChild(card);
        }
    });
}
