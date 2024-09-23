import React, { useContext, useState } from 'react';
import { UserContext } from '../Layout';
import { ChevronLeft, ChevronRight, Calendar, Heart, Phone } from 'lucide-react';
import { MdPets as Paw } from 'react-icons/md';
import PetGalleryComponent from './ImageGallery';
import HeroSection from './HeroSection';
import Testimonials from './TestimonialComponent';
import FaqSection from './FaqSection';
import PetBookingSection from './BookingSection';

function HomePage() {
  const { user } = useContext(UserContext);
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselItems = [
    { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLubq0kx3kq9JCQscnhmlQsCAGRDzAphfsyw&s', title: 'Welcome to PetCare', description: 'Your pets deserve the best care' },
    { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgT01FnAXZdrArTjTwuQ2RypkkM5hNBUgc6FoJjDLr4miGbuNIyYMi2tL3QSC_bPoB-zw&usqp=CAU', title: 'Professional Pet Sitting', description: 'Experienced and loving pet sitters' },
    { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGeekDKBbuuzJRNpHO6qFzurC6watYQsennMEgla2_BxTvoMebYGSUcjqMlUoHZVvzTw&usqp=CAU', title: 'Luxury Pet Accommodations', description: 'Comfortable and safe spaces for your furry friends' },
  ];

  const features = [
    { icon: <Calendar size={24} />, title: 'Flexible Booking', description: 'Easy online scheduling for your convenience' },
    { icon: <Paw size={24} />, title: 'Experienced Staff', description: 'Trained professionals who love animals' },
    { icon: <Heart size={24} />, title: 'Personalized Care', description: "Tailored attention for each pet's needs" },
  ];

  const testimonials = [
    { name: 'John D.', comment: 'PetCare has been a lifesaver! My dog loves staying here.' },
    { name: 'Sarah M.', comment: 'I always feel at ease leaving my cat with the wonderful staff at PetCare.' },
    { name: 'Mike R.', comment: 'The facilities are top-notch and the care is unparalleled. Highly recommended!' },
  ];

  return (
    <div className=" bg-orange-100">
      
      {/* Hero Image */}
     <HeroSection/>

      {/* Booking Form */}
    <PetBookingSection/>

      {/* Pet Image Grid */}
      <section className="py-10 ">
        <PetGalleryComponent/>
      </section>

      {/* Features Section */}
      <section className="py-16 m-10 border-2 rounded-lg bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-orange-600">Why Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="mb-4 inline-block p-3 bg-orange-100 rounded-full text-orange-500">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16  bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <img src="https://mysecondhomedubai.com/wp-content/uploads/2021/10/Dog-Park-2-1024x768.jpg" alt="About PetCare" className="rounded-lg shadow-md" />
            </div>
            <div className="md:w-1/2 md:pl-12">
              <h2 className="text-3xl font-bold mb-4 text-orange-600">About Pawspace</h2>
              <p className="text-gray-700 mb-4">
                PetCare is dedicated to providing the highest quality care for your beloved pets. Our team of experienced and passionate animal lovers ensures that your furry friends receive the attention and love they deserve while you're away.
              </p>
              <p className="text-gray-700 mb-4">
                With state-of-the-art facilities and a commitment to excellence, we strive to create a home away from home for pets of all kinds. Your peace of mind is our top priority.
              </p>
              <button className="bg-orange-500 text-white py-2 px-6 rounded-md hover:bg-orange-600 transition duration-300">Learn More</button>
            </div>
          </div>
        </div>
      </section>

    

      {/* Contact Section */}
      <section className="p-6 mb-10   bg-orange-500 text-white  overflow-hidden">
        <div className="container mx-auto  z-10">
          <div className="flex flex-col md:flex-row mx-auto items-center justify-evenly">
            <div className="mb-8 md:mb-0">
              <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
              <p className="mb-2">Have questions? We're here to help!</p>
              <p className="flex items-center"><Phone size={18} className="mr-2" /> (123) 456-7890</p>
            </div>
            <form className="w-full md:w-1/2">
              <div className="flex flex-wrap -mx-2 mb-4">
                <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                  <input type="text" placeholder="Name" className="w-full px-3 py-2 text-gray-700 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300" />
                </div>
                <div className="w-full md:w-1/2 px-2">
                  <input type="email" placeholder="Email" className="w-full px-3 py-2 text-gray-700 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300" />
                </div>
              </div>
              <div className="mb-4">
                <textarea placeholder="Message" rows="4" className="w-full px-3 py-2 text-gray-700 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"></textarea>
              </div>
              <button type="submit" className="bg-white text-orange-600 py-2 px-6 rounded-md hover:bg-orange-100 transition duration-300">Send Message</button>
            </form>
          </div>
        </div>
      
      </section>

      <section className='p-10 bg-orange-100'>
      
      <FaqSection />
    </section>

    </div>
  );
}

export default HomePage;