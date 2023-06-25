import axios from 'axios'

const endpointNumbers = [793, 955, 231, 931, 93, 342, 770, 491, 281, 718, 310, 806, 469, 258, 516, 79, 706, 521, 350, 64];
const baseEndpoint = 'https://jsonbase.com/sls-team/json-';

const endpoints = endpointNumbers.map(number => `${baseEndpoint}${number}`);


async function queryEndpoints() {
  let trueCount = 0;
  let falseCount = 0;

  for (const endpoint of endpoints) {
    let response;
    let retry = 0;

    while (retry < 3) {
      try {
        response = await axios.get(endpoint);
        break;
      } catch (error) {
        retry++;
        console.error(error);
      }
    }

    if (!response) {
      console.error(`[Fail] ${endpoint}: The endpoint is unavailable`);
      continue;
    }

    const { data } = response;

    if (data && data.isDone !== undefined) {
      console.log(`[Success] ${endpoint}: isDone - ${data.isDone}`);

      if (data.isDone) {
        trueCount++;
      } else {
        falseCount++;
      }
    } else {
      console.error(`[Fail] ${endpoint}: Response format is invalid`);
    }
  }

  console.log(`\nFound True values: ${trueCount}`);
  console.log(`Found False values: ${falseCount}`);
}

queryEndpoints().catch(error => {
  console.error(error);
});
