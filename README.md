# Bot de Moderação Avançada V2 (Configuração via JSON)

[![Licença](https://shields.io)](LICENSE)
[![Discord](https://shields.io)](https://discord.gg)

A versão 2 (V2) do bot de moderação definitivo para Discord. Desenvolvido em JavaScript com suporte total a comandos de barra (`/`) e sistema de Handler otimizado, ele traz recursos avançados para manter seu servidor seguro e limpo. Toda a configuração e armazenamento do bot são feitos de forma local e centralizada no arquivo `config.json`, sem a necessidade de arquivos `.env` ou bancos de dados externos.

## 🚀 Novidades e Funcionalidades da V2

*   **Configuração In-Discord Dinâmica:** Altere cargos, canais de logs e filtros diretamente pelo chat, com salvamento instantâneo no arquivo local.
*   **Armazenamento 100% em JSON:** Dispensa variáveis de ambiente ou bancos de dados complexos; o token, IDs e dados dos servidores ficam salvos diretamente no `config.json`.
*   **Sistema de Handler V2:** Estrutura limpa e rápida para carregamento automático de comandos Slash e gerenciamento de eventos.
*   **Moderação Completa:** Comandos ágeis de Ban, Kick, Mute (Timeout) e Unban com suporte a motivos e logs automáticos.
*   **Limpeza de Chat (Purge):** Apague centenas de mensagens de forma seletiva com comandos rápidos.

## 🛠️ Tecnologias Utilizadas

*   [Node.js](https://nodejs.org) (Ambiente de execução)
*   [Discord.js](https://js.org) (Biblioteca principal)
*   [JavaScript](https://mozilla.org) (Linguagem de programação)
*   `fs` / `fs-promises` (Módulo nativo do Node para manipulação do `config.json`)

## 📦 Instalação e Configuração

### Pré-requisitos
*   [Node.js](https://nodejs.org) v18.x ou superior instalado.
*   Token do bot com as **Intents de Servidor** (Server Members, Message Content) ativadas no [Discord Developer Portal](https://discord.com).

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com
   cd seu-repositorio
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure o arquivo `config.json`:**
   Abra ou crie o arquivo `config.json` na raiz do seu projeto e insira a estrutura básica com as suas credenciais:
   ```json
   {
     "token": "SEU_TOKEN_DO_BOT_AQUI",
     "clientId": "ID_DO_SEU_BOT_AQUI"
   }
   ```

4. **Inicie o bot:**
   ```bash
   node index.js
   ```

## ⚙️ Comandos de Moderação (/)

*   `/configurar` - Configura canais de logs e cargos da staff salvando tudo direto no `config.json`.
*   `/ban [usuário] [motivo]` - Bane um membro do servidor.
*   `/kick [usuário] [motivo]` - Expulsa um membro do servidor.
*   `/timeout [usuário] [tempo] [motivo]` - Aplica castigo (silencia) o usuário pelo tempo determinado.
*   `/clear [quantidade]` - Limpa uma quantidade específica de mensagens do canal atual.
*   `/warn [usuário] [motivo]` - Registra uma advertência no histórico local do usuário.

## ⚠️ Aviso Importante

Como todo o armazenamento é local, **nunca apague o arquivo `config.json`** e certifique-se de adicioná-lo ao seu `.gitignore` caso vá enviar o código para um repositório público, evitando que seu token do Discord seja exposto.

## 📄 Licença

Este projeto está sob a licença [MIT](LICENSE). Veja o arquivo para mais detalhes.
