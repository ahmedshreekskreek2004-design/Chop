
import test from "node:test";
import assert from "node:assert/strict";

import {
  calcularMetriques,
  validarProducte,
  afegirProducte,
  editarProducte,
  eliminarProducte,
  cercarUltimPerCategoria,
  ordenarProductes,
  filtrarProductes
} from "../js/tasca.js";

const productesInicials = [
  { id: 1, nom: "Portàtil Pro", categoria: "Electrònica", preu: 950, stock: 4 },
  { id: 2, nom: "Camiseta cotó", categoria: "Roba", preu: 18, stock: 25 },
  { id: 3, nom: "Auriculars", categoria: "Electrònica", preu: 45, stock: 0 },
  { id: 4, nom: "Llibre JS Avançat", categoria: "Llibres", preu: 32, stock: 12 }
];

test("calcularMetriques: calcula les mètriques correctament", () => {
  const resultat = calcularMetriques(productesInicials);

  assert.equal(resultat.total, 4634);
  assert.equal(resultat.ultim.nom, "Llibre JS Avançat");
  assert.equal(resultat.senseStock, true);
  assert.equal(resultat.preusValids, true);
});

test("calcularMetriques: gestiona una llista buida", () => {
  const resultat = calcularMetriques([]);

  assert.equal(resultat.total, 0);
  assert.equal(resultat.ultim, null);
  assert.equal(resultat.senseStock, false);
  assert.equal(resultat.preusValids, true);
});

test("validarProducte: accepta dades vàlides", () => {
  assert.equal(
    validarProducte({
      nom: "Ratolí",
      categoria: "Electrònica",
      preu: 20,
      stock: 5
    }),
    true
  );
});

test("validarProducte: rebutja preus negatius i stock no enter", () => {
  assert.equal(
    validarProducte({
      nom: "Ratolí",
      categoria: "Electrònica",
      preu: -1,
      stock: 5
    }),
    false
  );

  assert.equal(
    validarProducte({
      nom: "Ratolí",
      categoria: "Electrònica",
      preu: 20,
      stock: 1.5
    }),
    false
  );
});

test("afegirProducte: crea un producte amb un nou ID", () => {
  const resultat = afegirProducte(productesInicials, {
    nom: "Ratolí",
    categoria: "Electrònica",
    preu: 20,
    stock: 5
  });

  assert.equal(resultat.length, 5);
  assert.equal(resultat.at(-1).id, 5);
  assert.equal(productesInicials.length, 4);
});

test("editarProducte: actualitza el producte sense modificar l'original", () => {
  const resultat = editarProducte(productesInicials, 2, {
    nom: "Samarreta",
    categoria: "Roba",
    preu: 25,
    stock: 10
  });

  assert.equal(resultat[1].nom, "Samarreta");
  assert.equal(resultat[1].preu, 25);
  assert.equal(productesInicials[1].nom, "Camiseta cotó");
  assert.notEqual(resultat, productesInicials);
});

test("eliminarProducte: elimina el producte indicat", () => {
  const resultat = eliminarProducte(productesInicials, 3);

  assert.equal(resultat.length, 3);
  assert.equal(resultat.some(p => p.id === 3), false);
  assert.equal(productesInicials.length, 4);
});

test("cercarUltimPerCategoria: troba l'últim producte de la categoria", () => {
  const resultat = cercarUltimPerCategoria(
    productesInicials,
    "Electrònica"
  );

  assert.equal(resultat.nom, "Auriculars");
});

test("ordenarProductes: ordena per preu ascendent i descendent", () => {
  const ascendent = ordenarProductes(
    productesInicials,
    "preu",
    true
  );

  const descendent = ordenarProductes(
    productesInicials,
    "preu",
    false
  );

  assert.deepEqual(
    ascendent.map(p => p.preu),
    [18, 32, 45, 950]
  );

  assert.deepEqual(
    descendent.map(p => p.preu),
    [950, 45, 32, 18]
  );

  assert.equal(productesInicials[0].preu, 950);
});

test("ordenarProductes: ordena noms alfabèticament", () => {
  const resultat = ordenarProductes(
    productesInicials,
    "nom"
  );

  assert.equal(resultat[0].nom, "Auriculars");
});

test("filtrarProductes: combina cerca i categoria", () => {
  const resultat = filtrarProductes(
    productesInicials,
    "pro",
    "Electrònica"
  );

  assert.equal(resultat.length, 1);
  assert.equal(resultat[0].nom, "Portàtil Pro");
});

test("filtrarProductes: retorna una llista buida quan no hi ha coincidències", () => {
  const resultat = filtrarProductes(
    productesInicials,
    "inexistent"
  );

  assert.equal(resultat.length, 0);
});
