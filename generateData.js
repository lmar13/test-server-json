var faker = require('faker');

var database = {
    solutions: [],
    groups: [],
    groupRoles: ["Guest", "Developer", "Master", "Owner"]
};

let table = (columnsNr = 10) => {
    let columns = ['id'];
    for (let i = 1; i <= columnsNr; i++) {
        columns.push(faker.database.column());
    }
    let result = [];
    for (let i = 1; i <= 50; i++) {
        let object = {};
        columns.map(x => {
            if (x === 'id') {
                object[x] = faker.random.number();
            } else {
                object[x] = faker.lorem.word();
            }
        });
        result.push(object);
    }
    return result;
}

for (var i = 1; i <= 100; i++) {
    let group = {
        id: Math.floor((Math.random() * 100) + 1),
        name: 'group_' + faker.random.words()
    };

    database.solutions.push({
        id: i,
        name: 'solution_' + faker.random.words(),
        group: group,
        data: [],
        scheduler: {
            name: faker.random.words(),
            value: faker.random.number()
        },
        files: {
            js: [{
                    fileName: 'process_' + Math.floor((Math.random() * 100) + 1),
                    code: faker.random.words()
                },
                {
                    fileName: 'file_' + Math.floor((Math.random() * 100) + 1),
                    code: faker.random.words()
                },
                {
                    fileName: 'file_' + Math.floor((Math.random() * 100) + 1),
                    code: faker.random.words()
                },
                {
                    fileName: 'file_' + Math.floor((Math.random() * 100) + 1),
                    code: faker.random.words()
                }
            ],
            python: [{
                    fileName: 'file_' + Math.floor((Math.random() * 100) + 1),
                    code: faker.random.words()
                },
                {
                    fileName: 'file_' + Math.floor((Math.random() * 100) + 1),
                    code: faker.random.words()
                },
                {
                    fileName: 'file_' + Math.floor((Math.random() * 100) + 1),
                    code: faker.random.words()
                },
                {
                    fileName: 'file_' + Math.floor((Math.random() * 100) + 1),
                    code: faker.random.words()
                }
            ],
            r: [{
                    fileName: 'file_' + Math.floor((Math.random() * 100) + 1),
                    code: faker.random.words()
                },
                {
                    fileName: 'file_' + Math.floor((Math.random() * 100) + 1),
                    code: faker.random.words()
                },
                {
                    fileName: 'file_' + Math.floor((Math.random() * 100) + 1),
                    code: faker.random.words()
                },
                {
                    fileName: 'file_' + Math.floor((Math.random() * 100) + 1),
                    code: faker.random.words()
                }
            ],
            public: [{
                    fileName: 'file_' + Math.floor((Math.random() * 100) + 1),
                    code: faker.random.words()
                },
                {
                    fileName: 'file_' + Math.floor((Math.random() * 100) + 1),
                    code: faker.random.words()
                },
                {
                    fileName: 'file_' + Math.floor((Math.random() * 100) + 1),
                    code: faker.random.words()
                },
                {
                    fileName: 'file_' + Math.floor((Math.random() * 100) + 1),
                    code: faker.random.words()
                }
            ],
        }
    });

    group.dashboard = [{
            name: 'exe',
            data: table()
        },
        {
            name: 'plan',
            data: table(5)
        },
        {
            name: 'hist',
            data: table(8)
        }
    ];

    database.groups.push(group);
}

for (var i = 1; i <= 10; i++) {

    database.solutions.map(result => {
        result.data.push({
            id: i,
            name: faker.random.words(),
            table: table()
        });
    });
}


console.log(JSON.stringify(database));