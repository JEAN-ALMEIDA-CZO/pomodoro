const duracoes = {
    pomodoro: 25 * 60,
    short: 5 * 60,
    long: 15 * 60
};

let modo = localStorage.getItem("modo") || "pomodoro";
let tempoRestante = parseInt(localStorage.getItem("tempoRestante")) || duracoes[modo];
let temporizador;
let rodando = localStorage.getItem("rodando") === "true";
let currentTheme = localStorage.getItem('theme') || 'dark';
let alertaAtivado = false;
let alertasTocados = 0;

const alarme = new Audio("alarme.mp3");

function applyTheme(theme) {
    document.body.classList.remove('dark-theme', 'light-theme');
    document.body.classList.add(`${theme}-theme`);
    localStorage.setItem('theme', theme);
    currentTheme = theme;
}

function toggleTheme() {
    applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
}

function atualizarVisor() {
    const visor = document.getElementById("visor");
    const minutos = Math.floor(tempoRestante / 60).toString().padStart(2, '0');
    const segundos = (tempoRestante % 60).toString().padStart(2, '0');
    visor.textContent = `${minutos}:${segundos}`;
    document.title = `${minutos}:${segundos} - Promodoro Plus`;

    if (tempoRestante <= 10) {
        if (!alertaAtivado) {
            visor.classList.add("alerta");
            alertaAtivado = true;
        }
    } else if (alertaAtivado) {
        visor.classList.remove("alerta");
        alertaAtivado = false;
        alertasTocados = 0;
    }
}

function iniciarTemporizador() {
    if (!temporizador) {
        temporizador = setInterval(() => {
            if (tempoRestante > 0) {
                tempoRestante--;
                localStorage.setItem("tempoRestante", tempoRestante);
                atualizarVisor();

                if (tempoRestante <= 10 && alertasTocados < 9) {
                alarme.pause();
                alarme.currentTime = 0;
                alarme.play();
                alertasTocados++;
                }

            } else {
                clearInterval(temporizador);
                temporizador = null;
                rodando = false;
                localStorage.setItem("rodando", "false");
                alert("Tempo finalizado! Hora de uma pausa ou de voltar ao foco.");
                document.getElementById("visor").classList.remove("alerta");
                alertaAtivado = false;
                alertasTocados = 0;

                if (modo === 'pomodoro') {
                    definirModo('short');
                    iniciarTemporizador();
                }
            }
        }, 1000);
        rodando = true;
        localStorage.setItem("rodando", "true");
    }
}

function pausarTemporizador() {
    clearInterval(temporizador);
    temporizador = null;
    rodando = false;
    localStorage.setItem("rodando", "false");
}

function resetarTemporizador() {
    pausarTemporizador();
    tempoRestante = duracoes[modo];
    localStorage.setItem("tempoRestante", tempoRestante);
    atualizarVisor();
    document.getElementById("visor").classList.remove("alerta");
    alertaAtivado = false;
    alertasTocados = 0;
}

function definirModo(novoModo) {
    modo = novoModo;
    document.querySelectorAll('.mode-selector button').forEach(btn => btn.classList.remove("active"));
    document.getElementById(`btn-${novoModo}`).classList.add("active");
    localStorage.setItem("modo", novoModo);
    resetarTemporizador();
}

applyTheme(currentTheme);
atualizarVisor();
if (rodando) iniciarTemporizador();
document.getElementById(`btn-${modo}`).classList.add("active");

const inputNota = document.getElementById("inputNota");
const listaNotas = document.getElementById("listaNotas");

function renderizarNotas() {
    const notas = JSON.parse(localStorage.getItem("notas") || "[]");
    listaNotas.innerHTML = "";
    notas.forEach((nota, indice) => {
        const li = document.createElement("li");
        li.className = "note-item";
        li.setAttribute("draggable", true);
        li.dataset.index = indice;
        li.innerHTML = `<span>${nota}</span> <button onclick="excluirNota(${indice})">Excluir</button>`;

        li.addEventListener("dragstart", (e) => {
            li.classList.add("dragging");
            e.dataTransfer.setData("text/plain", indice);
        });
        li.addEventListener("dragend", () => {
            li.classList.remove("dragging");
            const reordenadas = [...listaNotas.children].map(item => item.querySelector('span').textContent);
            localStorage.setItem("notas", JSON.stringify(reordenadas));
        });

        listaNotas.appendChild(li);
    });
}

function adicionarNota() {
    const valor = inputNota.value.trim();
    if (!valor) return;
    const notas = JSON.parse(localStorage.getItem("notas") || "[]");
    notas.push(valor);
    localStorage.setItem("notas", JSON.stringify(notas));
    inputNota.value = "";
    renderizarNotas();
}

function excluirNota(indice) {
    const notas = JSON.parse(localStorage.getItem("notas") || "[]");
    notas.splice(indice, 1);
    localStorage.setItem("notas", JSON.stringify(notas));
    renderizarNotas();
}

listaNotas.addEventListener("dragover", (e) => {
    e.preventDefault();
    const draggingItem = document.querySelector(".dragging");
    if (!draggingItem) return;

    const afterElement = getDragAfterElement(listaNotas, e.clientY);
    if (afterElement == null) {
        listaNotas.appendChild(draggingItem);
    } else {
        listaNotas.insertBefore(draggingItem, afterElement);
    }
});

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll(".note-item:not(.dragging)")];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

renderizarNotas();
