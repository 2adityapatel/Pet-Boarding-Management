import React, { useState } from "react";
import { ChevronDown, ChevronUp } from 'lucide-react';

const FaqSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What services do you offer for pet boarding?",
      answer: "We offer comprehensive boarding services including daily feeding, exercise, and personalized care for pets during your absence. Our services also cater to pets with specific needs, ensuring a comfortable stay for all animals."
    },
    {
      question: "Can I bring my pet's favorite food or toy?",
      answer: "Absolutely! We encourage you to bring your pet's favorite food, toys, and bedding. Familiar items help create a sense of home and comfort for your pet during their stay with us."
    },
    {
      question: "What vaccinations are required for pet boarding?",
      answer: "For the safety of all our guests, we require up-to-date vaccinations. This includes rabies, distemper, and bordetella (for dogs). Please bring your pet's vaccination records at check-in. If you have any concerns about vaccinations, our staff is happy to discuss them with you."
    },
    {
      question: "How are pets supervised during boarding?",
      answer: "Our dedicated staff provides round-the-clock supervision to ensure the safety and comfort of all pets. We maintain a structured daily routine including feeding, exercise, and playtime. Additionally, we offer regular updates via text or email, so you can stay informed about your pet's well-being throughout their stay."
    },
    {
      question: "How do I book a boarding reservation?",
      answer: "Booking a reservation is easy! You can use our online booking system available on our website, which allows you to check availability and select your preferred dates. Alternatively, you can call us directly to speak with our staff who will assist you with the booking process. We recommend booking in advance, especially during peak seasons, to ensure availability."
    }
  ];

  return (
    <section className="py-12 bg-orange-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-orange-600">Frequently Asked Questions</h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                className="w-full text-left px-6 py-4 focus:outline-none"
                onClick={() => toggleAccordion(index)}
                aria-expanded={activeIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-800">{faq.question}</h3>
                  {activeIndex === index ? (
                    <ChevronUp className="text-orange-500" size={24} />
                  ) : (
                    <ChevronDown className="text-orange-500" size={24} />
                  )}
                </div>
              </button>
              <div
                id={`faq-answer-${index}`}
                className={`px-6 py-4 bg-orange-50 ${activeIndex === index ? 'block' : 'hidden'}`}
              >
                <p className="text-gray-600 font-medium">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;