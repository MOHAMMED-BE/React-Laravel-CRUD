import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'

const ProductList = (props) => {
    const [data, setData] = useState([]);
    const { addToast } = useToasts();
    const MySwal = withReactContent(Swal);


    const fetchData = async () => {
        const response = await axios.get(`${props.baseUrl}/api/showproduct`);
        setData(response.data.product);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const deleteProduct = async (id) => {
        try {
            const result = await MySwal.fire({
                title: 'Are you sure?',
                text: 'You will not be able to recover this product!',
                icon: 'info',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            });

            if (result.isConfirmed) {
                await axios.delete(`${props.baseUrl}/api/delete/${id}`);
                fetchData();
                addToast('Product Deleted Successfully', { appearance: 'success' });
            }
            else {
                addToast('Operation Canceled', { appearance: 'info' });

            }
        } catch (error) {
            addToast('an error occurred while updating the product. Please try again later.', { appearance: 'error' });
        }
    }

    return (
        <div className='m-1'>
            <h2 className='text-center'>Products List</h2>
            <table className='table text-center'>
                <thead>
                    <tr>
                        <th scope="col">Image</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Description</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => {
                        return (
                            <tr key={item.id}>
                                <td><img className='image' src={`${props.baseUrl}/${item.file_path}`} alt={item.name} /></td>
                                <td>{item.name}</td>
                                <td>{item.price} DH</td>
                                <td>{item.description}</td>
                                <td style={{ width: '10rem' }}>
                                    <Link to={`update/${item.id}`}>
                                        <span className='btn btn-outline-success me-1'><AiFillEdit className='icon-delete' /></span>
                                    </Link>
                                    <span onClick={() => deleteProduct(item.id)} className='btn btn-outline-danger'><AiFillDelete className='icon-delete' /></span>
                                </td>
                            </tr>
                        );
                    })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ProductList
