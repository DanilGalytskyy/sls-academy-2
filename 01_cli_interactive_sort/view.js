import Readline from 'readline';

const readline = Readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

export default async function AskQuestion(sorter) {
    let userInput = '';
    let userNumber = '';
    while (userNumber !== 'exit') {
        userInput = await new Promise((resolve) => {
            readline.question(`Enter 10 words or digits deviding them in spaces: `, resolve);
        });
        if (userInput == 0) {
            userInput = 'man 1323213 Danylo Ukraine orange apple banana 12 55 apple 100 12 one';
        }

        const words = userInput.split(' ');

        if (words.length <= 4) {
            console.log('Please enter at least 5 words or press ENTER for default values.');
            continue;
        }
        console.log(words);
        sorter.setValue(words);

        console.log('1. Words by name (from A to Z).')
        console.log('2. Show digits from the smallest.')
        console.log('3. Show digits from the biggest.')
        console.log('4. Show words by quantity of letters.')
        console.log('5. Only unique words.')

        userNumber = await new Promise((resolve) => {
            readline.question('Select a value: ', resolve);
        });
        switch (userNumber) {
            case '1': {
              console.log(sorter.getSortedWords());
              break;
            }
            case '2': {
              console.log(sorter.getSortedNumbersByAscending());
              break;
            }
            case '3': {
                console.log(sorter.getSortedNumbersByDecreasing());
                break;
              }
            case '4': {
                console.log(sorter.getSortedByLength());
                break;
            }
            case '5': {
                console.log(sorter.getUniqueValues());
                break;
            }
            default:
                console.log('Please enter a number from 1-5 or exit');
        }
    }
    readline.close();
}
