function createDiceCard(id) {
    const card = document.createElement('div');
    card.className = 'dice-card';
    card.id = `dice-card-${id}`;

    const select = document.createElement('select');
    select.className = 'select-dice';
    select.name = `select-dice-${id}`;
    select.id = `select-dice-${id}`;
    ['4','6','8','10','12','20','100'].forEach(sides => {
        const option = document.createElement('option');
        option.value = sides;
        option.textContent = `D${sides}`;
        select.appendChild(option);
    });

    let removeBtn;
    if (id > 1) {
        removeBtn = document.createElement('button');
        removeBtn.className = 'delete';
        removeBtn.textContent = 'Delete';
        removeBtn.type = 'button';
        removeBtn.onclick = () => {
            if (document.querySelectorAll('.dice-card').length > 1) {
                card.remove();
            }
        };
    } else {
        removeBtn = document.createElement('div'); // Placeholder para mantener el diseño
        removeBtn.style.height = '25px'; // Mantiene el espacio
    }

    card.appendChild(select);
    card.appendChild(removeBtn);
    return card;
}

function rollDice(sides) {
    return fetch(`https://localhost:7268/${sides}`)
        .then(response => response.json())
        .then(data => data.result)
        .catch(() => 'Error');
}

document.addEventListener('DOMContentLoaded', function() {
    const diceContainer = document.getElementById('dice-container');
    const addDiceBtn = document.getElementById('add-dice-btn');
    const rollBtn = document.getElementById('roll-btn');
    const resultDiv = document.getElementById('result');
    let diceCount = 0;

    function addDiceCard() {
        const currentDice = document.querySelectorAll('.dice-card').length;
        if (currentDice < 10) {
            diceCount++;
            const card = createDiceCard(diceCount);
            diceContainer.appendChild(card);
        } else {
            alert('No puedes agregar más de 10 dados.');
        }
    }

    addDiceBtn.onclick = addDiceCard;

    // Siempre debe haber al menos una tarjeta
    addDiceCard();

    rollBtn.onclick = async function() {
        const selects = diceContainer.querySelectorAll('select.select-dice');
        if (selects.length === 0) {
            resultDiv.textContent = 'Add one dice.';
            return;
        }
        resultDiv.innerHTML = 'Lanzando...';
        const promises = Array.from(selects).map(select => rollDice(select.value));
        const results = await Promise.all(promises);

        let total = 0;
        let html = '<strong>Results:</strong><div class="resultados" style="display:flex;flex-direction:row;justify-content:center;gap:10px;">';
        results.forEach((res, i) => {
            html += `<div class="resultado-card">D${selects[i].value}: ${res}</div>`;
            if (!isNaN(res)) total += Number(res);
        });
        html += '</div>';
        if (results.length > 1) {
            html += `<strong>Total: ${total}</strong>`;
        }
        resultDiv.innerHTML = html;
    };

    // Función para limpiar todo - CORREGIDA
    const clearAllBtn = document.getElementById('clear-all-btn');
    if (clearAllBtn) {
        clearAllBtn.onclick = function() {
            diceContainer.innerHTML = '';
            diceCount = 0;
            addDiceCard(); // Siempre deja una tarjeta
            resultDiv.innerHTML = ''; // Limpia los resultados
        };
    }

    // Función para unificar todos los dados - CORREGIDA
    const setAllDiceBtn = document.getElementById('set-all-dice-btn');
    if (setAllDiceBtn) {
        setAllDiceBtn.onclick = function() {
            const setAllSelect = document.getElementById('set-all-dice-select');
            if (setAllSelect) {
                const selectedValue = setAllSelect.value;
                const selects = document.querySelectorAll('.select-dice');
                selects.forEach(select => {
                    select.value = selectedValue;
                });
            }
        };
    }
});