const EditBatchForm = ({ newBatch, handleChange, handleSave }) => {
  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
      <input
        type="text"
        name="name"
        value={newBatch.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        type="text"
        name="species"
        value={newBatch.species}
        onChange={handleChange}
        placeholder="Species"
      />
      <input
        type="int"
        name="remainBatch"
        value={newBatch.remainBatch}
        onChange={handleChange}
        placeholder="Remain Batch"
      />
      <input
        type="number"
        name="pricePerBatch" 
        value={newBatch.pricePerBatch}
        onChange={handleChange}
        placeholder="Price"
      />
      <input
        type="number"
        name="quantityPerBatch" 
        value={newBatch.quantityPerBatch}
        onChange={handleChange}
        placeholder="Quantity"
      />
      <textarea
        name="description"
        value={newBatch.description}
        onChange={handleChange}
        placeholder="Description"
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default EditBatchForm;
