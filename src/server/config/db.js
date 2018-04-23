import Sequelize from 'sequelize';

const db = new Sequelize('test_builder', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres'
});

export { db };
