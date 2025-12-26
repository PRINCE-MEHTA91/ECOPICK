const fs = require('fs').promises;
const path = require('path');

const usersFilePath = path.join(__dirname, '..', 'users.json');

async function getUsers() {
    try {
        const usersData = await fs.readFile(usersFilePath, 'utf8');
        return JSON.parse(usersData);
    } catch (error) {
        if (error.code === 'ENOENT') {
            return {};
        }
        console.error('Error reading users file:', error);
        return {};
    }
}

async function saveUsers(users) {
    try {
        await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
    } catch (error) {
        console.error('Error writing users file:', error);
    }
}

module.exports = {
    getUsers,
    saveUsers
};
