import { Link } from "react-router-dom";


const categories = [
  "jeans.jpg",
  "/tshirts.jpg",
  "/shoes.jpg",
  "/glasses.png",
  "/jackets.jpg",
  "/suits.jpg",
  "/bags.jpg",
  "/phone.jpg",
  "/laptop.jpg",
];

const cargos = [
  "cargo1.jpg",
  "cargo2.jpg",
  "cargo3.jpg",
  "cargo4.jpg",
  "cargo5.jpg",
  "cargo6.jpg",
];

const shoes=["shoes1.jpg","shoes2.jpg","shoes3.jpg","shoes4.jpg","shoes5.jpg","shoes6.jpg"]
function HomePage() {

  return (
    <>
      <div className="grid grid-cols-3 gap-8 m-16 mt-40">
        {categories.map((image) => {
          return (
            <>
              <div key={image} className="shadow-lg shadow-gray-800">
                <Link to="/products">
                  <img src={image} className="h-96 w-full" />
                </Link>
              </div>
            </>
          );
        })}
      </div>

      <div className="w-full pl-20 pr-20">
        <Link to="/products">
          <img
            src="sale.jpg"
            className="w-full h-96 shadow-2xl shadow-gray-700"
          />
        </Link>
      </div>

      {/* ------------------------------------------------------------------- */}

      <div className="flex mr-20 ml-20 gap-10 mt-32">
        {cargos.map((cargo) => {
          return (
            <>
              <div key={cargo} className="w-60 h-80 rounded-2xl shadow-md shadow-gray-700">
                <Link to="/products">
                  <img src={cargo} className="w-full h-full rounded-2xl" />
                </Link>
              </div>
            </>
          );
        })}
      </div>

      <div className="flex mr-20 ml-20 gap-10 mt-10 mb-10">
        {shoes.map((shoe) => {
          return (
            <>
              <div key={shoe} className="w-60 h-80 rounded-2xl shadow-md shadow-gray-700">
                <Link to="/products">
                  <img src={shoe} className="w-full h-full rounded-2xl" />
                </Link>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}

export default HomePage;
