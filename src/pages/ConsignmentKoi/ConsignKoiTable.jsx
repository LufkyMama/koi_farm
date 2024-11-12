import React from 'react';

const ConsignKoiTable = ({ consignKois, startEditing, handleDelete }) => {
  return (
    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
      <thead>
        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          <th className="py-3 px-6 text-left">ID</th>
          <th className="py-3 px-6 text-left">Name</th>
          <th className="py-3 px-6 text-left">Gender</th>
          <th className="py-3 px-6 text-left">Age</th>
          <th className="py-3 px-6 text-left">Size</th>
          <th className="py-3 px-6 text-left">Color</th>
          <th className="py-3 px-6 text-left">Daily Feed Amount</th>
          <th className="py-3 px-6 text-left">Personality</th> 
          <th className="py-3 px-6 text-left">Origin</th>
          <th className="py-3 px-6 text-left">Selection Rate</th>
          <th className="py-3 px-6 text-left">Species</th>
          <th className="py-3 px-6 text-left">Price</th>
          <th className="py-3 px-6 text-left">ConsignKoi Image</th>
          <th className="py-3 px-6 text-left">Origin Certificate</th>
          <th className="py-3 px-6 text-left">Health Certificate</th>
          <th className="py-3 px-6 text-left">Ownership Certificate</th>
          <th className="py-3 px-6 text-center">Actions</th>
        </tr>
      </thead>
      <tbody className="text-gray-600 text-sm font-light">
        {consignKois.map((consignKoi) => (
          <tr key={consignKoi.consignmentKoiID} className="border-b border-gray-200 hover:bg-gray-100">
            <td className="py-3 px-6 text-left whitespace-nowrap">{consignKoi.consignmentKoiID}</td>
            <td className="py-3 px-6 text-left">{consignKoi.name}</td>
            <td className="py-3 px-6 text-left">{consignKoi.gender}</td>
            <td className="py-3 px-6 text-left">{consignKoi.age}</td>
            <td className="py-3 px-6 text-left">{consignKoi.size}</td>
            <td className="py-3 px-6 text-left">{consignKoi.color}</td>
            <td className="py-3 px-6 text-left">{consignKoi.dailyFeedAmount}</td>
            <td className="py-3 px-6 text-left">{consignKoi.personality}</td>
            <td className="py-3 px-6 text-left">{consignKoi.origin}</td>
            <td className="py-3 px-6 text-left">{consignKoi.selectionRate}</td>
            <td className="py-3 px-6 text-left">{consignKoi.species}</td>
            <td className="py-3 px-6 text-left">{consignKoi.price}</td>

            <td className="py-3 px-6 text-left whitespace-nowrap">
              {consignKoi.image ? (
                <img src={consignKoi.image} alt="Koi Image" className="w-16 h-16 object-cover rounded" />
              ) : (
                'No Image'
              )}
            </td>
            <td className="py-3 px-6 text-left whitespace-nowrap">
              {consignKoi.addOn?.originCertificate ? (
                <img src={consignKoi.addOn.originCertificate} alt="Origin Certificate" className="w-16 h-16 object-cover rounded" />
              ) : (
                'No Image'
              )}
            </td>
            <td className="py-3 px-6 text-left whitespace-nowrap">
              {consignKoi.addOn?.healthCertificate ? (
                <img src={consignKoi.addOn.healthCertificate} alt="Health Certificate" className="w-16 h-16 object-cover rounded" />
              ) : (
                'No Image'
              )}
            </td>
            <td className="py-3 px-6 text-left whitespace-nowrap">
              {consignKoi.addOn?.ownershipCertificate ? (
                <img src={consignKoi.addOn.ownershipCertificate} alt="Ownership Certificate" className="w-16 h-16 object-cover rounded" />
              ) : (
                'No Image'
              )}
            </td>

            <td className="py-3 px-6 text-center">
              <button
                onClick={() => startEditing(consignKoi)}
                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-200"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(consignKoi.consignmentKoiID)}
                className="bg-red-500 text-white px-2 py-1 rounded ml-2 hover:bg-red-600 transition duration-200"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ConsignKoiTable;
