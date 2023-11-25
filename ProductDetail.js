import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState({});

    useEffect(() => {
        getProductDetail();
    }, [productId]);

    const getProductDetail = async () => {
        try {
            let result = await fetch(`http://localhost:5000/product/${productId}`, {
                headers: {
                    authorization: JSON.parse(localStorage.getItem('token'))
                }
            });
            result = await result.json();
            setProduct(result);
        } catch (error) {
            console.error("Error getting product detail:", error);
        }
    };

    return (
        <div className="product-detail">
            <h3>Product Detail</h3>
            <ul>
                <li>Name: {product.name}</li>
                <li>Price: {product.price}</li>
                <li>Category: {product.category}</li>
                <li>
                    Image:
                    <img
                        src={`http://localhost:5000${product.imageUrl}`}
                        alt="Product"
                        style={{ maxWidth: '200px', maxHeight: '200px' }}
                    />
                </li>
            </ul>
        </div>
    );
}

export default ProductDetail;
