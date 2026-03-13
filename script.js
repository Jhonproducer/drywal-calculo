function calcularMateriales() {
    // 1. Obtener valores
    const largo = parseFloat(document.getElementById('largoTecho').value);
    const ancho = parseFloat(document.getElementById('anchoTecho').value);
    const L_perfil = parseFloat(document.getElementById('largoPerfil').value);
    const separacion = parseFloat(document.getElementById('separacion').value);
    const traslape = 0.20; // 20cm de traslape solicitado

    // 2. Cálculo de Rieles (Perimetrales)
    // Se colocan en el perímetro del ancho y largo
    const perimetro = (largo * 2) + (ancho * 2);
    const cantRieles = Math.ceil(perimetro / L_perfil);

    // 3. Cálculo de Parales (Estructura interna)
    // Los parales suelen ir a lo largo, distanciados por el ancho
    const numeroLineas = Math.ceil(ancho / separacion) + 1;
    
    // Para cada línea, calculamos cuántos perfiles se van considerando traslape
    // Fórmula: (Largo total + (N-1)*traslape) / Largo Perfil
    // Simplificado para código:
    const metrosLinealesTotalesParales = numeroLineas * largo;
    
    // Estimación de empates: si el largo es mayor al perfil, habrá traslapes
    const empatesPorLinea = Math.floor(largo / L_perfil);
    const extraPorTraslape = empatesPorLinea * traslape * numeroLineas;
    
    const cantParales = Math.ceil((metrosLinealesTotalesParales + extraPorTraslape) / L_perfil);

    // 4. Láminas de Drywall (1.22 x 2.44 = 2.9768 m2)
    const area = largo * ancho;
    const cantLaminas = Math.ceil(area / 2.97);

    // 5. Tornillos (Promedio 30 por lámina entre estructura y drywall)
    const tornillos = Math.ceil(cantLaminas * 35);

    renderResultados(cantRieles, cantParales, cantLaminas, tornillos, area);
}

function renderResultados(rieles, parales, laminas, tornillos, area) {
    const resDiv = document.getElementById('results');
    resDiv.innerHTML = `
        <h3>Resultados para ${area.toFixed(2)} m²</h3>
        <div class="result-item"><span>Rieles (Perímetro):</span> <span class="val">${rieles} pzs</span></div>
        <div class="result-item"><span>Parales (Con traslape):</span> <span class="val">${parales} pzs</span></div>
        <div class="result-item"><span>Láminas de Drywall:</span> <span class="val">${laminas} pzs</span></div>
        <div class="result-item"><span>Tornillos (Estructura/Placa):</span> <span class="val">${tornillos} aprox</span></div>
        <p style="font-size: 0.7em; color: gray; margin-top: 10px;">* Se incluye un 10% de desperdicio y traslape de 20cm en uniones.</p>
    `;
}