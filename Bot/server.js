const { Client, GatewayIntentBits } = require('discord.js')
const client = new Client({ intents: [GatewayIntentBits.Guilds] })
const config = require('./config.json')
const { createAccount } = require('./api/account')

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return

	if (interaction.commandName === 'account') {
    let username;
    let email;
    let password;
    interaction.options.data.map((x, index) => {
      if (x.name === 'username') {
        username = x.value
      }
      if (x.name === 'email') {
        email = x.value
      }
      if (x.name === 'password') {
        password = x.value
      }
    })
    const data = {
      username: username,
      email: email,
      password: password
    }
    createAccount(data)
    .then((res) => {
      if (res.status === 400) {
        interaction.reply({ content: "Le nom d'utilisateur que vous avez choisi est déjà utilisé ! [❌]", ephemeral: true })
      } else if (res.status === 401) {
        interaction.reply({ content: "L'adresse email que vous avez choisie est déjà utilisée ! [❌]", ephemeral: true })
      } else if (res.status === 402) {
        interaction.reply({ content: "Le format de l'adresse email n'est pas valide ! [❌]", ephemeral: true  })
      } else if (res.status === 403) {
        interaction.reply({ content: "Le mot de passe doit comporter au moins 8 caractères ! [❌]", ephemeral: true  })
      } else if (res.status === 200) {
        interaction.reply({ content: "Bravo **" + username + "** !\nLa création de votre compte est terminé avec succès [✅]", ephemeral: true  })
      }
    })
	}
})

client.login(config.token)