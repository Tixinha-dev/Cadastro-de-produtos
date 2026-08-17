import "./styles.css";
// um atributo name, atribuível na instanciação
// um atributo description, atribuível na instanciação
// um atributo price, atribuível na instanciação
// um atributo inStock, inicializado sempre em 0
// um método addToStock, que tem como parâmetro a quantidade a ser adicionada em estoque e deve somar essa quantidade à variável inStock
// um método calculateDiscount, que tem como parâmetro a percentagem de desconto a ser aplicada e retorne o valor do preço com o desconto aplicado


// Entradas do Formulário
// Seleção dos elementos do Formulário (Entradas)
const nomeDoProduto = document.getElementById("nomeDoProduto"); 
const descricao = document.getElementById("descricao"); 
const categoria = document.getElementById("categoria"); 
const marca = document.getElementById("marca"); 
const preco = document.getElementById("preco"); 
const estoque = document.getElementById("estoque"); 
const imagemDoProduto = document.getElementById("imagemDoProduto"); 
const formulario = document.querySelector("form"); 
const botaoSalvar = document.getElementById("salvarProduto"); 

// Seleção dos elementos da Pré-visualização (Saídas/Card) 
const nomeDoProdutoPrevia = document.getElementById("nomeDoProdutoPrevia"); 
const descricaoPrevia = document.getElementById("descricaoPrevia"); 
const categoriaPrevia = document.getElementById("categoriaPrevia"); 
const marcaPrevia = document.getElementById("marcaPrevia"); 
const precoPrevia = document.getElementById("precoPrevia"); 
const estoquePrevia = document.getElementById("estoquePrevia"); 
const imagemDoProdutoPrevia = document.getElementById("imagemDoProdutoPrevia"); 

const imagemPadraoOriginal = imagemDoProdutoPrevia.style.backgroundImage;

const listaDeEntradas = [nomeDoProduto, descricao, categoria, marca, preco, estoque, imagemDoProduto]; 
const listaDeSaidas = [nomeDoProdutoPrevia, descricaoPrevia, categoriaPrevia, marcaPrevia, precoPrevia, estoquePrevia, imagemDoProdutoPrevia]; 

const valoresOriginaisDaPrevia = listaDeSaidas.map((elementHtml) => elementHtml.textContent); 

let descricaoTemporaria = "";


listaDeEntradas.forEach((elementHtml, index) => { 
    const isFile = elementHtml.type === "file"; 
    
    elementHtml.addEventListener(isFile ? "change" : "input", (ev) => { 
        if (isFile) { 
            const file = ev.target.files[0]; 
            if (file) { 
                imagemDoProdutoPrevia.style.backgroundImage = `url(${URL.createObjectURL(file)})`; 
                imagemDoProdutoPrevia.style.backgroundSize = "cover"; 
                imagemDoProdutoPrevia.style.backgroundPosition = "center"; 
            } else { 
                imagemDoProdutoPrevia.style.backgroundImage = imagemPadraoOriginal; 
            } 
        } else { 
            listaDeSaidas[index].textContent = ev.target.value; 
            
            if (ev.target.value === "") { 
                listaDeSaidas[index].textContent = valoresOriginaisDaPrevia[index]; 
            } 
        } 
    }); 
}); 


botaoSalvar.addEventListener("click", (ev) => { 
    ev.preventDefault(); 
    
    const tBody = document.querySelector("tbody");
    const tr = document.createElement("tr"); 
    
    const tdImagem = document.createElement("td"); 
    const tdNome = document.createElement("td"); 
    const tdCategoria = document.createElement("td"); 
    const tdMarca = document.createElement("td"); 
    const tdPreco = document.createElement("td"); 
    const tdEstoque = document.createElement("td"); 
    const tdAcoes = document.createElement("td"); 

    tdImagem.style.backgroundImage = imagemDoProdutoPrevia.style.backgroundImage; 
    
  
    tdImagem.style.width = "60px"; 
    tdImagem.style.height = "60px"; 
    tdImagem.style.backgroundSize = "cover"; 
    tdImagem.style.backgroundPosition = "center"; 
    tdImagem.style.margin = "auto";

    tdNome.textContent = nomeDoProdutoPrevia.textContent; 
    tdCategoria.textContent = categoriaPrevia.textContent; 
    tdMarca.textContent = marcaPrevia.textContent; 
    tdPreco.textContent = precoPrevia.textContent; 
    tdEstoque.textContent = estoquePrevia.textContent; 

    tr.dataset.descricao = descricao.value || descricaoPrevia.textContent;

    const containerBotoes = document.createElement("div");
    containerBotoes.style.display = "flex";
    containerBotoes.style.gap = "8px";
    containerBotoes.style.justifyContent = "center";

    const botaoEditar = document.createElement("button");
    botaoEditar.textContent = "Editar";
    botaoEditar.style.backgroundColor = "#ffc107";
    botaoEditar.style.color = "#212529";
    botaoEditar.style.border = "none";
    botaoEditar.style.padding = "6px 12px";
    botaoEditar.style.cursor = "pointer";
    botaoEditar.style.borderRadius = "4px";
    botaoEditar.style.fontWeight = "bold";
    
    botaoEditar.addEventListener("click", () => {
        nomeDoProduto.value = tdNome.textContent;
        descricao.value = tr.dataset.descricao;
        categoria.value = tdCategoria.textContent === "-" ? "" : tdCategoria.textContent;
        marca.value = tdMarca.textContent === "-" ? "" : tdMarca.textContent;
        preco.value = tdPreco.textContent === "R$ 0,00" ? "" : tdPreco.textContent;
        estoque.value = tdEstoque.textContent === "-" ? "" : tdEstoque.textContent;

        nomeDoProdutoPrevia.textContent = tdNome.textContent;
        descricaoPrevia.textContent = tr.dataset.descricao;
        categoriaPrevia.textContent = tdCategoria.textContent;
        marcaPrevia.textContent = tdMarca.textContent;
        precoPrevia.textContent = tdPreco.textContent;
        estoquePrevia.textContent = tdEstoque.textContent;
        imagemDoProdutoPrevia.style.backgroundImage = tdImagem.style.backgroundImage;

        tr.remove();
    });

    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "Excluir";
    botaoExcluir.style.backgroundColor = "#dc3545";
    botaoExcluir.style.color = "white";
    botaoExcluir.style.border = "none";
    botaoExcluir.style.padding = "6px 12px";
    botaoExcluir.style.cursor = "pointer";
    botaoExcluir.style.borderRadius = "4px";
    
    botaoExcluir.addEventListener("click", () => {
        tr.remove(); 
    });

    containerBotoes.appendChild(botaoEditar);
    containerBotoes.appendChild(botaoExcluir);
    tdAcoes.appendChild(containerBotoes);

    tr.appendChild(tdImagem); 
    tr.appendChild(tdNome); 
    tr.appendChild(tdCategoria); 
    tr.appendChild(tdMarca); 
    tr.appendChild(tdPreco); 
    tr.appendChild(tdEstoque); 
    tr.appendChild(tdAcoes); 
    
    tBody.appendChild(tr); 

    listaDeEntradas.forEach((elementHtml, index) => { 
        if (elementHtml.type === "file") { 
            elementHtml.value = ""; 
            imagemDoProdutoPrevia.style.backgroundImage = imagemPadraoOriginal;
        } else { 
            elementHtml.value = ""; 
            listaDeSaidas[index].textContent = valoresOriginaisDaPrevia[index]; 
        } 
    }); 
});
