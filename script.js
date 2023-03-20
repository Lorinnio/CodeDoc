const celInput = document.querySelector(".cel-input");
const wnioskiInput = document.querySelector(".wnioski-input");
const przebiegInput = document.querySelector(".przebieg-input");

const btn = document.querySelector(".submit-btn");

const modeN = document.querySelector(".mode-n");
const modeNN = document.querySelector(".mode-nn");

modeN.addEventListener("click", function () {
  generate("\n");
});

modeNN.addEventListener("click", function () {
  generate("\n\n");
});
const generate = function (delimiter = "\n") {
  const wnioskiOutput = [];
  wnioskiInput.value.split(delimiter).forEach((el, i) => {
    wnioskiOutput.push(`- ${el}`);
  });

  const wnioskiParagraph = new docx.Paragraph({
    children: wnioskiOutput.map((el) => {
      return new docx.TextRun({
        break: 2,
        text: el,
        size: 24,
        font: "Calibri",
      });
    }),
  });

  const przebiegOutput = [];
  przebiegInput.value.split(delimiter).forEach((el, i) => {
    przebiegOutput.push(`${i + 1}: ${el}`);
  });

  const doc = new docx.Document({
    sections: [
      {
        properties: {},
        children: [
          new docx.Paragraph({
            children: [
              new docx.TextRun({
                text: "Cel Ćwiczenia:",
                bold: true,
                size: 32,
                font: "Calibri",
              }),

              new docx.TextRun({
                break: 2,
                text: `${celInput.value}`,
                italics: true,
                size: 24,
                font: "Calibri",
              }),
              new docx.TextRun({
                break: 2,
                text: "Przebieg Ćwiczenia:",
                bold: true,
                size: 32,
                font: "Calibri",
              }),
              ...przebiegOutput.map((el) => {
                return new docx.TextRun({
                  break: 2,
                  text: el,
                  size: 24,
                  font: "Calibri",
                });
              }),

              new docx.TextRun({
                break: 3,
                text: "Wnioski:",
                bold: true,
                size: 32,
                font: "Calibri",
              }),

              wnioskiParagraph,
            ],
          }),
        ],
      },
    ],
  });
  docx.Packer.toBlob(doc).then((blob) => {
    console.log(blob);
    saveAs(blob, "sprawozdanie.docx");
    console.log("Dokument utworzony pomyślnie");
  });
};
