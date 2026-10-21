
import {
  calcularMetriques,
  afegirProducte,
  editarProducte,
  eliminarProducte as eliminarProducteLogic,
  cercarUltimPerCategoria,
  ordenarProductes,
  filtrarProductes
} from "./tasca.js";
// Estat de l'aplicació
let productes = [
  { id: 1, nom: "Portàtil Pro", categoria: "Electrònica", preu: 950, stock: 4 },
  { id: 2, nom: "Camiseta cotó", categoria: "Roba", preu: 18, stock: 25 },
  { id: 3, nom: "Auriculars", categoria: "Electrònica", preu: 45, stock: 0},
  { id: 4, nom: "Llibre JS Avançat", categoria: "Llibres", preu: 32, stock: 12 }
];

let estatOrdenacio = { columna: null, ascendent: true };

function actualitzarDashboard() {
  console.log("Dashboard carregat");
  actualitzarMetriques();
  aplicarFiltres();
  mostrarProductes(productes);
}

function mostrarProductes(llista) {
  const tbody = document.getElementById("taula-productes");
  tbody.innerHTML = "";

  llista.forEach(prod => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${prod.id}</td>
      <td><strong>${prod.nom}</strong></td>
      <td>${prod.categoria}</td>
      <td>${prod.preu.toFixed(2)} €</td>
      <td>${prod.stock}</td>
      <td>
        <button class="btn btn-sm btn-edit"
          onclick="carregarPerEditar(${prod.id})">Editar</button>
        <button class="btn btn-sm btn-delete"
          onclick="eliminarProducte(${prod.id})">Eliminar</button>
      </td>
    `;

    tbody.appendChild(tr);
  });
}

function actualitzarMetriques() {
  const {
    total,
    ultim,
    senseStock,
    preusValids
  } = calcularMetriques(productes);

  document.getElementById("val-total").innerText =
    `${total.toFixed(2)} €`;

  document.getElementById("val-ultim").innerText =
    ultim ? ultim.nom : "-";

  document.getElementById("val-sense-stock").innerText =
    senseStock ? "⚠️ Manca stock" : "✅ Ok";

  document.getElementById("val-preu-valid").innerText =
    preusValids ? "✅ Correcte" : "❌ Error";
}

document.getElementById("form-producte").addEventListener("submit", e => {
  e.preventDefault();

  const editId = document.getElementById("edit-id").value;

  const dades = {
    nom: document.getElementById("nom").value,
    categoria: document.getElementById("categoria").value,
    preu: Number(document.getElementById("preu").value),
    stock: Number(document.getElementById("stock").value)
  };

  try {
    if (editId !== "") {
      productes = editarProducte(productes, Number(editId), dades);
    } else {
      productes = afegirProducte(productes, dades);
    }

    netejarFormulari();
    actualitzarDashboard();
  } catch (error) {
    alert(error.message);
  }
});

function eliminarProducte(id) {
  productes = eliminarProducteLogic(productes, id);
  actualitzarDashboard();
}

document.getElementById("btn-cerca-last").addEventListener("click", () => {
  const categoria = document.getElementById("cerca-cat-last").value;
  const ultim = cercarUltimPerCategoria(productes, categoria);

  if (ultim) {
    alert(`Darrer producte trobat de ${categoria}: ${ultim.nom} (${ultim.preu}€)`);
  } else {
    alert(`No hi ha cap producte de la categoria ${categoria}`);
  }
});

document.querySelectorAll(".sortable").forEach(th => {
  th.addEventListener("click", () => {
    const columna = th.dataset.sort;

    if (estatOrdenacio.columna === columna) {
      estatOrdenacio.ascendent = !estatOrdenacio.ascendent;
    } else {
      estatOrdenacio.columna = columna;
      estatOrdenacio.ascendent = true;
    }

    mostrarProductes(
      ordenarProductes(
        productes,
        columna,
        estatOrdenacio.ascendent
      )
    );
  });
});

document.getElementById("input-cerca").addEventListener("input", aplicarFiltres);
document.getElementById("filtre-categoria").addEventListener("change", aplicarFiltres);

function aplicarFiltres() {
  const text = document.getElementById("input-cerca").value;
  const categoria = document.getElementById("filtre-categoria").value;
  mostrarProductes(filtrarProductes(productes, text, categoria));
    console.log("ahmed");


}

function carregarPerEditar(id) {
  const prod = productes.find(p => p.id === id);
  if (!prod) return;

  document.getElementById("edit-id").value = prod.id;
  document.getElementById("nom").value = prod.nom;
  document.getElementById("categoria").value = prod.categoria;
  document.getElementById("preu").value = prod.preu;
  document.getElementById("stock").value = prod.stock;

  document.getElementById("form-title").innerText = "✏️ Editar Producte";
  document.getElementById("btn-submit").innerText = "Actualitzar (with)";
  document.getElementById("btn-cancel").style.display = "block";
}

document.getElementById("btn-cancel").addEventListener("click", netejarFormulari);

function netejarFormulari() {
  document.getElementById("form-producte").reset();
  document.getElementById("edit-id").value = "";
  document.getElementById("form-title").innerText = "➕ Afegir Producte";
  document.getElementById("btn-submit").innerText = "Guardar (push / with)";
  document.getElementById("btn-cancel").style.display = "none";
}

// Funcions utilitzades pels botons inline de la taula
window.carregarPerEditar = carregarPerEditar;
window.eliminarProducte = eliminarProducte;

// Inicialització
actualitzarDashboard();
