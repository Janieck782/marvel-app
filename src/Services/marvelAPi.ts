import md5 from 'md5';

const publicKey = '1dae9467e2142dbb0bfc341dfdc8e95a';
const privateKey = 'f78aaabf4078918bdb3890034e86da1e4d39170d';
const baseURL = 'https://gateway.marvel.com:443/v1/public';

function generateMarvelAPIAuthParams() {
  const timestamp = Number(new Date());
  const hash = md5(timestamp + privateKey + publicKey);
  
  return {
    apikey: publicKey,
    hash: hash,
    ts: timestamp,
  };
}

export async function fetchCharacters(searchTerm: string = '') {
    const authParams = generateMarvelAPIAuthParams();
    let searchParam = '';
    
    if (searchTerm !== '') {
      searchParam = `&nameStartsWith=${searchTerm}`;
    }
  
    try {
      const response = await fetch(`${baseURL}/characters?apikey=${authParams.apikey}&hash=${authParams.hash}&ts=${authParams.ts}${searchParam}&limit=9`);
      const data = await response.json();
      
      return data.data.results;
    } catch (error) {
      throw error;
    }
  }

export async function fetchCharacterComics(characterId: number) {
  const authParams = generateMarvelAPIAuthParams();

  try {
    const response = await fetch(`${baseURL}/characters/${characterId}/comics?apikey=${authParams.apikey}&hash=${authParams.hash}&ts=${authParams.ts}`);
    const data = await response.json();

    return data.data.results;
  } catch (error) {
    throw error;
  }
}


export async function fetchRandomCharacters(limit: number = 9) {
    const authParams = generateMarvelAPIAuthParams();
    
    try {
      const response = await fetch(`${baseURL}/characters?apikey=${authParams.apikey}&hash=${authParams.hash}&ts=${authParams.ts}&limit=100`);
      const data = await response.json();
  
      // Select `limit` random characters from the results
      const results = data.data.results;
      const randomResults = [];
      for (let i = 0; i < limit; i++) {
        const randomIndex = Math.floor(Math.random() * results.length);
        randomResults.push(results[randomIndex]);
        results.splice(randomIndex, 1);
      }
      
      return randomResults;
    } catch (error) {
      throw error;
    }
  }