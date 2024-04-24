import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function InventoryManagementComponent() {
  const [item, setItem] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  // const [confirmationOpen, setConfirmationOpen] = useState(false);

  useEffect(() => {
    setIsAdmin(JSON.parse(localStorage.getItem('user')).isAdmin)
  }, []);


  useEffect(() => {
    fetch("http://localhost:5000/product")
      .then((res) => res.json())
      .then((res) => {
        setItem(res);
      });
  }, []);


  const handleDelete = (itemId) => {
    fetch(`http://localhost:5000/delete-product/${itemId}`, { method: "DELETE" })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to delete product');
        }
        setItem(prevItems => prevItems.filter(item => item._id !== itemId));
        alert("Product Deleted!!")
        console.log(res);
      })
      .catch(error => {
        console.log('Delete error:', error);
      });
  };

  // const deletePopUp = (itemId) => {
  //   return (
  //     <div className="group select-none w-[250px] flex flex-col p-4 relative items-center justify-center bg-gray-800 border border-gray-800 shadow-lg rounded-2xl">
  //       <div className="">
  //         <div className="text-center p-3 flex-auto justify-center">
  //           <svg
  //             fill="currentColor"
  //             viewBox="0 0 20 20"
  //             className="group-hover:animate-bounce w-12 h-12 flex items-center text-gray-600 fill-red-500 mx-auto"
  //             xmlns="http://www.w3.org/2000/svg"
  //           >
  //             <path
  //               clipRule="evenodd"
  //               d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
  //               fillRule="evenodd"
  //             ></path>
  //           </svg>
  //           <h2 className="text-xl font-bold py-4 text-gray-200">Are you sure?</h2>
  //           <p className="font-bold text-sm text-gray-500 px-2">
  //             Do you really want to continue? This process cannot be undone
  //           </p>
  //         </div>
  //         <div className="p-2 mt-2 text-center space-x-1 md:block">
  //           <button
  //             className="mb-2 md:mb-0 bg-gray-700 px-5 py-2 text-sm shadow-sm font-medium tracking-wider border-2 border-gray-600 hover:border-gray-700 text-gray-300 rounded-full hover:shadow-lg hover:bg-gray-800 transition ease-in duration-300"
  //             onClick={() => setConfirmationOpen(false)}
  //           >
  //             Cancel
  //           </button>
  //           <button
  //             className="bg-red-500 hover:bg-transparent px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 hover:border-red-500 text-white hover:text-red-500 rounded-full transition ease-in duration-300"
  //             onClick={() => {
  //               handleDelete(itemId);
  //               setConfirmationOpen(false);
  //             }}
  //           >
  //             Confirm
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };
  
  const printItems  = item.map((item) => {
    return (
      <tr key={item._id}>
        <td style={{ width: '17%' }}>{item.name}</td>
        <td style={{ width: '17%' }}>{item.price}</td>
        <td style={{ width: '17%' }}>{item.quantity}</td>
        {isAdmin && (<>
          <td style={{ width: '17%' }}>
            <Link to={`/webapp-update-product/${item._id}`} className="button">
              Update Product
            </Link>
          </td>
          <td style={{ width: '17%' }}>
            <button className="button" onClick={() => handleDelete(item._id)}>Delete Product</button>
            {/* {confirmationOpen === item._id && deletePopUp(item._id)} */}
          </td>
        </>
        )}
      </tr>
    )
  })
  
  return (
    <>
      <h1 style={{ "textAlign": "center", "margin": "5vh", "color": "#ea9600" }}>Inventory</h1>
      <table>
        <thead>
          <tr>
          <th className='text-center' style={{ width: '17%' }}>Name</th>
          <th className='text-center' style={{ width: '17%' }}>Price</th>
          <th className='text-center' style={{ width: '17%' }}>Quantity</th>
          {isAdmin && (<>
            <th style={{ width: '17%' }}></th>
            <th style={{ width: '17%' }}></th>
          </>
          )}
          </tr>
        </thead>
        <tbody>{printItems}</tbody>
      </table>
    </>
  );
};

export default InventoryManagementComponent;
