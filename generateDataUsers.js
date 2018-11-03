var faker = require('faker');

var database = {
    users: [{
        id: i,
        name: 'AdminName',
        surname: 'AdminSurname',
        email: 'admin@example.com',
        systemRole: 'Admin',
        userGroup: [...Array(101).keys()],
        userRoleInGroup: 2,
        login: {
            username: 'admin',
            password: 'asd'
        }
    }]
};



for (var i = 1; i <= 20; i++) {

    database.users.push({
        id: i,
        name: faker.name.firstName(),
        surname: faker.name.lastName(),
        email: faker.internet.exampleEmail(),
        systemRole: 'User',
        userGroup: [faker.random.number({ max: 100 })],
        userRoleInGroup: faker.random.number({ max: 4 }),
        login: {
            username: faker.internet.userName(),
            password: faker.internet.password()
        }
    });
}


console.log(JSON.stringify(database));