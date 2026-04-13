import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import { FaQuoteLeft } from "react-icons/fa";
import reviewImg from '../../../src/assets/customer-top.png';

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";


const CustomerReviews = () => {
    const reviews = [
        {
            name: "John Smith",
            role: "E-commerce Owner",
            text: "Their delivery service is fast, reliable, and extremely professional. Highly recommended!",
            image: "https://i.pravatar.cc/100?img=1",
        },
        {
            name: "Ayesha Rahman",
            role: "Online Seller",
            text: "Cash on delivery and tracking system made my business much easier to manage.",
            image: "https://i.pravatar.cc/100?img=2",
        },
        {
            name: "David Miller",
            role: "Corporate Manager",
            text: "Professional logistics support with timely delivery. Excellent experience overall.",
            image: "https://i.pravatar.cc/100?img=3",
        },
        {
            name: "Nusrat Jahan",
            role: "SME Owner",
            text: "Their customer support is outstanding. I always get help whenever I need.",
            image: "https://i.pravatar.cc/100?img=4",
        },
        {
            name: "Michael Lee",
            role: "Retail Business Owner",
            text: "Secure handling and safe delivery every time. Trustworthy service.",
            image: "https://i.pravatar.cc/100?img=5",
        },
        {
            name: "Sarah Khan",
            role: "Entrepreneur",
            text: "Smooth delivery process and excellent tracking features. Very satisfied.",
            image: "https://i.pravatar.cc/100?img=6",
        },
    ];

    return (
        <section className="py-20 bg-base-200">
            <div className="max-w-7xl mx-auto px-4">

                {/* Top content */}
                <div className="text-center max-w-2xl mx-auto mb-14">
                    <img
                        src={reviewImg}
                        alt="Review"
                        className="w-48 mx-auto mb-4"
                    />
                    <h2 className="text-3xl md:text-4xl text-primary font-bold mb-4">
                        What our customers are sayings
                    </h2>
                    <p className="text-gray-600">
                        Enhance posture, mobility, and well-being effortlessly with Posture Pro.
                        Achieve proper alignment, reduce pain, and strengthen your body with ease!
                    </p>
                </div>

                {/* Slider */}
                <Swiper
                    modules={[EffectCoverflow, Pagination, Navigation]}
                    effect="coverflow"
                    centeredSlides
                    slidesPerView={1}
                    spaceBetween={30}
                    loop

                    pagination={{
                        el: ".swiper-pagination",
                        clickable: true
                    }}
                    navigation={{
                        nextEl: ".swiper-next",
                        prevEl: ".swiper-prev",
                    }}
                    breakpoints={{
                        768: {
                            slidesPerView: 3,
                        },
                    }}
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 100,
                        modifier: 2,
                        slideShadows: false,
                    }}
                >
                    {reviews.map((review, index) => (
                        <SwiperSlide key={index}>
                            {({ isActive }) => (
                                <div
                                    className={`bg-white p-6 rounded-lg shadow-md relative transition-all duration-300
                    ${isActive ? "opacity-100 scale-100" : "opacity-40 scale-90"}
                  `}
                                >
                                    {/* Quote icon */}
                                    <FaQuoteLeft className="absolute left-4 text-4xl text-gray-300 opacity-70" />

                                    {/* Review text */}
                                    <p className="text-gray-600 mt-10 my-6">
                                        {review.text}
                                    </p>

                                    {/* Dashed line */}
                                    <div className="border-t border-dashed mb-4"></div>

                                    {/* Reviewer */}
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={review.image}
                                            alt={review.name}
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                        <div>
                                            <h4 className="font-semibold">{review.name}</h4>
                                            <p className="text-sm text-gray-500">{review.role}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Navigation + Pagination container */}
                <div className="flex justify-center items-center gap-20 mt-8">
                    <button className="swiper-prev btn btn-circle btn-sm hover:bg-primary">
                        ❮
                    </button>

                    <div className="swiper-pagination"></div>

                    <button className="swiper-next btn btn-circle btn-sm hover:bg-primary">
                        ❯
                    </button>
                </div>


            </div>
        </section>
    );
};

export default CustomerReviews;
