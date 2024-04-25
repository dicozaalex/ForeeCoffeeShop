import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { useLocation } from 'react-router-dom';
import { BranchContext } from '../../context/BranchContext';

function EditMenu({route}) {
  const location = useLocation();
  const { selectedBranch } = useContext(BranchContext);
  const { itemName } = location.state || {};
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const authHeader = useAuthHeader();
  const [inputs, setInputs] = useState({
    productId: '',
    productName: '',
    category: 'Select category',
    subCategory: 'Select sub-category',
    price: '',
    stock: '',
    picture_url: '',
    desc: '',
  });

  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    axios.get(`${backendUrl}/products/name?Name=${itemName}&${selectedBranch}`, 
    {
        credentials: 'include',
        headers: {
          'Authorization': authHeader,
        },
      }
    )
      .then((response) => {
        const productData = response.data.data.products[0];

        setInputs((prevState) => ({
          ...prevState,
          productId: productData.id,
          productName: productData.name,
          category: productData.category,
          subCategory: productData.subcategory,
          price: productData.price ? productData.price.toString() : '',
          stock: productData.stock ? productData.stock.toString() : '',
          picture_url: productData.picture_url,
          desc: productData.desc,
          photo: null,
        }));

        if (productData.category === 'COFFEE') {
          setSubCategories(['LATTE', 'FLAVOURED COFFEE']);
        } else if (productData.category === 'NON COFFEE') {
          setSubCategories(['CHOCOLATE', 'REFRESHER']);
        } else if (productData.category === 'DONUT') {
          setSubCategories(['DONUTS']);
        }
      })
      .catch((error) => {
        console.error('Error fetching product data:', error);
      });
  }, [backendUrl ,authHeader, itemName, selectedBranch]);


  useEffect(() => {
    console.log('Inputs after setting state:', inputs);
  }, [inputs]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    console.log('Name:', name);
    console.log('Value:', value);
    console.log('Current Inputs State:', inputs);

    if (name === 'photo') {
      if (files && files[0]) {
        const reader = new FileReader();

        reader.onload = (e) => {
          setInputs((prevState) => ({
            ...prevState,
            photo: files[0],
            picture_url: e.target.result,
          }));
        };

        reader.readAsDataURL(files[0]);
      }
    } else {
      setInputs((prevState) => ({
        ...prevState,
        [name]: value
      }));
    }

    if (name === 'category') {
      if (value === 'COFFEE') {
        setSubCategories(['LATTE', 'FLAVOURED COFFEE']);
      } else if (value === 'NON COFFEE') {
        setSubCategories(['CHOCOLATE', 'REFRESHER']);
      } else if (value === 'DONUT') {
        setSubCategories(['DONUTS']);
      }
    }

    if (name === 'desc') {
      setInputs((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }

  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!checkAllFieldsFilled(inputs)) {
      alert('Please fill in all fields.');
      return;
    }

    if (!checkStock(inputs)) {
      alert('Stock must be positive numbers.');
      return;
    }

    if (!checkPrice(inputs)) {
      alert('Price must be positive numbers.');
      return;
    }

    Promise.all([handleProductUpdate(), handleStockUpdate()])
      .then(() => {
        alert('Updated Success');
      })
      .catch((error) => {
        console.error('Error updating:', error);
      });

    console.log('Form submitted:', inputs);
  };

  const checkAllFieldsFilled = (inputs) => {
    const { productName, category, subCategory, price, stock, desc } = inputs;
    return (
      productName &&
      category &&
      subCategory &&
      price &&
      stock &&
      desc &&
      category !== 'Select category' &&
      subCategory !== 'Select sub-category'
    );
  };

  const checkPrice = (inputs) => {
    const { price } = inputs;
    return !isNaN(Number(price)) && Number(price) >= 0;
  };

  const checkStock = (inputs) => {
    const { stock } = inputs;
    return !isNaN(Number(stock)) && Number(stock) >= 0;
  };

  const handleProductUpdate = () => {
    const formData = new FormData();
    formData.append('id', inputs.productId);
    formData.append('productName', inputs.productName);
    formData.append('productPrice', inputs.price);
    formData.append('category', inputs.category);
    formData.append('subCategory', inputs.subCategory);
    formData.append('picture_url', inputs.picture_url);
    formData.append('desc', inputs.desc);
    formData.append('photo', inputs.photo);

    try {
      const response = axios.put(`${backendUrl}/products/${inputs.productId}`, formData, 
      {
        credentials: 'include',
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'multipart/form-data'
        }
      }
    );
      console.log('Product updated:', response.data);

    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    };
  };

  const handleStockUpdate = () => {
    const formData = new FormData();
    formData.append('productName', inputs.productName);
    formData.append('stock', inputs.stock);

    axios.put(`${backendUrl}/productBranch/${selectedBranch}`, formData, 
    {
      credentials: 'include',
      headers: {
        'Authorization': authHeader,
      }
    }
  )
      .then((response) => {
        console.log('Stock updated:', response.data);
      })
      .catch((error) => {
        console.error('Error updating stock:', error);
        throw error;
      });
  };

  const handleDelete = () => {
    const confirmed = window.confirm('Are you sure you want to delete this product? Click OK to delete, or Cancel to go back.');
    if (confirmed) {
      axios.delete(`${backendUrl}/products/${inputs.productId}`, 
      {
        credentials: 'include',
        headers: {
          'Authorization': authHeader,
        },
      }
    )
        .then((response) => {
          console.log('Product deleted:', response.data);
        })
        .catch((error) => {
          console.error('Error deleting product:', error);
        });
    }
  };

  return (
  <>
    <Navbar />

    <div className="flex flex-col items-center justify-center min-h-screen container" style={{ backgroundColor: '#1C5739', paddingTop: '4rem'}}>
      <form onSubmit={handleSubmit} className="w-6/12">

        <div className="relative w-40 h-40 mb-4 overflow-hidden flex items-center justify-center mx-auto">
          <input
            id="photo"
            name="photo"
            type="file"
            accept="image/*"
            className="absolute inset-0 opacity-0 z-10 cursor-pointer"
            onChange={handleChange}
          />
          <img
            src={inputs.photo ? URL.createObjectURL(inputs.photo) : inputs.picture_url}
            alt="Product"
            className="w-full h-full object-cover"
            style={{ zIndex: 1 }}
          />
        </div>

        <div className="mb-3">
          <label className="text-xl text-white" htmlFor="productName">Product Name</label>
          <input
            id="productName"
            name="productName"
            type="text"
            className="block p-2 w-full border-b-2 border-white placeholder-white bg-brand"
            placeholder="Enter product name"
            value={inputs.productName}
            onChange={handleChange}
            style={{ backgroundColor: '#1C5739', color: 'white', textAlign: 'left' }}
          />
        </div>

        <div className="mb-3">
          <label className="text-xl text-white" htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            className="block p-2 w-full border-b-2 border-white bg-brand"
            value={inputs.category}
            onChange={handleChange}
            style={{ backgroundColor: '#1C5739', color: 'white' }}
          >
            <option value="">Select category</option>
            <option value="COFFEE">Coffee</option>
            <option value="NON COFFEE">Non-Coffee</option>
            <option value="DONUT">Donut</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="text-xl text-white" htmlFor="subCategory">Sub-Category</label>
          <select
            id="subCategory"
            name="subCategory"
            className="block p-2 w-full border-b-2 border-white bg-brand"
            value={inputs.subCategory}
            onChange={handleChange}
            style={{ backgroundColor: '#1C5739', color: 'white' }}
          >
            <option value="">Select sub-category</option>
            {subCategories.map((subCategory, index) => (
              <option key={index} value={subCategory}>{subCategory}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="text-xl text-white" htmlFor="price">Price</label>
          <div className="flex items-center bg-brand">
            <span className="p-2 text-white">Rp</span>
            <input
              id="price"
              name="price"
              type="text"
              className="block p-2 w-full border-b-2 border-white placeholder-white bg-brand"
              placeholder="Enter price"
              value={inputs.price}
              onChange={handleChange}
              style={{ backgroundColor: '#1C5739', color: 'white', textAlign: 'left' }}
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="text-xl text-white" htmlFor="stock">Stock</label>
          <input
            id="stock"
            name="stock"
            type="text"
            className="block p-2 w-full border-b-2 border-white placeholder-white bg-brand"
            placeholder="Enter stock"
            value={inputs.stock}
            onChange={handleChange}
            style={{ backgroundColor: '#1C5739', color: 'white', textAlign: 'left' }}
          />
        </div>

        <div className="mb-3">
          <label className="text-xl text-white" htmlFor="desc">Description</label>
          <textarea
            id="desc"
            name="desc"
            className="block p-2 w-full border border-solid border-white bg-brand resize-none"
            placeholder="Enter description"
            value={inputs.desc}
            onChange={handleChange}
            style={{
              marginTop: '10px',
              boxShadow: 'inset 0 0 5px rgba(0, 0, 0, 0.2)',
              color: 'white',
              height: '120px',
              backgroundColor: '#25734B',
            }}
          />
        </div>

        <div className="items-center flex flex-col justify-center">
          <button type="submit" className="rounded-lg w-8/12 p-2 mt-14 mb-2 text-xl text-white" style={{ backgroundColor: '#AC874E' }}>Save Changes</button>
          <button type="button" onClick={handleDelete} className="rounded-lg w-8/12 p-2 mt-6 mb-2 text-xl text-white" style={{ backgroundColor: '#CB4A4A' }}>Delete Menu</button>
          <div style={{ marginBottom: '100px' }}></div>
        </div>
      </form>
    </div>
  </>
  );
}

export default EditMenu;
