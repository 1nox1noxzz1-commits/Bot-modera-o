const { Client, GatewayIntentBits, REST, Routes, Collection, ActivityType } = require('discord.js');
const config = require('./config.json');
const fs = require('fs');

console.clear();

console.log(`
  ╔═══════════════════════════════╗
  ║ Criador: 💜 | Ner #Programador                   ║
  ╚═══════════════════════════════╝
`);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  http: { timeout: 50000 },
});

client.setMaxListeners(20);

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  if (command.data && typeof command.data.toJSON === 'function' && typeof command.execute === 'function') {
    client.commands.set(command.data.name, command);
  }
}

console.log(`✅ ${client.commands.size} comandos carregados.`);

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.name && typeof event.execute === 'function') {
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args, client));
    } else {
      client.on(event.name, (...args) => event.execute(...args, client));
    }
  }
}

console.log(`✅ ${eventFiles.length} eventos carregados.`);

client.once('ready', async () => {
  console.clear();
  console.log(`
  ╔═══════════════════════════════╗
  ║ Vanguard - O Melhor Servidor de Vazamentos ║
  ╚═══════════════════════════════╝
  `);

  console.log(`✅ Bot iniciado como ${client.user.tag}`);
  console.log('🌟 Venha conhecer nosso novo servidor de vazamentos - Vanguard -');
  console.log('🔗 Link do Servidor: https://discord.gg/24qVsNFpPZ');

  
  client.user.setActivity('Venha Conhecer Nosso Novo Servidor de Vazamentos - Vanguard - \n\n🔗 https://discord.gg/24qVsNFpPZ', {
    type: ActivityType.Watching,
  });

  const rest = new REST({ version: '10' }).setToken(config.token);

  try {
    const commandsData = client.commands.map(cmd => cmd.data.toJSON());
    await rest.put(
      Routes.applicationCommands(client.user.id),
      { body: commandsData },
    );
    console.log('✅ Comandos registrados com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao registrar comandos:', error);
  }
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) {
    return interaction.reply({ content: 'Comando não encontrado!', ephemeral: true });
  }

  try {
    await command.execute(interaction, client);
  } catch (error) {
    console.error(`Erro ao executar o comando ${interaction.commandName}:`, error);
    await interaction.reply({ content: 'Houve um erro ao executar este comando!', ephemeral: true });
  }
});

client.on('error', error => {
  console.error('Erro de conexão:', error);
});

client.login(config.token)
  .then(() => console.log('✅ Login realizado com sucesso!'))
  .catch(error => console.error('❌ Erro ao fazer login:', error));