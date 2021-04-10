const config = require('config')

const logger = require('./src/utils/logger')
const app = require('./src/app')

const port = process.env.PORT || config.get('feedmail.port')

app.listen(port, () => {
    logger.info({ label: 'APP', message: ` ___ ___ ___ ___  __  __   _   ___ _     ` })
    logger.info({ label: 'APP', message: `| __| __| __|   \\|  \\/  | /_\\ |_ _| |    ` })
    logger.info({ label: 'APP', message: `| _|| _|| _|| |) | |\\/| |/ _ \\ | || |__  ` })
    logger.info({ label: 'APP', message: `|_| |___|___|___/|_|  |_/_/ \\_\\___|____| ` })
    logger.info({ label: 'APP', message: `                                         ` })
    logger.info({ label: 'APP', message: `listen on port: ${port}                   ` })
})