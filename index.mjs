import fs from 'fs/promises';

const filePath = './Tacks.json';
let ID = 0;

const fileExists = async (filePath) => {
    try {
        await fs.access(filePath);
        return true;
    } catch (err) {
        return false;
    }
};

const readFile = async (filePath) => {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return data;
    } catch (err) {
        console.error(`Error: ${err}`);
        process.exit();
    }
};

const writeFile = async (filePath, data) => {
    try {
        await fs.writeFile(filePath, data, 'utf8');
    } catch (err) {
        console.error(`Error: ${err}`);
        process.exit();
    }
};

// Add a Task
if (process.argv[2] === 'add' && process.argv[3]) {
    const input = process.argv[3];
    if (await fileExists(filePath)) {
        const data = JSON.parse(await readFile(filePath));
        const task = {
            "id": data[data.length - 1]['id'] + 1,
            "description": input,
            "status": "todo",
            "createdAt": new Date(),
            "updatedAt": new Date(),
        };
        data.push(task);
        await writeFile(filePath, JSON.stringify(data));
        console.log(`Task added successfully (ID : ${task.id})`);
    }
    else {
        const task = {
            "id": 1,
            "description": input,
            "status": "todo",
            "createdAt": new Date(),
            "updatedAt": new Date()
        };
        await writeFile(filePath, JSON.stringify([task]));
        console.log(`Task added successfully (ID : ${task.id})`);
    }
}

// Update a Task
if (process.argv[2] === 'update' && process.argv[3] && process.argv[4]) {
    const id = Number(process.argv[3]);
    const edit = process.argv[4];
    if (await fileExists(filePath)) {
        const data = JSON.parse(await readFile(filePath));
        if (!data.some((obj) => obj.id === id)) {
            console.log(`Task with this ID: ${id} is not found!`);
            process.exit();
        }
        data[id - 1]['description'] = edit;
        data[id - 1]['updatedAt'] = new Date();
        await writeFile(filePath, JSON.stringify(data));
        console.log('Task updated successuflly');
    }
}

if (process.argv[2] === 'delete' && process.argv[3]) {
    const id = Number(process.argv[3]);
    if (await fileExists(filePath)) {
        const data = JSON.parse(await readFile(filePath));
        if (!data.some((obj) => obj.id == id)) {
            console.log(`Task with this ID: ${id} is not found!`);
            process.exit();
        }
        const filterdData = data.filter((task) => task.id !== id);
        await writeFile(filePath, JSON.stringify(filterdData));
        console.log(`Taks deleted successfully`);
    }
}

if (process.argv[2] === 'mark-in-progress' && process.argv[3]) {
    const id = Number(process.argv[3]);
    if (await fileExists(filePath)) {
        const data = JSON.parse(await readFile(filePath));
        if (!data.some((obj) => obj.id === id)) {
            console.log(`Task with this ID: ${id} is not found!`);
            process.exit();
        }
        data[id - 1]['status'] = 'in progress';
        data[id - 1]['updatedAt'] = new Date();
        await writeFile(filePath, JSON.stringify(data));
    }
}

if (process.argv[2] === 'mark-done' && process.argv[3]) {
    const id = Number(process.argv[3]);
    if (await fileExists(filePath)) {
        const data = JSON.parse(await readFile(filePath));
        if (!data.some((obj) => obj.id === id)) {
            console.log(`Task with this ID: ${id} is not found!`);
            process.exit();
        }
        data[id - 1]['status'] = 'done';
        data[id - 1]['updatedAt'] = new Date();
        await writeFile(filePath, JSON.stringify(data));
    }
}

if (process.argv[2] === 'list' && !process.argv[3]) {
    if (await fileExists(filePath)) {
        const data = JSON.parse(await readFile(filePath));
        if (!data.length) {
            console.log(`There is no tasks exsits`);
            process.exit();
        }
        data.map((task) => {
            console.log(`${task.description}: ${task.status}`);
        });
    }
}

if (process.argv[2] === 'list' && process.argv[3] === 'done') {
    if (await fileExists(filePath)) {
        const data = JSON.parse(await readFile(filePath));
        if (!data.length) {
            console.log(`There is no tasks exsits`);
            process.exit();
        }
        data.map((task) => {
            if (task.status === 'done')
                console.log(`${task.description}`);
        });
    }
}

if (process.argv[2] === 'list' && process.argv[3] === 'todo') {
    if (await fileExists(filePath)) {
        const data = JSON.parse(await readFile(filePath));
        if (!data.length) {
            console.log(`There is no tasks exsits`);
            process.exit();
        }
        data.map((task) => {
            if (task.status === 'todo')
                console.log(`${task.description}`);
        });
    }
}

if (process.argv[2] === 'list' && process.argv[3] === 'in-progress') {
    if (await fileExists(filePath)) {
        const data = JSON.parse(await readFile(filePath));
        if (!data.length) {
            console.log(`There is no tasks exsits`);
            process.exit();
        }
        data.map((task) => {
            if (task.status === 'in progress')
                console.log(`${task.description}`);
        });
    }
}
