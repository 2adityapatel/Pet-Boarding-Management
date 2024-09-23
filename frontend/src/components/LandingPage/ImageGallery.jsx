// import React from 'react';

// const ImageGallery = () => {
//   const images = [
//     [
//       'https://t4.ftcdn.net/jpg/01/99/00/79/360_F_199007925_NolyRdRrdYqUAGdVZV38P4WX8pYfBaRP.jpg',
//       'https://static.vecteezy.com/system/resources/thumbnails/049/512/881/small/playful-golden-retriever-on-blue-backdrop-free-photo.jpg',
//       'https://static.vecteezy.com/system/resources/thumbnails/049/512/881/small/playful-golden-retriever-on-blue-backdrop-free-photo.jpg',
//     ],
//     [
//       'https://imagevars.gulfnews.com/2022/12/07/SU_221207_Petcare_PC_My-Second-Home1_184e9973844_medium.jpg',
//       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRATDJQHl4MsVK4C-68spzJz3NvL-RfZYcBdJwG-igK3LqvzeMhew52iOdKHQEul5NGwY&usqp=CAU',
//       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt-sxf0_6n5WvrbSQNG8o3l1dAHOt36hReQBc12nRfc9tuqeWK4r5qM3HsncEPyKz7m9A&usqp=CAU',
//     ],
//     [
//       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT80ScQGPE2-nDJZBPq9zF2A8n2JcMSInamFQ&s',
//       'https://media.istockphoto.com/id/1417882544/photo/large-group-of-cats-and-dogs-looking-at-the-camera-on-blue-background.jpg?s=612x612&w=0&k=20&c=kGKANSIFdNfhBJMipyuaKU4BcVE1oELWev9lF2ickE0=',
//       'https://media.istockphoto.com/id/1417882544/photo/large-group-of-cats-and-dogs-looking-at-the-camera-on-blue-background.jpg?s=612x612&w=0&k=20&c=kGKANSIFdNfhBJMipyuaKU4BcVE1oELWev9lF2ickE0=',
//     ],
//     [
//       'https://st2.depositphotos.com/1063397/5982/i/450/depositphotos_59823897-stock-photo-bathing-a-dog-golden-retriever.jpg',
//       'https://media.istockphoto.com/id/1388816698/photo/happy-pet-sitters-enjoying-with-group-of-dogs-during-a-walk-in-the-park.jpg?s=612x612&w=0&k=20&c=AxT0OZol2z6ogIOapwdI5hPRR-WI0tdFksxqIg94sIc=',
//       'https://www.petcareins.com/wp-content/uploads/2022/02/certifiedpet_hero.jpeg',
//     ],
//   ];

//   return (
//     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//       {images.map((column, columnIndex) => (
//         <div key={columnIndex} className="grid gap-4">
//           {column.map((image, imageIndex) => (
//             <div key={imageIndex}>
//               <img className="h-auto max-w-full rounded-lg" src={image} alt={`Pet image ${imageIndex}`} />
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ImageGallery;
import React from 'react';

// List of pet images
const petImages = [
  { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpCaaS1XpZcjixXGT_dofuDGXz9fWCPaGw6A&s", alt: "Happy dog playing in the park" },
  { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt-sxf0_6n5WvrbSQNG8o3l1dAHOt36hReQBc12nRfc9tuqeWK4r5qM3HsncEPyKz7m9A&usqp=CAU", alt: "Cat lounging in a sunny spot" },
  { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRATDJQHl4MsVK4C-68spzJz3NvL-RfZYcBdJwG-igK3LqvzeMhew52iOdKHQEul5NGwY&usqp=CAU", alt: "Parrot perched on a branch" },
  { src: "https://imagevars.gulfnews.com/2022/12/07/SU_221207_Petcare_PC_My-Second-Home1_184e9973844_medium.jpg", alt: "Rabbit nibbling on a carrot" },
  { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT80ScQGPE2-nDJZBPq9zF2A8n2JcMSInamFQ&s", alt: "Fish swimming in a colorful aquarium" },
  { src: "https://st2.depositphotos.com/1063397/5982/i/450/depositphotos_59823897-stock-photo-bathing-a-dog-golden-retriever.jpg", alt: "Hamster running on its wheel" },
  { src: "https://media.istockphoto.com/id/1388816698/photo/happy-pet-sitters-enjoying-with-group-of-dogs-during-a-walk-in-the-park.jpg?s=612x612&w=0&k=20&c=AxT0OZol2z6ogIOapwdI5hPRR-WI0tdFksxqIg94sIc=", alt: "Puppy playing with a chew toy" },
  { src: "https://www.petcareins.com/wp-content/uploads/2022/02/certifiedpet_hero.jpeg", alt: "Kitten curled up for a nap" },
  // Add more images as needed
];

const PetGalleryComponent = () => {
  return (
    <section className="py-3 bg-orange-100">
      <div className="container mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10 text-neutral-900">
  Pawsome Moments at <span className="text-5xl md:text-6xl text-orange-500 font-extrabold tracking-wide">
    Pawspace
  </span>
</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {petImages.map((image, index) => (
            <img 
              key={index} 
              src={image.src} 
              alt={image.alt} 
              className="w-full h-64 object-cover rounded-lg shadow-md" 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PetGalleryComponent;