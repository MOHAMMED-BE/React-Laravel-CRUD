import React, { useState } from 'react'
import axios from 'axios';

const SearchProduct = (props) => {
  const [data, setData] = useState([]);
  const [inputValue, setinputValue] = useState(false);

  const search = async (key) => {
    const response = await axios.get(`${props.baseUrl}/api/search/${key}`);
    setData(response.data.product);
    setinputValue(true);
  }

  return (
    <div className='m-1'>
      <input className='form-control my-4 container' type='search' placeholder='search' onChange={(e) => search(e.target.value)} />

      {
        data.length !== 0 ?
          <>
            <h2 className='text-center'>Products List</h2>
            <table className='table text-center'>
              <thead>
                <tr>
                  <th scope="col">Image</th>
                  <th scope="col">Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Description</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td><img className='image' src={`${props.baseUrl}/${item.file_path}`} alt={item.name} /></td>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td>{item.description}</td>
                    </tr>
                  );
                })
                }
              </tbody>
            </table></>
          :

          <>
            {inputValue && <h3 className='text-center text-danger'>No data found!</h3>}

          </>
      }

    </div>
  )
}

export default SearchProduct
