const user = process.env.MYSQL_USERNAME;
const password = process.env.MYSQL_PASSWORD;
const database = process.env.DB;


const config = {
    db: {
        host: "localhost",
        user: user,
        password: password,
        database: database
    }
}

module.exports = config;