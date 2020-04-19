var sqlite3 = require('sqlite3').verbose()

const filename = "database.sqlite"

let database = new sqlite3.Database(filename, (connectionError) => {
    if (connectionError) {
        // Cannot open database
        console.error(connectionError.message);
        throw connectionError;
    }
    else {
        console.log('Connected to the SQLite database.')
        database.run(`CREATE TABLE lid (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name text,
            second_name text,
            birth_date text,
            phone_number text,
            email text,
            city text,
            is_jewrut INTEGER
            )`,
            (createTableError) => {
                if (createTableError) {
                    // Table already created
                } else {
                    // Table just created, creating some rows
                    //var insert = 'INSERT INTO lid (name, email, password) VALUES (?,?,?)'
                    //database.run(insert, ["admin", "admin@example.com", md5("admin123456")])
                    //database.run(insert, ["user", "user@example.com", md5("user123456")])
                }
            });
    }
});


module.exports = database