import React, { useEffect, useState, useCallback, useRef } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

const UpdateProduct = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const priceRef = useRef(null);
  const imageRef = useRef(null);
  const { addToast } = useToasts();
  const navigate = useNavigate();

  // Object.keys();
  

  const fetchData = useCallback(async () => {
    const response = await axios.get(`http://127.0.0.1:8000/api/getproduct/${id}`);
    setName(response.data.product.name);
    setPrice(response.data.product.price);
    setDescription(response.data.product.description);
    setImage(response.data.product.file_path);
  }, [id]);


  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
      setImagePreview(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('image', image);

    try {
      await axios.post(`http://127.0.0.1:8000/api/update/${id}`, formData);
      navigate('/');
      addToast('Product updated Successfully', { appearance: 'success' });
    } catch (error) {
      addToast('an error occurred while updating the product. Please try again later.', { appearance: 'error' });
    }
  };

  return (
    <>
      <div className='container'>
        <div className='row d-flex justify-content-center pt-5'>
          <div className='card' style={{ width: '25rem' }}>
            <div className='card-body'>
              <h2>Update Product</h2>
              <form onSubmit={handleSubmit}>
                <div className='form-group'>
                  <label htmlFor='name'>Name</label>
                  <input
                    type='text'
                    className='form-control'
                    name='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    ref={nameRef}
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='description'>Description</label>
                  <input
                    type='text'
                    className='form-control'
                    name='description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    ref={descriptionRef}
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='price'>Price</label>
                  <input
                    type='text'
                    className='form-control'
                    name='price'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    ref={priceRef}
                  />
                </div>

                <div className='form-group'>
                  {!imagePreview && <img className='image mt-3' src={'http://127.0.0.1:8000/' + image} key={id} alt={name} />}
                  {imagePreview ?
                    <>
                      <img src={imagePreview} alt="preview" name='preview' className='image mt-3' />
                      <button type="submit" className="btn btn-outline-danger ms-2 mt-3">Remove</button>
                    </>
                    :
                    <></>
                  }

                  <input
                    type='file'
                    accept='image/*'
                    className='form-control mt-3'
                    name='image'
                    onChange={onImageChange}
                    ref={imageRef}
                  />
                </div>
                <button type='submit' className='btn btn-primary mt-1 px-3'>Update</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UpdateProduct
