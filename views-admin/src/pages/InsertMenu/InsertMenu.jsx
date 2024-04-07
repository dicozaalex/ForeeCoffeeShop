import React, { useState } from 'react';

function InsertMenu() {
  const [inputs, setInputs] = useState({
    productName: '',
    category: '',
    subCategory: '',
    price: '',
    stock: '',
    photo: null
  });

  const [subCategories, setSubCategories] = useState([]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'photo') {
      setInputs((prevState) => ({
        ...prevState,
        photo: files[0]
      }));
    } else {
      setInputs((prevState) => ({
        ...prevState,
        [name]: value
      }));
    }

    if (name === 'category') {
      if (value === 'Coffee') {
        setSubCategories(['Latte', 'Flavoured Coffee']);
      } else if (value === 'Non-Coffee') {
        setSubCategories(['Chocolate', 'Refresher']);
      } else if (value === 'Donut') {
        setSubCategories(['Donuts']);
      }
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
  
    console.log('Form submitted:', inputs);
  };

  const checkAllFieldsFilled = (inputs) => {
    // belum cek photo
    const { productName, category, subCategory, price, stock } = inputs;
    return (
      productName &&
      category &&
      subCategory &&
      price &&
      stock &&
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

  return (
    <div className="flex flex-col items-center justify-center h-screen" style={{ backgroundColor: '#1C5739' }}>
      <form onSubmit={handleSubmit} className="w-6/12">
        
        <div className="relative w-40 h-40 mb-4 overflow-hidden flex items-center justify-center mx-auto">
          <input
              id="photo"
              name="photo"
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 z-10 cursor-pointer"
              onChange={handleChange}
              style={{ zIndex: 4 }}
            />
          <div className="absolute inset-0 bg-gray-300 opacity-50" style={{ zIndex: 2 }}></div>
          <img
            src={`${process.env.PUBLIC_URL}/assets/InsertMenu/exampleFoodDrink.png`}
            alt="Food and Drink"
            className="w-full h-full object-cover"
            style={{ zIndex: 1 }}
          />
          <img
            src={`${process.env.PUBLIC_URL}/assets/pencil.png`}
            alt="Pencil"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5"
            style={{ zIndex: 3 }}
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
            <option value="Coffee">Coffee</option>
            <option value="Non-Coffee">Non-Coffee</option>
            <option value="Donut">Donut</option>
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

        <div className="items-center flex flex-col justify-center">
          <button type="submit" className="rounded-lg w-8/12 p-2 mt-14 mb-2 text-xl text-white" style={{ backgroundColor: '#AC874E'}}>Save</button>
        </div>
      </form>
    </div>
  );
}

export default InsertMenu;
