import React, { useState } from 'react';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState(false);

    const addProduct = async () => {
        if (!name || !price || !category || !image) {
            setError(true);
            return false;
        }

        const userId = JSON.parse(localStorage.getItem('user'))._id;

        // Create FormData to handle image upload
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('image', image);

        try {
            let result = await fetch("http://localhost:5000/add-product", {
                method: "post",
                body: formData,
            });

            result = await result.json();
            console.warn(result);
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    return (
        <div className='product'>
            <h1>Add Product</h1>
            <input
                type="text"
                placeholder='Enter product name'
                className='inputBox'
                value={name}
                onChange={(e) => { setName(e.target.value) }}
            />
            {error && !name && <span className='invalid-input'>Enter valid name</span>}

            <input
                type="text"
                placeholder='Enter product price'
                className='inputBox'
                value={price}
                onChange={(e) => { setPrice(e.target.value) }}
            />
            {error && !price && <span className='invalid-input'>Enter valid price</span>}

            <input
                type="text"
                placeholder='Enter product category'
                className='inputBox'
                value={category}
                onChange={(e) => { setCategory(e.target.value) }}
            />
            {error && !category && <span className='invalid-input'>Enter valid category</span>}

            <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
            />
            {error && !image && <span className='invalid-input'>Upload product image</span>}

            <button onClick={addProduct} className='appButton'>Add Product</button>
        </div>
    );
}

export default AddProduct;
