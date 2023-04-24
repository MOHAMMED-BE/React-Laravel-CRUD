import React, { useState } from 'react'
import axios from 'axios';
import { useToasts } from 'react-toast-notifications';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [imagePreview, setImagePreview] = useState(null)
  const { addToast } = useToasts();

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
      setImagePreview(URL.createObjectURL(event.target.files[0]));
    }
  }

  const saveProduct = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', name);
    data.append('description', description);
    data.append('price', price);
    data.append('image', image);

    try {
      await axios.post('https://ecomcrud-react-laravel.000webhostapp.com/api/addproduct', data);
      setName('');
      setDescription('');
      setPrice('');
      setImage(null);
      setImagePreview(null);
      addToast('Product Saved Successfully', { appearance: 'success' });

    } catch (error) {
      addToast('an error occurred while adding the product. Please try again later.', { appearance: 'error' });
    }

  }

  return (
    <>
      <div className='container'>
        <div className='row d-flex justify-content-center pt-5'>
          <div className='card' style={{ width: '25rem' }}>
            <div className='card-body'>
              <h5 className="card-title text-center">Add Product</h5>
              <form method='POST' onSubmit={saveProduct}>
                <label>Product Name</label>
                <input className='form-control mb-2' type='text' name='name' value={name} onChange={(e) => setName(e.target.value)} />
                <label>Product Description</label>
                <input className='form-control mb-2' type='text' name='description' value={description} onChange={(e) => setDescription(e.target.value)} />
                <label>Product Price</label>
                <input className='form-control mb-2' type='text' name='price' value={price} onChange={(e) => setPrice(e.target.value)} />
                {imagePreview && <img src={imagePreview} alt="preview" className='image mt-3' />}

                <input type="file" accept="image/*" className="form-control mt-3" name="image" onChange={onImageChange} />
                <button type='submit' className='btn btn-outline-dark px-4 mt-1'>Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddProduct
