import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faYoutube, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import logo from '../assert/logo.png';

export default function Footer(){
    return(
        <div>
                  {/* footer */}
      <div className='mx-32 '>
        <div className='flex justify-between mb-6'>
          {/* column1 */}
          <div className=' w-96'>
            <div className='flex items-center gap-2 font-medium mb-4'>
              <img className="w-10" src={logo} alt="logo" />
              <h1 className='text-2xl'>SNS Innovation Hub</h1>
            </div>
            <p className='mb-4'>SNS iHub is an initiative by SNS Institutions to foster startups by providing a prototyping space immersed in an ambience of creativity and design thinking. </p>
            <hr style={{ borderColor: 'black', borderWidth: '1px' }} />
            <p className='my-4'>SNS Kalvi Nagar, Sathy Mani Road NH-209, Vazhiyampalayam, Saravanampatti, Coimbatore, Tamil Nadu 641035</p>
            <div className='flex text-2xl gap-4'>
              <FontAwesomeIcon icon={faLinkedin} />
              <FontAwesomeIcon icon={faYoutube} />
              <FontAwesomeIcon icon={faInstagram} />
              <FontAwesomeIcon icon={faTwitter} />
            </div>
          </div>
          {/* coulmn2 */}
          <div className='flex flex-col gap-1'>
            <h1 className='text-lg mb-4 font-medium'>Products</h1>
            <p className='text-sm'>Product 1</p>
            <p className='text-sm'>Product 2</p>
            <p className='text-sm'>Product 3</p>
            <p className='text-sm'>Product 4</p>
            <p className='text-sm'>Product 5</p>
          </div>
          {/* column3 */}
          <div className='flex flex-col gap-1'>
            <h1 className='text-lg mb-4 font-medium'>Resources</h1>
            <p className='text-sm'>Product 1</p>
            <p className='text-sm'>Product 2</p>
            <p className='text-sm'>Product 3</p>
            <p className='text-sm'>Product 4</p>
            <p className='text-sm'>Product 5</p>
          </div>
          {/* column4 */}
          <div className='flex flex-col gap-1'>
            <h1 className='text-lg mb-4 font-medium'>Company</h1>
            <p className='text-sm'>Product 1</p>
            <p className='text-sm'>Product 2</p>
            <p className='text-sm'>Product 3</p>
            <p className='text-sm'>Product 4</p>
            <p className='text-sm'>Product 5</p>
          </div>
          {/* column5 */}
          <div className='flex flex-col gap-1'>
            <h1 className='text-lg mb-4 font-medium'>Support</h1>
            <p className='text-sm'>Product 1</p>
            <p className='text-sm'>Product 2</p>
            <p className='text-sm'>Product 3</p>
            <p className='text-sm'>Product 4</p>
            <p className='text-sm'>Product 5</p>
          </div>
        </div>
        <hr style={{ borderColor: 'black', borderWidth: '1px' }} />
        <p className='my-6'>&copy;2024 SNS iHub Workplace. All Rights Reserved</p>
      </div>
        </div>
    )
}