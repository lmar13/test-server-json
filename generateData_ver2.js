var faker = require('faker');

const table = (columnsNr = 10) => {
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
};

var database = {
    solutions: [],
    groups: [],
    groupRoles: ["Guest", "Developer", "Master", "Owner"],
    schedulers: [],
    files: {},
    dashboards: [],
    tables: [],
    dataForTables1: table(10),
    dataForTables2: table(10),
    dataForTables3: table(10)
};



const code = () => {
    return faker.lorem.paragraph();
};

const cron = () => {
    const tableOfContent = ["*", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const first = tableOfContent[faker.random.number({ min: 0, max: 10 })];
    const second = tableOfContent[faker.random.number({ min: 0, max: 10 })];
    const third = tableOfContent[faker.random.number({ min: 0, max: 10 })];
    const fourth = tableOfContent[faker.random.number({ min: 0, max: 10 })];
    const fifth = tableOfContent[faker.random.number({ min: 0, max: 10 })];
    const sixth = tableOfContent[faker.random.number({ min: 0, max: 10 })];

    return `${first} ${second} ${third} ${fourth} ${fifth} ${sixth}`;
};

const nrSolution = () => {
    let number = faker.random.number({ min: 1, max: 11 });
    let array = [];

    for (let i = 1; i <= number; i++) {
        array.push(faker.random.number({ min: 1, max: 51 }));
    }

    return array;
};

for (let i = 1; i <= 50; i++) {

    database.solutions.push({
        id: i,
        name: 'solution_' + faker.random.word(),
        group: faker.random.number({ min: 1, max: 21 }),
    });
}

for (let i = 1; i <= 20; i++) {

    database.groups.push({
        id: i,
        name: faker.random.words(),
        solutions: nrSolution(),
        owner: faker.internet.userName()
    });

    database.schedulers.push({
        id: i,
        value: cron(),
        solutions: nrSolution()
    });

    database.dashboards.push({
        id: i,
        exe: table(4),
        plan: table(8),
        hist: table(6),
        group: faker.random.number({ min: 1, max: 21 })
    });

    database.tables.push({
        id: i,
        name: 'table_' + faker.random.number({ min: 1, max: 21 }),
        solution: faker.random.number({ min: 1, max: 51 }),
        data: 'dataForTables' + faker.random.number({ min: 1, max: 3 }),
    });
}

database.files = {
    js: [{
            fileName: 'process_' + Math.floor((Math.random() * 100) + 1),
            code: faker.lorem.paragraph()
        },
        {
            fileName: 'file_' + Math.floor((Math.random() * 100) + 1),
            code: faker.lorem.paragraph()
        },
        {
            fileName: 'file_' + Math.floor((Math.random() * 100) + 1),
            code: faker.lorem.paragraph()
        },
        {
            fileName: 'file_' + Math.floor((Math.random() * 100) + 1),
            code: faker.lorem.paragraph()
        }
    ],
    python: [{
            fileName: 'file_' + Math.floor((Math.random() * 100) + 1),
            code: faker.lorem.paragraph()
        },
        {
            fileName: 'file_' + Math.floor((Math.random() * 100) + 1),
            code: faker.lorem.paragraph()
        },
        {
            fileName: 'file_' + Math.floor((Math.random() * 100) + 1),
            code: faker.lorem.paragraph()
        },
        {
            fileName: 'file_' + Math.floor((Math.random() * 100) + 1),
            code: faker.lorem.paragraph()
        }
    ],
    r: [{
            fileName: 'file_' + Math.floor((Math.random() * 100) + 1),
            code: faker.lorem.paragraph()
        },
        {
            fileName: 'file_' + Math.floor((Math.random() * 100) + 1),
            code: faker.lorem.paragraph()
        },
        {
            fileName: 'file_' + Math.floor((Math.random() * 100) + 1),
            code: faker.lorem.paragraph()
        },
        {
            fileName: 'file_' + Math.floor((Math.random() * 100) + 1),
            code: faker.lorem.paragraph()
        }
    ],
    public: [{
            fileName: 'file_' + Math.floor((Math.random() * 100) + 1),
            code: faker.lorem.paragraph()
        },
        {
            fileName: 'file_' + Math.floor((Math.random() * 100) + 1),
            code: faker.lorem.paragraph()
        },
        {
            fileName: 'file_' + Math.floor((Math.random() * 100) + 1),
            code: faker.lorem.paragraph()
        },
        {
            fileName: 'file_' + Math.floor((Math.random() * 100) + 1),
            code: faker.lorem.paragraph()
        }
    ],
};




console.log(JSON.stringify(database));