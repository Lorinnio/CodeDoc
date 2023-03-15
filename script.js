const celTxt = document.querySelector(".cel-input");
const wnioskiTxt = document.querySelector(".wnioski-input");
const przebiegTxt = document.querySelector(".przebieg-input");
const btn = document.querySelector(".submit-btn");

const mode1 = document.querySelector(".mode1");
const mode2 = document.querySelector(".mode2");

mode1.addEventListener("click", function () {
  generate("\n");
});

mode2.addEventListener("click", function () {
  generate("\n\n");
});
function generate(delimiter = "\n") {
  const wnioskiTxtt = [];
  wnioskiTxt.value.split(delimiter).forEach((el, i) => {
    wnioskiTxtt.push(`- ${el}`);
  });

  const wnioskiParagraph = new docx.Paragraph({
    children: wnioskiTxtt.map((el) => {
      return new docx.TextRun({
        break: 2,
        text: el,
        size: 24,
        font: "Arial",
      });
    }),
  });

  const przebiegTxtt = [];
  przebiegTxt.value.split(delimiter).forEach((el, i) => {
    przebiegTxtt.push(`${i + 1}: ${el}`);
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
                font: "Arial",
              }),

              new docx.TextRun({
                break: 2,
                text: `${celTxt.value}`,
                italics: true,
                size: 24,
                font: "Arial",
              }),
              new docx.TextRun({
                break: 2,
                text: "Przebieg Ćwiczenia:",
                bold: true,
                size: 32,
                font: "Arial",
              }),
              ...przebiegTxtt.map((el) => {
                return new docx.TextRun({
                  break: 2,
                  text: el,
                  size: 24,
                  font: "Arial",
                });
              }),

              new docx.TextRun({
                break: 3,
                text: "Wnioski:",
                bold: true,
                size: 32,
                font: "Arial",
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
    console.log("Document created successfully");
  });
}
