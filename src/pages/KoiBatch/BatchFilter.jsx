import React from 'react';

const FilterForm = ({ name, species, minPrice, maxPrice, setName, setSpecies, setMinPrice, setMaxPrice, handleFilter }) => (
  <div>
    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
    <input type="text" value={species} onChange={(e) => setSpecies(e.target.value)} placeholder="Species" />
    <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="Min Price" />
    <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="Max Price" />
    <button onClick={handleFilter}>Apply Filter</button>
  </div>
);

export default FilterForm;
