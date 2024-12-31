import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ProductDesc() {
    const { id } = useParams(); // Get the product ID from the URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/fetch/${id}/`); // Fetch product details by ID
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                if (data.status === "success") {
                    setProduct(data.data);
                } else {
                    throw new Error(data.message || 'Product not found');
                }
            } catch (error) {
                console.error('Error fetching product details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [id]);

    if (loading) {
        return <div className="flex items-center justify-center h-screen text-gray-600">Loading...</div>; // Loading state
    }

    if (!product) {
        return <div className="flex items-center justify-center h-screen text-red-500">No product found.</div>; // Handle case where product is not found
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="relative bg-white shadow-md mx-32">
                <div className="container mx-auto px-6 py-16 md:flex md:items-center">
                    <div className="md:w-1/2 space-y-6">
                        <h1 className="text-4xl font-bold text-gray-800">{product.title}</h1>
                        <p className="text-lg text-gray-600">{product.tagline}</p>
                        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none">Buy Now</button>
                    </div>
                    <div className="md:w-1/2">
                        <img src={product.image_data_url} alt={product.title} className="rounded-lg shadow-lg" />
                    </div>
                </div>
            </div>

            {/* Product Details Section */}
            <div className="container mx-auto px-6 py-12">
                <div className="space-y-12">
                    {/* Description */}
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800">Description</h2>
                        <p className="mt-4 text-gray-600 leading-relaxed">{product.description}</p>
                    </div>

                    {/* Features */}
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800">Features</h2>
                        <ul className="mt-4 list-disc list-inside text-gray-600 space-y-2">
                            {product.key_features.split(',').map((feature, index) => (
                                <li key={index}>{feature.trim()}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Tags */}
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800">Tags</h2>
                        <p className="mt-4 text-gray-800 text-sm">
                            {product.tags
                                .replace(/[[\]"]/g, '') // Remove brackets and quotes
                                .split(',') // Split the tags by commas
                                .map((tag, index) => (
                                    <span key={index}>
                                        <span>&#8226; {tag.trim()}</span> {/* Add bullet point with space */}
                                        {index < product.tags.split(',').length - 1 && <span> </span>} {/* Add space between tags */}
                                    </span>
                                ))}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
