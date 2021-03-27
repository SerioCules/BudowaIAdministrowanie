/* eslint-disable quotes */
/* eslint-disable no-useless-escape */

const express = require('express')
const path = require('path')

const config = require('config')
const bodyParser = require('body-parser')

const logger = require('./src/utils/logger')
const RssParser = require('./src/utils/rssparser')
const MailBuilder = require('./src/utils/mailbuilder')
const Sender = require('./src/utils/sender')

const Database = require('./src/storage/database')

const UserController = require('./src/controllers/usercontroller')
const MailController = require('./src/controllers/mailcontroller')

const userRoutes = require('./src/routes/userroutes')
const mailRoutes = require('./src/routes/mailroutes')

const dbConfig = config.get('feedmail.db')
const db = new Database(dbConfig)

const userController = new UserController(db)
const mailController = new MailController(db, new RssParser(), new MailBuilder(), new Sender())

const port = process.env.PORT || 8080
const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())

app.use('/v1', userRoutes(userController))
app.use('/v1', mailRoutes(mailController))

logger.info({ label: 'APP', message: ` ___ ___ ___ ___  __  __   _   ___ _     ` })
logger.info({ label: 'APP', message: `| __| __| __|   \\|  \\/  | /_\\ |_ _| |    ` })
logger.info({ label: 'APP', message: `| _|| _|| _|| |) | |\\/| |/ _ \\ | || |__  ` })
logger.info({ label: 'APP', message: `|_| |___|___|___/|_|  |_/_/ \\_\\___|____| ` })
logger.info({ label: 'APP', message: `                                         ` })

app.listen(port)