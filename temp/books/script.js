import * as fs from 'node:fs';

const chapters = JSON.parse(fs.readFileSync('./chapters.json', { encoding: 'utf8' }));

const bookIds = [

  // The Old Testament of the King James Version of the Bible
  "genesis",
  "exodus",
  "leviticus",
  "numbers",
  "deuteronomy",
  "joshua",
  "judges",
  "ruth",
  "samuel1",
  "samuel2",
  "kings1",
  "kings2",
  "chronicles1",
  "chronicles2",
  "ezra",
  "nehemiah",
  "esther",
  "job",
  "psalms",
  "proverbs",
  "ecclesiastes",
  "songOfSolomon",
  "isaiah",
  "jeremiah",
  "lamentations",
  "ezekiel",
  "daniel",
  "hosea",
  "joel",
  "amos",
  "obadiah",
  "jonah",
  "micah",
  "nahum",
  "habakkuk",
  "zephaniah",
  "haggai",
  "zechariah",
  "malachi",

  // The New Testament of the King James Bible
  "matthew",
  "mark",
  "luke",
  "john",
  "acts",
  "romans",
  "corinthians1",
  "corinthians2",
  "galatians",
  "ephesians",
  "philippians",
  "colossians",
  "thessalonians1",
  "thessalonians2",
  "timothy1",
  "timothy2",
  "titus",
  "philemon",
  "hebrews",
  "james",
  "peter1",
  "peter2",
  "john1",
  "john2",
  "john3",
  "jude",
  "revelation"
];

const bookTitles = [

  // The Old Testament of the King James Version of the Bible
  "The First Book of Moses: Called Genesis",
  "The Second Book of Moses: Called Exodus",
  "The Third Book of Moses: Called Leviticus",
  "The Fourth Book of Moses: Called Numbers",
  "The Fifth Book of Moses: Called Deuteronomy",
  "The Book of Joshua",
  "The Book of Judges",
  "The Book of Ruth",
  "The First Book of Samuel",
  "The Second Book of Samuel",
  "The First Book of the Kings",
  "The Second Book of the Kings",
  "The First Book of the Chronicles",
  "The Second Book of the Chronicles",
  "Ezra",
  "The Book of Nehemiah",
  "The Book of Esther",
  "The Book of Job",
  "The Book of Psalms",
  "The Proverbs",
  "Ecclesiastes",
  "The Song of Solomon",
  "The Book of the Prophet Isaiah",
  "The Book of the Prophet Jeremiah",
  "The Lamentations of Jeremiah",
  "The Book of the Prophet Ezekiel",
  "The Book of Daniel",
  "Hosea",
  "Joel",
  "Amos",
  "Obadiah",
  "Jonah",
  "Micah",
  "Nahum",
  "Habakkuk",
  "Zephaniah",
  "Haggai",
  "Zechariah",
  "Malachi",

  // The New Testament of the King James Bible
  "The Gospel According to Saint Matthew",
  "The Gospel According to Saint Mark",
  "The Gospel According to Saint Luke",
  "The Gospel According to Saint John",
  "The Acts of the Apostles",
  "The Epistle of Paul the Apostle to the Romans",
  "The First Epistle of Paul the Apostle to the Corinthians",
  "The Second Epistle of Paul the Apostle to the Corinthians",
  "The Epistle of Paul the Apostle to the Galatians",
  "The Epistle of Paul the Apostle to the Ephesians",
  "The Epistle of Paul the Apostle to the Philippians",
  "The Epistle of Paul the Apostle to the Colossians",
  "The First Epistle of Paul the Apostle to the Thessalonians",
  "The Second Epistle of Paul the Apostle to the Thessalonians",
  "The First Epistle of Paul the Apostle to Timothy",
  "The Second Epistle of Paul the Apostle to Timothy",
  "The Epistle of Paul the Apostle to Titus",
  "The Epistle of Paul the Apostle to Philemon",
  "The Epistle of Paul the Apostle to the Hebrews",
  "The General Epistle of James",
  "The First Epistle General of Peter",
  "The Second General Epistle of Peter",
  "The First Epistle General of John",
  "The Second Epistle General of John",
  "The Third Epistle General of John",
  "The General Epistle of Jude",
  "The Revelation of Saint John the Divine"
];

let books = {};

for (const c in chapters) {
  const { testament, book, number, verses } = chapters[c];

  if (!books[book]) {
    books[book] = {
      title: bookTitles[bookIds.indexOf(book)], id: book, testament, chapters: 0, verses: 0
    }
  }

  books[book].chapters = Math.max(books[book].chapters, number);
  books[book].verses += verses;
}

console.log(books);

let json = "{";

for (const bookID in books) {
  const book = books[bookID];

  json += `  "${bookID}": { "id": "${book.id}", "title": "${book.title}", "titleAlts": [], "testament": "${book.testament}", "chapters": ${book.chapters}, "verses": ${book.verses} },\n`
}

json += '}\n';

fs.writeFileSync("./books.json", json)