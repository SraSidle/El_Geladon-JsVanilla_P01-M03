const baseUrl = "https://el-geladon-backend-by-ip.herokuapp.com/paletas";

async function findAllPaletas() {
  const response = await fetch(`${baseUrl}/find-paletas`); 
  // https://el-geladon-backend-by-ip.herokuapp.com/paletas/find-paletas
  const paletas = await response.json();
// console.log("Response" , response) // => Utilizar essa grafia, e não o template string: ${`Response: ${response}`}

 console.log("paletas:" , paletas) // para facilitar a correção, este console.log, está presente

  paletas.map((paleta) => {
    return document.getElementById("paletaList").insertAdjacentHTML(
      "beforeend",
      `
      <div class="PaletaListaItem" id="PaletaListaItem_'${paleta.id}'">
        <div>
          <div class="PaletaListaItem">
            <div>
              <div class="PaletaListaItem__sabor">${paleta.sabor}</div>
              <div class="PaletaListaItem__preco">R$ ${paleta.preco}</div>
              <div class="PaletaListaItem__descricao">${paleta.descricao}</div>
              <div class="PaletaListaItem__acoes Acoes">
                <button
                  class="Acoes__editar"
                  onclick="editPaleta('${paleta._id}')"
                >
                  editar
                </button>
                <button
                  class="Acoes__deletar"
                  onclick="deletePaleta('${paleta._id}')"
                >
                  deletar
                </button>
              </div>
            </div>
            <img
              class="PaletaListaItem__foto"
              src="${paleta.foto}"
              alt="${`Paleta"
              de
              ${paleta.sabor}`}
            />
          </div>
        </div>
      </div>
      `
    );
  });
}

findAllPaletas();

async function findPaletaById() {
  const id = document.getElementById("idPaleta").value;
  const response = await fetch(`${baseUrl}/find-paleta/${id}`); //Apesar de ser string, o id entre aspas dá undefined
  const paleta = await response.json();

  const paletaEscolhidaDiv = document.getElementById("paletaEscolhida");

  paletaEscolhidaDiv.innerHTML = `<div class="PaletaListaItem">
      <div>
        <div class="PaletaListaItem__sabor">${paleta.sabor}</div>
        <div class="PaletaListaItem__preco">R$ ${paleta.preco}</div>
        <div class="PaletaListaItem__descricao">${paleta.descricao}</div>
      </div>
        <img
          class="PaletaListaItem__foto"
          src=${
           paleta.foto
         }
        alt=${`Paleta de ${paleta.sabor}`} />
    </div>`;
}

function abrirModalCadastro() {
  document.querySelector(".modal-overlay").style.display = "flex";
}

function fecharModalCadastro() {
  document.querySelector(".modal-overlay").style.display = "none";
  document.querySelector("#sabor").value = "";
  document.querySelector("#preco").value = 0;
  document.querySelector("#descricao").value = "";
  document.querySelector("#foto").value = "";
}

async function createPaleta() {
  const sabor = document.querySelector("#sabor").value;
  const preco = document.querySelector("#preco").value;
  const descricao = document.querySelector("#descricao").value;
  const foto = document.querySelector("#foto").value;

  const paleta = {
    id,
    sabor,
    preco,
    descricao,
    foto,
  };

  const submitPaleta = async () => {
    const sabor = document.getElementById("sabor").value;
    const descricao = document.getElementById("descricao").value;
    const foto = document.getElementById("foto").value;
    const preco = +document.getElementById("preco").value;

    const paleta = {
      sabor: sabor,
      descricao: descricao,
      foto: foto,
      preco: preco,
    };

    const response = await fetch(baseUrl + "/create", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(paleta),
    });

    const novaPaleta = await response.json();

    const html = `<div class="PaletaListaItem" id="PaletaListaItem_'${
      novaPaleta._id
    }'">
    
        <div class="PaletaListaItem__sabor"> ${novaPaleta.sabor}</div>
        <div class="PaletaListaItem__preco">R$ ${novaPaleta.preco.toFixed(
          2
        )}</div>
        <div class="PaletaListaItem__descricao">${novaPaleta.descricao}</div>
  
        <div class="PaletaListaItem__acoes Acoes">
          <button class="Acoes__editar" onclick="editPaleta('${
            novaPaleta._id
          }')">editar</button>
          <button class="Acoes__deletar" onclick="deletePaleta('${
            novaPaleta._id
          }')">deletar</button>
        </div>
    
      </div>
        <img class="PaletaListaItem__foto" src=${
          novaPaleta.foto
        } alt='${`Paleta de ${novaPaleta.sabor}`}' />
    </div>`;

    document.getElementById("paletaList").insertAdjacentHTML("beforeend", html);

    fecharModalCadastro();
  };

  const modoEdicaoAtivado = id > 0;

  const endpoint = baseUrl + (modoEdicaoAtivado ? `/update/${id}` : "/create");

  const response = await fetch(endpoint, {
    method: modoEdicaoAtivado ? "put" : "post",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify(paleta),
  });

  const novaPaleta = await response.json();

  const html = `<div class="PaletaListaItem" id="PaletaListaItem_${
    novaPaleta._id
  }">
    <div>
      <div class="PaletaListaItem__sabor">${novaPaleta.sabor}</div>
      <div class="PaletaListaItem__preco">R$ ${novaPaleta.preco.toFixed(
        2
      )}</div>
      <div class="PaletaListaItem__descricao">${novaPaleta.descricao}</div>
      <div class="PaletaListaItem__acoes Acoes">
      <button class="Acoes__editar" onclick="editPaleta('${
        novaPaleta._id
      }')">editar</button>
      <button class="Acoes__deletar" onclick="deletePaleta('${
        novaPaleta._id
      }')">deletar</button>
    </div>
    </div>
      <img class="PaletaListaItem__foto" src=${
        novaPaleta.foto
      } alt=${`Paleta de ${novaPaleta.sabor}`} />
    </div>`;

  if (modoEdicaoAtivado) {
    document.getElementById(`PaletaListaItem_${id}`).outerHTML = html;
  } else {
    document.getElementById("paletaList").insertAdjacentHTML("beforeend", html);
  }
  document.getElementById("id").value = "";
  fecharModalCadastro();
}

async function editPaleta(id){
  const response = await fetch(`${baseUrl}/find-paleta/${id}`);

  const paleta = await response.json();

  document.getElementById("id").value = paleta.id;
  document.getElementById("sabor").value = paleta.sabor;
  document.getElementById("descricao").value = paleta.descricao;
  document.getElementById("foto").value = paleta.foto;
  document.getElementById("preco").value = paleta.preco;
};

async function deletePaleta(id){
  const response = await fetch(`${baseUrl}/delete/${id}`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
  });
  const result = await response.json();
  alert(result.message);
  document.getElementById("paletaList").innerHTML = "";
  findAllPaletas();
};
