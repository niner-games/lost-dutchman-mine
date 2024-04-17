const prompt = require("prompt-sync")();
const versiony = require("versiony");

const version = prompt("Is it 1) Major 2) Minor 3) Patch? Default is Patch. ");

switch (version) {
  case "1":
    versiony.from("package.json").major().minor(0).patch(0).to();
    break;
  case "2":
    versiony.from("package.json").minor().patch(0).to();
    break;
  default:
    versiony.from("package.json").patch().to();
}
