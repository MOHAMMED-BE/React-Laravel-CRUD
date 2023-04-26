import React, { useState } from 'react'
import axios from 'axios';
import { useToasts } from 'react-toast-notifications';
import * as yup from "yup";
import { useFormik } from "formik";

const AddProduct = (props) => {
  // const [name, setName] = useState('');
  // const [description, setDescription] = useState('');
  // const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [imagePreview, setImagePreview] = useState(null)
  const { addToast } = useToasts();

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
    onSubmit: async (values, { resetForm }) => {
      const data = new FormData();
      data.append('name', values.name);
      data.append('description', values.description);
      data.append('price', values.price);
      data.append('image', image);

      try {
        await axios.post(`${props.baseUrl}/api/addproduct`, data);
        // setName('');
        // setDescription('');
        // setPrice('');
        resetForm();
        setImage(null);
        setImagePreview(null);
        addToast('Product Saved Successfully', { appearance: 'success' });

      } catch (error) {
        addToast('an error occurred while adding the product. Please try again later.', { appearance: 'error' });
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


  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
      setImagePreview(URL.createObjectURL(event.target.files[0]));
    }
  }

  // const saveProduct = async (e) => {
  //   e.preventDefault();

  //   const data = new FormData();
  //   data.append('name', name);
  //   data.append('description', description);
  //   data.append('price', price);
  //   data.append('image', image);

  //   try {
  //     await axios.post(`${props.baseUrl}/api/addproduct`, data);
  //     setName('');
  //     setDescription('');
  //     setPrice('');
  //     setImage(null);
  //     setImagePreview(null);
  //     addToast('Product Saved Successfully', { appearance: 'success' });

  //   } catch (error) {
  //     addToast('an error occurred while adding the product. Please try again later.', { appearance: 'error' });
  //   }

  // }

  return (
    <>
      <div className='container'>
        <div className='row d-flex justify-content-center pt-5'>
          <div className='card' style={{ width: '25rem' }}>
            <div className='card-body'>
              <h5 className="card-title text-center">Add Product</h5>
              <form method='POST' onSubmit={handleSubmit}>
                <label>Product Name</label>
                <input
                  type='text'
                  name='name'
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

                <label>Product Description</label>
                <input
                  type='text'
                  name='description'
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

                <label>Product Price</label>
                <input
                  type='text'
                  name='price'
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


                {imagePreview && <img src={imagePreview} alt="preview" className='d-block image mt-2 mb-3' />}

                <label className='form-label'> Product Image</label>
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  onChange={onImageChange}
                  className='form-control mb-2'
                  required
                />

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
