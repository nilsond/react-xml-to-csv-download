import React, { useState } from "react";
import CsvDownload from "react-json-to-csv";
const XMLParser = require("react-xml-parser");

function Main() {
  const [arrayCSV, setArrayCSV] = useState(false);

  function getData(xmlContent) {
    let xmlData = xmlContent.getElementsByTagName("evtAdmissao");
    xmlData = xmlData[0];

    const trabalhador = xmlData.children[2].children;
    const vinculo = xmlData.children[3].children;
    const documentos = trabalhador[9].children;
    const ctps = documentos[0].children;
    let endereco = trabalhador[10].children[0].children;
    endereco = `${endereco[0].value} ${endereco[1].value}, n° ${endereco[2]
      .value}, ${endereco[3].value}, ${endereco[4].value} - ${endereco[7]
      .value} - ${trabalhador[10].children[0].name} - ${endereco[5].value}`;

    const xmlToJson = {
      matricula: vinculo[0].value,
      nome: trabalhador[2].value,
      pis: trabalhador[1].value,
      ctps: `${ctps[0].value} - ${ctps[1].value} - ${ctps[2].value}`,
      codigo_mifare: " - ",
      codigo_de_barras: " - ",
      senha_teclado: " - ",
      cargo: " - ",
      departamento: " - ",
      cnpj: " - ",
      data_admissao: vinculo[4].children[0].children[0].value,
      localizacao: endereco,
      cpf: trabalhador[0].value,
      data_nascimento: trabalhador[8].children[0].value,
      sexo: trabalhador[3].value,
      email: " - "
    };

    return xmlToJson;
  }

  function ConvertFile(event) {
    const files = event.target.files;
    const newArrayCSV = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      const textType = /xml.*/;

      if (file.type.match(textType)) {
        const reader = new FileReader();

        reader.onload = function(e) {
          const xmlText = reader.result;
          const xml = new XMLParser().parseFromString(xmlText); // Assume xmlText contains the example XML
          newArrayCSV.push(getData(xml));
        };

        reader.readAsText(file);
      }
    }

    setArrayCSV(newArrayCSV);
  }

  function setXml(xml) {
    ConvertFile(xml);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h3>Conversor XML</h3>

        <div className={"container-fluid p-4 border w-50"}>
          <h6>Insira seu arquivo .xml</h6>
          <input
            type="file"
            className={"form-control"}
            accept="text/xml"
            onChange={setXml}
            multiple
          />
        </div>
        <div className={"mt-3"}>
          {arrayCSV && <CsvDownload data={arrayCSV} value="dsd" />}
        </div>
      </header>
    </div>
  );
}

export default Main;
