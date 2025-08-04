import * as fs from 'node:fs';

const verses = JSON.parse(fs.readFileSync('./verses.json', { encoding: 'utf8' }));

let chapters = {};

for (const v in verses) {
  const { testament, book, chapter, verse } = verses[v];
  const chapterId = `${book}-${chapter}`;

  if (!chapters[chapterId]) {
    chapters[chapterId] = {
      testament, book, number: chapter, verses: 0
    }
  }

  chapters[chapterId].verses = Math.max(chapters[chapterId].verses, verse);
}

let json = "{";

for (const chapterID in chapters) {
  const chapter = chapters[chapterID];

  json += `  "${chapterID}": { "testament": "${chapter.testament}", "book": "${chapter.book}", "number": ${chapter.number}, "verses": ${chapter.verses} },\n`
}

json += '}\n';

fs.writeFileSync("./chapters.json", json)