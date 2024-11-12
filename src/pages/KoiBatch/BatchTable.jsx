import React from 'react';

const BatchTable = ({ batches, startEditing, handleDelete }) => (
  <table className="w-full table-auto border-collapse bg-white shadow-md rounded-lg">
    <thead>
      <tr className="bg-gray-200">
        <th className="p-2 border">Name</th>
        <th className="p-2 border">Species</th>
        <th className="p-2 border">Remain Batches</th>
        <th className="p-2 border">Price</th>
        <th className="p-2 border">Quantity</th>
        <th className="p-2 border">Description</th>
        <th className="p-2 border">Actions</th>
      </tr>
    </thead>
    <tbody>
      {batches.length === 0 ? (
        <tr>
          <td colSpan="6" className="text-center py-4">No batches available</td>
        </tr>
      ) : (
        batches.map((batch) => (
          <tr key={batch.batchID} className="text-center border-b">
            <td className="p-2 border">{batch.name}</td>
            <td className="p-2 border">{batch.species}</td>
            <td className="p-2 border">{batch.remainBatch}</td>
            <td className="p-2 border">${batch.pricePerBatch}</td>
            <td className="p-2 border">{batch.quantityPerBatch}</td>
            <td className="p-2 border">{batch.description}</td>
            <td className="p-2 border">
              <button onClick={() => handleDelete(batch.batchID)} className="bg-red-500 text-white px-2 py-1 rounded mr-2">Delete</button>
              <button onClick={() => startEditing(batch)} className="bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
            </td>
          </tr>
        ))
      )}
    </tbody>
  </table>
);

export default BatchTable;
