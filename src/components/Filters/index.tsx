import { ChangeEvent, useState } from 'react';
import './style.module.css';

function Filters() {
  const [option, setOption] = useState<string>('Favoritas');

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setOption(value);
  };

  return (
    <div>
      <select
        onChange={ (event) => handleChange(event) }
        name="filtros"
        value={ option }
      >
        <option value="Favoritas">Favoritas</option>
        <option value="Tipo">Tipo</option>
        <option value="Título">Título</option>
      </select>
    </div>
  );
}

export default Filters;
