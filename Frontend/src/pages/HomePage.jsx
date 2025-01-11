import { Link } from "react-router-dom";

const categories = [
  "jeans.jpg",
  "tshirts.jpg",
  "shoes.jpg",
  "glasses.png",
  "jackets.jpg",
  "suits.jpg",
  "bags.jpg",
  "phone.jpg",
  "laptop.jpg",
];

const cargos = [
  "cargo1.jpg",
  "cargo2.jpg",
  "cargo3.jpg",
  "cargo4.jpg",
  "cargo5.jpg",
  "cargo6.jpg",
];

const shoes = [
  "shoes1.jpg",
  "shoes2.jpg",
  "shoes3.jpg",
  "shoes4.jpg",
  "shoes5.jpg",
  "shoes6.jpg",
];

// Reusable Component for Image Grids
function ImageGrid({ images, link, className }) {
  return (
    <div className={`flex flex-wrap gap-10 ${className}`}>
      {images.map((image, index) => (
        <div
          key={index}
          className="w-60 h-80 rounded-2xl shadow-md shadow-gray-700"
        >
          <Link to={link}>
            <img
              src={image}
              alt={`Image ${index + 1}`}
              className="w-full h-full rounded-2xl object-cover"
            />
          </Link>
        </div>
      ))}
    </div>
  );
}

function HomePage() {
  return (
    <>
      {/* Categories Section */}
      <div className="grid grid-cols-3 gap-8 m-16 mt-40">
        {categories.map((image, index) => (
          <div key={index} className="shadow-lg shadow-gray-800">
            <Link to="/products">
              <img
                src={image}
                alt={`Category ${index + 1}`}
                className="h-96 w-full object-cover"
              />
            </Link>
          </div>
        ))}
      </div>

      {/* Sale Banner */}
      <div className="w-full px-20">
        <Link to="/products">
          <img
            src="sale.jpg"
            alt="Sale Banner"
            className="w-full h-96 shadow-2xl shadow-gray-700 object-cover"
          />
        </Link>
      </div>

      {/* Cargos Section */}
      <ImageGrid images={cargos} link="/products" className="mt-32 mx-20" />

      {/* Shoes Section */}
      <ImageGrid
        images={shoes}
        link="/products"
        className="mt-10 mb-10 mx-20"
      />
    </>
  );
}

export default HomePage;
