import React, { useEffect, useState, useCallback, useRef } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import * as yup from "yup";
import { useFormik } from "formik";

const UpdateProduct = (props) => {
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const [oldimage, setOldImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const priceRef = useRef(null);
  const imageRef = useRef();
  const newImageRef = useRef(null);
  const { addToast } = useToasts();
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    const response = await axios.get(`${props.baseUrl}/api/getproduct/${id}`);
    values.name = response.data.product.name;
    values.description = response.data.product.description;
    values.price = response.data.product.price;
    setImage(response.data.product.file_path);
    setOldImage(response.data.product.file_path);
  }, [id]);


  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const Schema = yup.object({
    name: yup.string().required("Please Enter Product Name"),
    description: yup.string().required("Please Enter Product Description"),
    price: yup.number()
      .typeError('Please enter a valid number')
      .min(1, 'Price should be greater than 0')
      .required('Please Enter Product Price')
      .test('no-leading-zero', 'Price cannot start with 0',
        (value) => value.toString().charAt(0) !== '0'),
  });


  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
      image: null,
    },
    validationSchema: Schema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('price', values.price);
      formData.append('description', values.description);
      formData.append('image', image);

      try {
        await axios.post(`${props.baseUrl}/api/update/${id}`, formData);
        navigate('/');
        addToast('Product updated Successfully', { appearance: 'success' });
      } catch (error) {
        addToast('an error occurred while updating the product. Please try again later.', { appearance: 'error' });
      }
    },
  });

  const {
    touched,
    errors,
    values,
    handleChange,
    handleBlur,
    handleSubmit,
  } = formik;

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const removeImage = async (e) => {
    e.preventDefault();
    imageRef.current.value = null;
    setImagePreview(null);
    setImage(oldimage);
  }


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
                    name='name'
                    ref={nameRef}
                    className={
                      touched.name && errors.name
                        ? "form-control mb-2 is-invalid"
                        : "form-control mb-2"
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                  {touched.name && errors.name ? (
                    <div className="invalid-feedback">{errors.name}</div>
                  ) : null}

                </div>

                <div className='form-group'>
                  <label htmlFor='description'>Description</label>
                  <input
                    type='text'
                    name='description'
                    ref={descriptionRef}
                    className={
                      touched.description && errors.description
                        ? "form-control mb-2 is-invalid"
                        : "form-control mb-2"
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                  />
                  {touched.description && errors.description ? (
                    <div className="invalid-feedback">{errors.description}</div>
                  ) : null}
                </div>

                <div className='form-group'>
                  <label htmlFor='price'>Price</label>
                  <input
                    type='text'
                    name='price'
                    ref={priceRef}
                    className={
                      touched.price && errors.price
                        ? "form-control is-invalid"
                        : "form-control mb-2"
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.price}
                  />
                  {touched.price && errors.price ? (
                    <div className="invalid-feedback">{errors.price}</div>
                  ) : null}
                </div>

                <div className='form-group'>
                  {!imagePreview && <img className='d-block image mt-3' src={'http://127.0.0.1:8000/' + image} key={id} alt={values.name} />}
                  {imagePreview ?
                    <>
                      <img src={imagePreview} alt="preview" name='preview' ref={newImageRef} className='d-block image mt-3' />
                      <button type="submit" onClick={removeImage} className="btn btn-outline-danger ms-2 mt-3">Remove</button>
                    </>
                    :
                    <></>
                  }
                  <label className='form-label'>Product Image</label>
                  <input
                    type='file'
                    accept='image/*'
                    className='form-control'
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
