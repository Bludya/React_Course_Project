const serverPath = 'http://localhost:9999';

export const getRandomQuestion = async () => {
    let res = await fetch(serverPath + '/question/random').then(res => res.json());
    return res;
  }
