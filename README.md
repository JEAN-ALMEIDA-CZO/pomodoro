# ⏱️ Promodoro Plus

[![Licença MIT](https://img.shields.io/badge/Licença-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Problemas Abertos](https://img.shields.io/github/issues/JEAN-ALMEIDA-CZO/pomodoro?color=red)](https://github.com/JEAN-ALMEIDA-CZO/pomodoro/issues)
[![Último Commit](https://img.shields.io/github/last-commit/JEAN-ALMEIDA-CZO/pomodoro?color=blue)](https://github.com/JEAN-ALMEIDA-CZO/pomodoro/commits)

Uma aplicação web simples e eficaz que implementa a técnica Pomodoro para aumentar a produtividade. Combina um temporizador personalizável com um gerenciador de tarefas, suporte a temas claro/escuro e design responsivo, ideal para organizar sessões de trabalho e anotações.

---

## 🌐 Demonstração

Acesse a demonstração do projeto para experimentar o Promodoro Plus em ação:  
👉 [**Ver Demonstração**](https://jean-almeida-czo.github.io/pomodoro/)

---

## ✨ Funcionalidades

- ⏱️ **Temporizador Pomodoro**: Sessões de foco (25 min), pausa curta (5 min) e pausa longa (15 min).
- ▶️ **Controle do Temporizador**: Iniciar, pausar e resetar.
- 📝 **Gerenciador de Tarefas**:
  - Adicione, exclua e reordene anotações com arrastar e soltar.
  - Persistência de tarefas via `localStorage`.
- 🎨 **Temas**: Alternância entre temas claro e escuro com transições suaves.
- 📱 **Responsividade**: Interface adaptável para desktops e dispositivos móveis.
- ⏰ **Alertas Sonoros**: Toque de alarme que dispara 9 vezes nos últimos 10 segundos da contagem.
- 🔴 **Piscar do Temporizador**: Contador pisca em vermelho alternando com a cor do tema durante os últimos 10 segundos.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura da aplicação.
- **CSS3**: Estilização com variáveis CSS e design responsivo.
- **JavaScript (Vanilla)**: Lógica do temporizador, controle de alertas e gerenciamento de tarefas.
- **Google Fonts**: Fonte Roboto para tipografia moderna.
- **LocalStorage**: Persistência de dados no navegador.

---

### Principais Funções:

- `iniciarTemporizador()`: Inicia a contagem regressiva.
- `pausarTemporizador()`: Pausa o temporizador.
- `resetarTemporizador()`: Reinicia o tempo do modo atual.
- `definirModo(modo)`: Alterna entre Pomodoro, pausa curta e pausa longa.
- `adicionarNota()`: Adiciona uma nova nota à lista.
- `excluirNota(indice)`: Remove uma nota específica.
- `renderizarNotas()`: Atualiza a lista de notas com suporte a arrastar e soltar.
- `toggleTheme()`: Alterna entre temas claro e escuro.
- Alertas sonoros e piscar do contador nos últimos 10 segundos.

---

## 🚀 Como Usar

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/JEAN-ALMEIDA-CZO/pomodoro.git
