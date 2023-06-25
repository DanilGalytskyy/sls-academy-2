import fs from 'fs'

fs.readFile('input.json', 'utf-8', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    try {
        const jsonData = JSON.parse(data);
        const userMap = new Map();
        jsonData.forEach((entry) => {
            const userId = entry.user._id;
            const userName = entry.user.name;
            const vacation = {
                startDate: entry.startDate,
                endDate: entry.endDate
            };

            if (userMap.has(userId)) {
                userMap.get(userId).vacations.push(vacation);
            } else {
                userMap.set(userId, {
                    userId,
                    userName,
                    vacations: [vacation]
                });
            }
            const transformedData = Array.from(userMap.values());
            const jsonString = JSON.stringify(transformedData, null, 2); 
            console.log(jsonString);
        });
    } catch (error) {
        console.error(error);
    }
});

