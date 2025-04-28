import { useEffect, useState } from "react";
import unidadesJson from "../assets/json/unidades.json";

const UnitConverter = () => {
  const [tipo, setTipo] = useState("");
  const [valor, setValor] = useState("");
  const [unidades, setUnidades] = useState({});
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [resultado, setResultado] = useState(null);

  const convertir = async () => {
    if (origen == "" || destino == "")
      setResultado("Seleccione un origen y destino");

    const response = await fetch(
      "http://localhost:8080/api/conversor/convert",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipo,
          valor: parseFloat(valor),
          unidadOrigen: origen,
          unidadDestino: destino,
        }),
      }
    );
    const data = await response.json();
    setResultado(data);
  };

  const handleType = (e) => {
    setTipo(e.target.value);
  };

  useEffect(() => {
    setUnidades(unidadesJson[tipo]);
  }, [tipo]);

  return (
    <div>
      <h2>Conversor de Unidades</h2>
      <h2>Tipo de Conversion:</h2>
      <select value={tipo} onChange={(e) => handleType(e)}>
        <option value="longitud">Longitud</option>
        <option value="masa">Masa</option>
        <option value="temperatura">Temperatura</option>
        <option value="area">Área</option>
      </select>

      <h2>Origen:</h2>
      <select value={origen} onChange={(e) => setOrigen(e.target.value)}>
        <option value="" unselectable="true">
          Seleccionar unidad
        </option>
        {unidades
          ? Object.keys(unidades).map((el) => {
              return (
                <option key={el} value={unidades[el]}>
                  {el}
                </option>
              );
            })
          : null}
      </select>
      <h2>Destino:</h2>
      <select value={destino} onChange={(e) => setDestino(e.target.value)}>
        <option value="" unselectable="true">
          Seleccionar unidad
        </option>
        {unidades
          ? Object.keys(unidades)
              ?.filter((el) => el != origen)
              .map((el) => {
                return (
                  <option key={el} value={unidades[el]}>
                    {el}
                  </option>
                );
              })
          : null}
      </select>
      <h2>Valor:</h2>
      <input
        type="number"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        placeholder="Valor"
      />
      <button onClick={convertir}>Convertir</button>

      {resultado !== null && (
        <h3>
          Resultado: {resultado} {destino}
        </h3>
      )}
    </div>
  );
};

export default UnitConverter;
