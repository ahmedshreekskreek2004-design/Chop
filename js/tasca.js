
/**
 * src/productes.js
 * Lògica de negoci: sense DOM ni dependències del navegador.
 */

export function calcularMetriques(productes) {
  const total = productes.reduce(
    (acc, p) => acc + p.preu * p.stock,
    0
  );

  const ultim = productes.at(-1) ?? null;

  const senseStock = productes.some(p => p.stock === 0);

  const preusValids = productes.every(p => p.preu > 0);

  return {
    total,
    ultim,
    senseStock,
    preusValids
  };
}

export function validarProducte(dades) {
  return (
    typeof dades.nom === "string" &&
    dades.nom.trim() !== "" &&
    typeof dades.categoria === "string" &&
    dades.categoria.trim() !== "" &&
    Number.isFinite(dades.preu) &&
    dades.preu > 0 &&
    Number.isInteger(dades.stock) &&
    dades.stock >= 0
  );
}

export function afegirProducte(productes, dades) {
  if (!validarProducte(dades)) {
    throw new Error("Les dades del producte no són vàlides.");
  }

  const maxId = productes.length > 0
    ? Math.max(...productes.map(p => p.id))
    : 0;

  const nouProducte = {
    id: maxId + 1,
    nom: dades.nom.trim(),
    categoria: dades.categoria.trim(),
    preu: dades.preu,
    stock: dades.stock
  };

  const resultat = [...productes];
  resultat.push(nouProducte);

  return resultat;
}

export function editarProducte(productes, id, dades) {
  if (!validarProducte(dades)) {
    throw new Error("Les dades del producte no són vàlides.");
  }

  const index = productes.findIndex(p => p.id === id);

  if (index === -1) {
    return productes;
  }

  const producteEditat = {
    id,
    nom: dades.nom.trim(),
    categoria: dades.categoria.trim(),
    preu: dades.preu,
    stock: dades.stock
  };

  return productes.with(index, producteEditat);
}

export function eliminarProducte(productes, id) {
  const index = productes.findIndex(p => p.id === id);

  if (index === -1) {
    return productes;
  }

  return productes.toSpliced(index, 1);
}

export function cercarUltimPerCategoria(productes, categoria) {
  return productes.findLast(p => p.categoria === categoria) ?? null;
}

export function ordenarProductes(productes, columna, ascendent = true) {
  const columnesPermeses = ["nom", "preu", "stock"];

  if (!columnesPermeses.includes(columna)) {
    throw new Error("Columna d'ordenació no vàlida.");
  }

  const ordenats = productes.toSorted((a, b) => {
    if (columna === "nom") {
      return a.nom.localeCompare(b.nom);
    }

    return a[columna] - b[columna];
  });

  return ascendent ? ordenats : ordenats.toReversed();
}

export function filtrarProductes(productes, text = "", categoria = "") {
  const cerca = text.toLowerCase().trim();

  return productes.filter(p => {
    const coincideixNom = p.nom.toLowerCase().includes(cerca);
    const coincideixCategoria =
      !categoria || p.categoria === categoria;

    return coincideixNom && coincideixCategoria;
  });
}
