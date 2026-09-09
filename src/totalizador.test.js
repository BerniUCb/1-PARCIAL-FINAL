import { calcular } from "./totalizador.js";

describe("Totalizador", () => {
  it("deberia mostrar la cantidad de producto", () => {
    const resultado = calcular({ cantidad: 20 });
    expect(resultado.cantidad).toEqual(20);
  });

  it("deberia mostrar el precio de producto", () => {
    const resultado = calcular({ cantidad: 20, precio: 3 });
    expect(resultado.precio).toEqual(3);
  });

  it("deberia mostrar el precio neto (cantidad x precio)", () => {
    const resultado = calcular({ cantidad: 20, precio: 3 });
    expect(resultado.precioNeto).toEqual(60);
  });
});
