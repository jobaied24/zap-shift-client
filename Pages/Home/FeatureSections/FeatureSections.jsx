// import your illustrations here
import illustration1 from "../../../src/assets/Transit warehouse.png";
import illustration2 from "../../../src/assets/safe_delivery.svg";
import illustration3 from "../../../src/assets/Vector.png";

const FeatureSections = () => {
  // feature data inside the component (no separate file)
  const features = [
    {
      title: "Live Parcel Tracking",
      description:
        "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
      illustration: illustration1,
    },
    {
      title: "100% Safe Delivery",
      description:
        "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
      illustration: illustration2,
    },
    {
      title: "24/7 Call Center Support",
      description:
        "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
      illustration: illustration3,
    },
  ];

  return (
    <section className="py-16 ">
      <div className="max-w-7xl mx-auto  flex flex-col gap-12">

        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col  bg-white py-14 px-8 rounded-3xl md:flex-row items-center gap-8"
          >
            {/* Illustration on the left */}
            <div className="flex-shrink-0 ">
              <img
                src={feature.illustration}
                alt={feature.title}
                className="w-40 md:w-42"
              />
            </div>

            {/* Dashed vertical line */}
            <div className="hidden md:block border-l-2 border-dashed border-gray-300 h-32"></div>

            {/* Text content */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-500">{feature.description}</p>
            </div>
          </div>
        ))}

      </div>
    </section>
  );
};

export default FeatureSections;
