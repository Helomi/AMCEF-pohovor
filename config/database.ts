import { Options } from 'sequelize'

export const development = {
    url: process.env.DEV_POSTGRESQL_URL,
    options: <Options>{
        minifyAliases: true,
        logging: false,
        pool: {
            max: 4
        }
    }
}
export const production = {
    url: process.env.PROD_POSTGRESQL_URL,
    options: <Options>{
        minifyAliases: true,
        logging: false,
        pool: {
            max: 4
        }
    }
}