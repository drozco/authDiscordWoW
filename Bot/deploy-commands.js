const { REST, SlashCommandBuilder, Routes } = require('discord.js')
const { clientId, token } = require('./config.json')

const commands = [
    new SlashCommandBuilder().setName('account').setDescription("authDiscord").addStringOption(option => option.setName('username').setDescription("Votre nom d'utilisateur").setRequired(true)).addStringOption(option => option.setName('email').setDescription("Votre adresse email").setRequired(true)).addStringOption(option => option.setName('password').setDescription("Votre mot de passe").setRequired(true))
    ,
]
    .map(command => command.toJSON())

const rest = new REST({ version: '10' }).setToken(token)

rest.put(Routes.applicationCommands(clientId), { body: commands })
    .then((data) => console.log(`Successfully registered ${data.length} application commands.`))
    .catch(console.error)