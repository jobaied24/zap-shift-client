import Marquee from "react-fast-marquee";

// import your logos here
import logo1 from "../../../src/assets/brands/amazon.png";
import logo2 from "../../../src/assets/brands/amazon_vector.png";
import logo3 from "../../../src/assets/brands/casio.png";
import logo4 from "../../../src/assets/brands/moonstar.png";
import logo5 from "../../../src/assets/brands/randstad.png";
import logo6 from "../../../src/assets/brands/star.png";
import logo7 from "../../../src/assets/brands/start_people.png";

const ClientLogoMarquee = () => {

  // logo list inside component (NO extra file)
  const logos = [
    logo1,
    logo2,
    logo3,
    logo4,
    logo5,
    logo6,
    logo7,
  ];

  return (
    <section className="py-16 ">
      <div className="max-w-7xl mx-auto px-4">

        {/* Title */}
        <h2 className="text-3xl font-bold text-primary text-center mb-10">
          Trusted by Our brands
        </h2>

        {/* Marquee */}
        <Marquee
          speed={50}
          pauseOnHover
          gradient={false}
        >
          {logos.map((logo, index) => (
            <div
              key={index}
              className="mx-12 p-4 rounded-lg "
            >
              <img
                src={logo}
                alt="Client logo"
                className="h-6 w-auto object-contain "
              />
            </div>
          ))}
        </Marquee>

      </div>
    </section>
  );
};

export default ClientLogoMarquee;
