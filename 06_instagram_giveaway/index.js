import fs from 'fs';


function uniqueValues() {
  const uniqueUsernames = new Set();
  for (let fileNum = 0; fileNum < 20; fileNum++) {
    const filePath = `2kk_words_400x400/out${fileNum}.txt`; 
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const wordCombinations = fileContent.split('-');
    wordCombinations.forEach((username) => uniqueUsernames.add(username));
  }
  return uniqueUsernames.size;
}

function existInAllFiles() {
    const commonUsernames = new Set();
    for (let fileNum = 0; fileNum < 20; fileNum++) {
      const filePath = `2kk_words_400x400/out${fileNum}.txt`; 
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const wordCombinations = fileContent.split('-');
      
      if (fileNum === 0) {
        wordCombinations.forEach((username) => commonUsernames.add(username));
      } else {
        const tempUsernames = new Set(wordCombinations);
        commonUsernames.forEach((username) => {
          if (!tempUsernames.has(username)) {
            commonUsernames.delete(username);
          }
        });
      }
    }
    return commonUsernames.size;
  }
  

function existInAtleastTen() {
  const usernameCounts = new Map();
  for (let fileNum = 0; fileNum < 20; fileNum++) {
    const filePath = `2kk_words_400x400/out${fileNum}.txt`; 
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const wordCombinations = fileContent.split('-');
    const uniqueUsernames = new Set(wordCombinations);
    uniqueUsernames.forEach((username) => {
      if (!usernameCounts.has(username)) {
        usernameCounts.set(username, 1);
      } else {
        usernameCounts.set(username, usernameCounts.get(username) + 1);
      }
    });
  }
  let count = 0;
  usernameCounts.forEach((occurrence) => {
    if (occurrence >= 10) {
      count++;
    }
  });
  return count;
}


console.time('Execution time');
console.log(uniqueValues());     
console.log(existInAllFiles());   
console.log(existInAtleastTen()); 
console.timeEnd('Execution time');