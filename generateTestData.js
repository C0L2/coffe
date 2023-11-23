const fs = require('fs');

const generateTestData = (numUsers) => {
  const users = [];

  for (let i = 1; i <= numUsers; i++) {
    users.push({
      nickname: `user${i}`,
    });
  }

  return users;
};

const testData = generateTestData(150);
fs.writeFileSync('testData.json', JSON.stringify(testData, null, 2));

console.log('Test data generated and saved to testData.json');
