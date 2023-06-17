import inquirer from "inquirer";
import fs from 'fs';

const databaseFilePath = 'database.txt';

function readDatabaseFile() {
    try {
        const data = fs.readFileSync(databaseFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading file:', error);
        return [];
    }
}

function writeDatabaseFile(data) {
    fs.writeFileSync(databaseFilePath, JSON.stringify(data), 'utf8');
}

const userName = [
    {
        type: 'input',
        name: 'name',
        message: "Enter user's name. Click ENTER to see the list",
    }
];

const userQuestionsList = [
    {
        type: 'list',
        name: 'gender',
        message: "Choose your Gender.",
        choices: [
            'Male',
            'Female'
        ]
    },
    {
        type: 'number',
        name: 'age',
        message: "Enter your age: ",
    },
];

async function addUser() {
    const users = readDatabaseFile();
    let user = {};
    try {
        const nameAnswer = await inquirer.prompt(userName);
        if (nameAnswer.name.trim() === '') {
            await askToSearchUser();
            return;
        } else {
            user.name = nameAnswer.name;
        }
        const userAnswers = await inquirer.prompt(userQuestionsList);
        user.gender = userAnswers.gender;
        user.age = userAnswers.age;
        users.push(user);
        writeDatabaseFile(users);
        console.log('User added successfully');
        await addUser();
    } catch (error) {
        console.error('Error occurred while adding user:', error);
    }
}


async function askToSearchUser() {
    try {
        const showDBAnswer = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'showDB',
                message: 'Would you like to search values in DB?',
            },
        ]);
        if (showDBAnswer.showDB) {
            console.log(readDatabaseFile());
            await searchUser();
        } else {
            console.log('Exiting the program...');
        }
    } catch (error) {
        console.error('Error occurred while asking to search user:', error);
    }
}

async function searchUser() {
    const users = readDatabaseFile();
    try {
        const searchAnswer = await inquirer.prompt([
            {
                type: 'input',
                name: 'searchName',
                message: 'Enter the name to search in the database:',
            },
        ]);
        const searchName = searchAnswer.searchName.toLowerCase();
        const foundUsers = users.filter((user) => user.name.toLowerCase().includes(searchName));
        if (foundUsers.length > 0) {
            console.log('Users found in the database:');
            foundUsers.forEach((user) => {
                console.log('---------------------');
                console.log(`Name: ${user.name}`);
                console.log(`Gender: ${user.gender}`);
                console.log(`Age: ${user.age}`);
                console.log('---------------------');
            });
        } else {
            console.log('User not found in the database.');
        }
    } catch (error) {
        console.error('Error occurred while searching user:', error);
    }
}

addUser();
