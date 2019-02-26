const serverPath = 'http://localhost:9999';

export const getRandomQuestion = async (tag) => {
    let res = await fetch(serverPath + '/question/random?tag=' + tag).then(res => res.json());
    return res;
  }
