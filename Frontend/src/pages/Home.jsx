import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import vector from '../assert/Vector.png';
import video_img from '../assert/video_img.png';
import connect_section_vector from '../assert/connect_section_vector.png';
import brain from '../assert/Brain.png';
import product1 from '../assert/product1.png';

export default function Home() {
    const [industries, setIndustries] = useState(0);
    const [productivityBoost, setProductivityBoost] = useState(0);
    const [solutionIntegrations, setSolutionIntegrations] = useState(0);
    const [minutesSaved, setMinutesSaved] = useState(0);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Counter effect
    useEffect(() => {
        const interval = setInterval(() => {
            setIndustries(industries < 10 ? industries + 1 : 10);
            setProductivityBoost(productivityBoost < 98 ? productivityBoost + 9 : 98);
            setSolutionIntegrations(solutionIntegrations < 9000 ? solutionIntegrations + 969 : 9000);
            setMinutesSaved(minutesSaved < 8 ? minutesSaved + 1 : 8);
        }, 100);

        return () => clearInterval(interval);
    }, [industries, productivityBoost, solutionIntegrations, minutesSaved]);

    // Fetch products from API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/fetch/');
                if (response.ok) {
                    const data = await response.json();
                    setProducts(data.data);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            {/* Hero Section */}
            <div className="text-center mt-14 flex flex-col items-center gap-4" style={{ backgroundImage: `url(${vector})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '100vh' }}>
                <p className='border-2 border-black rounded-xl w-fit px-2 py-1 font-medium'>
                    <span>NEW</span> 1000 startups in 10 years
                </p>
                <h1 className="text-6xl font-medium">
                    Empowering the next generation <br />
                    of{' '}
                    <span
                        style={{
                            background: 'linear-gradient(90deg, rgba(38,6,179,1) 9%, rgba(68,6,177,1) 18%, rgba(83,17,205,1) 27%, rgba(153,28,210,1) 36%, rgba(226,2,101,1) 45%, rgba(221,8,8,1) 54%, rgba(254,111,4,1) 63%, rgba(218,176,0,1) 72%, rgba(151,182,0,1) 81%, rgba(1,168,1,1) 90%, rgba(0,158,83,1) 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            display: 'inline-block',
                        }}
                        className="font-bold"
                    >
                        Entrepreneurs.
                    </span>
                </h1>
                <p className='text-lg'>
                    Join SNS iHub to access resources, mentors, and funding to launch <br />
                    and scale your business.
                </p>
                <div className="flex justify-center mt-4">
                    <button className="text-lg flex items-center space-x-2 bg-black text-white px-6 py-2 rounded-xl">
                        Get Started&emsp;<FontAwesomeIcon icon={faArrowRight} />
                    </button>
                </div>
                <div className='flex flex-col items-center mt-10'>
                    <img className='w-2/3' src={video_img} alt='video' />
                </div>
            </div>

            {/* growth section */}
            <div className='mt-48 px-32'>
                <h1 className='text-5xl font-medium leading-tight mb-10'>Every number tells a story of <br /> growth and innovation.</h1>
                <div className='flex justify-around'>
                    <div>
                        <h1 className='text-7xl p-2 font-semibold'>{industries}+</h1>
                        <p className='text-lg font-medium pl-2'>Industries Catered</p>
                    </div>
                    <div>
                        <h1 className='text-7xl p-2 font-semibold'>{productivityBoost}%</h1>
                        <p className='text-lg font-medium pl-2'>Productivity Boost</p>
                    </div>
                    <div>
                        <h1 className='text-7xl p-2 font-semibold'>{solutionIntegrations}+</h1>
                        <p className='text-lg font-medium pl-2'>Solution integrations</p>
                    </div>
                    <div>
                        <h1 className='text-7xl p-2 font-semibold'>{minutesSaved}K+</h1>
                        <p className='text-lg font-medium pl-2'>Minutes saved</p>
                    </div>
                </div>
            </div>

            {/* our products */}
<div className='mt-40 px-32'>
    <h1 className='text-5xl font-medium pb-6'>Our Products</h1>
    <div className='flex flex-row justify-between'>
        {loading ? (
            <div className="w-full flex justify-center items-center h-96">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-black"></div>
            </div>
        ) : (
            products.length > 0 ? products.map((product, index) => (
                <div key={product._id || index} className="flex flex-col items-center relative" style={{ width: '25%', height: '100%' }}>
                    {/* Image with loading state */}
                    <div className="w-full h-full relative">
                        {product.image_data_url ? (
                            <img 
                                className='w-full h-full rounded-3xl' 
                                src={product.image_data_url}
                                alt={product.title} 
                                onError={(e) => {
                                    e.target.src = product1; // Fallback to product1 if image fails to load
                                    console.error('Image failed to load:', product.image_data_url);
                                }}
                                style={{ 
                                    boxShadow: 'rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px',
                                    objectFit: 'cover'
                                }}
                            />
                        ) : (
                            <div className="w-full h-full rounded-3xl bg-gray-200 flex items-center justify-center">
                                <span className="text-gray-400">No image available</span>
                            </div>
                        )}
                    </div>
                    <div className="absolute bottom-14 text-center left-0 right-0 text-white p-4">
                        <h1 className='text-3xl'>{product.title}</h1>
                        <p className='leading-tight pb-2'>{product.description}</p>
                        <button 
                            className='bg-white text-black border rounded-lg px-4 py-0.5 font-medium hover:bg-gray-100 transition-colors'
                            onClick={() => window.location.href = `/product/${product._id}`}
                        >
                            Learn more
                        </button>
                    </div>
                </div>
            )) : (
                <div className="w-full text-center text-gray-500 py-10">
                    No products available
                </div>
            )
        )}
    </div>

                <div className='flex flex-col mt-12 gap-4'>
                    <div className='flex justify-center gap-10'>
                        {['Smart City', 'Construction Engineering', 'Data Science'].map((category, index) => (
                            <p key={index} className='border-2 border-black rounded-2xl px-8 py-1 font-medium text-sm'>{category}</p>
                        ))}
                    </div>
                    <div className='flex justify-center gap-10'>
                        {['Construction', 'Software & IT', 'AI', 'Cyber Security', 'Social Media'].map((category, index) => (
                            <p key={index} className='border-2 border-black rounded-2xl px-8 py-1 font-medium text-sm'>{category}</p>
                        ))}
                    </div>
                </div>
            </div>


            {/* why choose us section */}
            <div className='mx-40 my-20 py-12 bg-[#F1F1F1] border rounded-3xl text-center'>
                <h1 className='text-5xl font-medium mb-12'>Why choose us?</h1>
                <div className='flex justify-around mb-12'>
                    <div className='flex flex-col items-center'>
                        <img className='border-2 border-black rounded-xl w-20' src={brain} alt='brain'></img>
                        <p className='text-2xl font-medium pt-2 pb-2'>Adaptive Intelligence</p>
                        <p className='font-medium'>Adapts and evolves to optimize your<br />operations</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <img className='border-2 border-black rounded-xl w-20' src={brain} alt='brain'></img>
                        <p className='text-2xl font-medium pt-2 pb-2'>Unified Innovation Engine</p>
                        <p className='font-medium'>Driving smarter solutions with precision<br /> and productivity</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <img className='border-2 border-black rounded-xl w-20' src={brain} alt='brain'></img>
                        <p className='text-2xl font-medium pt-2 pb-2'>Agility Driven</p>
                        <p className='font-medium'>Offering flexibility that scales with<br /> the business.</p>
                    </div>
                </div>

                <div className='flex justify-around mb-12'>
                    <div className='flex flex-col items-center'>
                        <img className='border-2 border-black rounded-xl w-20' src={brain} alt='brain'></img>
                        <p className='text-2xl font-medium pt-2 pb-2'>Adaptive Intelligence</p>
                        <p className='font-medium'>Adapts and evolves to optimize your<br />operations</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <img className='border-2 border-black rounded-xl w-20' src={brain} alt='brain'></img>
                        <p className='text-2xl font-medium pt-2 pb-2'>Unified Innovation Engine</p>
                        <p className='font-medium'>Driving smarter solutions with precision<br /> and productivity</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <img className='border-2 border-black rounded-xl w-20' src={brain} alt='brain'></img>
                        <p className='text-2xl font-medium pt-2 pb-2'>Agility Driven</p>
                        <p className='font-medium'>Offering flexibility that scales with<br /> the business.</p>
                    </div>
                </div>
            </div>

            {/* Who do we cater? */}
            <div className='mx-40'>
                <h1 className='text-5xl font-medium mb-6'>Who do we cater?</h1>
                <div className='bg-slate-200 h-96 border rounded-3xl'>

                </div>
            </div>

            {/* connect new page */}
            <div className='my-20' style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundImage: `url(${connect_section_vector})`, backgroundSize: 'cover' }}>
                <div className='flex flex-col items-center'>
                    <h1 className='text-5xl font-medium' style={{ textAlign: 'center' }}>Join <span
                        style={{
                            background: 'linear-gradient(90deg, rgba(38,6,179,1) 9%, rgba(68,6,177,1) 18%, rgba(83,17,205,1) 27%, rgba(153,28,210,1) 36%, rgba(226,2,101,1) 45%, rgba(221,8,8,1) 54%, rgba(254,111,4,1) 63%, rgba(218,176,0,1) 72%, rgba(151,182,0,1) 81%, rgba(1,168,1,1) 90%, rgba(0,158,83,1) 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            display: 'inline-block',
                        }}
                        className="font-bold text-5xl"
                    >
                        SNS iHub
                    </span> Today!</h1>
                    <div className='mt-10 border border-black rounded-lg w-fit px-1 pt-1'>
                        <input type='email' placeholder='email...' style={{ marginBottom: '10px', border: 'none' }} />
                        <button className='bg-black text-white px-2 py-1 font-medium border rounded-lg'>Get Started</button>
                    </div>
                </div>
            </div>
        </div>
    )
}