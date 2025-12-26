
const fs = require('fs').promises;
const path = require('path');

const usersFilePath = path.join(__dirname, 'users.json');

function generateProfileId(phoneNumber) {
    return "user_" + phoneNumber.slice(-4) + Date.now().toString(36).slice(-4);
}

async function updateIds() {
    try {
        const usersData = await fs.readFile(usersFilePath, 'utf8');
        const users = JSON.parse(usersData);
        const newUsers = {};

        for (const key in users) {
            const user = users[key];
            const newProfileId = generateProfileId(user.phoneNumber);
            user.profileId = newProfileId;
            newUsers[newProfileId] = user;
        }

        await fs.writeFile(usersFilePath, JSON.stringify(newUsers, null, 2), 'utf8');
        console.log('Successfully updated profile IDs in users.json');
    } catch (error) {
        console.error('Error updating profile IDs:', error);
    }
}

updateIds();
