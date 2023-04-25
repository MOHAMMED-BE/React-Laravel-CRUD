import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

const UpdateProduct = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const { addToast } = useToasts();
  const navigate = useNavigate();

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
      setImagePreview(URL.createObjectURL(event.target.files[0]));
    }
  };

  const fetchData = useCallback(async () => {
    const response = await axios.get(`https://crud-reactlaravel.herokuapp.com/api/getproduct/${id}`);
    setName(response.data.product.name);
    setImage(response.data.product.file_path);
  }, [id]);


  useEffect(() => {
    fetchData();
  }, [fetchData]);


  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', image);

    try {
      await axios.post(`https://crud-reactlaravel.herokuapp.com/api/update/${id}`, formData);
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
                  />
                </div>
                <div className='form-group'>
                  {!imagePreview && <img className='image mt-3' src={'https://crud-reactlaravel.herokuapp.com/' + image} key={id} alt={name} />}
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
