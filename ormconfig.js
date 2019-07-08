let config = {
    type: 'sqlite',
    database: 'dorm.db',
    entities: ['**/entities/*{.ts,.js}'],
    synchronize: false,
    logging :true
}
module.exports = config;