import * as fs from 'node:fs';

const books = JSON.parse(fs.readFileSync('./books.json', { encoding: 'utf8' }));

let testaments = {};

for (const b in books) {
  const { testament, id, verses } = books[b];

  if (!testaments[testament]) {
    testaments[testament] = {
      title: "testament_name", id: testament, books: 0, verses: 0, bookList: []
    }
  }

  testaments[testament].verses += verses;
  testaments[testament].books++;
  testaments[testament].bookList.push(id)
}

console.log(testaments);
