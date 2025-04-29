import { useEffect, useState } from "react";
import unidadesJson from "../assets/json/unidades.json";
import { ClipLoader } from "react-spinners";

const UnitConverter = () => {
  const [tipo, setTipo] = useState("");
  const [valor, setValor] = useState("");
  const [unidades, setUnidades] = useState({});
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [resultado, setResultado] = useState(null);
  const [cargando, setCargando] = useState(false);

  const convertir = async () => {
    setCargando(true);
    if (origen == "" || destino == "")
      setResultado("Seleccione un origen y destino");

    const response = await fetch(
      "https://conversorunidadesback.onrender.com/api/conversor/convert",
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
    setCargando(false);
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
      <select className="select" value={tipo} onChange={(e) => handleType(e)}>
        <option className="option" value="longitud">
          Longitud
        </option>
        <option className="option" value="masa">
          Masa
        </option>
        <option className="option" value="temperatura">
          Temperatura
        </option>
        <option className="option" value="area">
          Área
        </option>
      </select>
      <hr />
      <h2>Unidad de origen:</h2>
      <select
        className="select"
        value={origen}
        onChange={(e) => setOrigen(e.target.value)}
      >
        <option className="option" value="" unselectable="true">
          Seleccionar unidad
        </option>
        {unidades
          ? Object.keys(unidades).map((el) => {
              return (
                <option className="option" key={el} value={unidades[el]}>
                  {el}
                </option>
              );
            })
          : null}
      </select>
      <hr />
      <h2>Unidad de destino:</h2>
      <select
        className="select"
        value={destino}
        onChange={(e) => setDestino(e.target.value)}
      >
        <option className="option" value="" unselectable="true">
          Seleccionar unidad
        </option>
        {unidades
          ? Object.keys(unidades)
              ?.filter((el) => el != origen)
              .map((el) => {
                return (
                  <option className="option" key={el} value={unidades[el]}>
                    {el}
                  </option>
                );
              })
          : null}
      </select>
      <hr />
      <h2>Valor a transformar:</h2>
      <input
        className="inputValor"
        type="number"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        placeholder="Valor"
      />
      <button className="buttonConvertir" onClick={convertir}>
        Convertir
      </button>
      <div>
        {cargando && (
          <ClipLoader className="loader" color="#93939caa" size={50} />
        )}
      </div>
      {!cargando && resultado !== null && (
        <h3>
          Resultado: {resultado} {destino}
        </h3>
      )}
    </div>
  );
};

export default UnitConverter;
