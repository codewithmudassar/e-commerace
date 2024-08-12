import React from "react";
import Carousel from "@/components/carousel";
import Famous from "@/components/Famous";
import Link from "next/link";

const Home = async () => {
  const images = [
    {
      url: 'https://img.freepik.com/free-photo/laptop-rocks-table-arrangement_23-2149672637.jpg',
      label: 'Shop Now',
    },
    {
      url: 'https://img.freepik.com/free-photo/elevated-view-laptop-stationeries-blue-backdrop_23-2147880457.jpg',
      label: 'Shop Now',
    },
    {
      url: "https://img.freepik.com/free-photo/top-view-keyboard-mouse-arrangement_23-2149386333.jpg",
      label: 'Shop Now',
    },
    {
      url: 'https://img.freepik.com/free-photo/office-desk-with-laptop_23-2148821886.jpg',
      label: 'Shop Now',
    },
  ];

  async function getData() {
    try {
      const res = await fetch("http://localhost:3000/api/products", {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    } catch (error) {
      console.error(error);
      return { message: [] }; // Return empty array if there's an error
    }
  }

  const data = await getData();

  return (
    <div>
      <div>
        <Carousel images={images} />
      </div>
      <div>
        <h2 className="font-extrabold text-2xl mt-11 text-orange-500 ml-5 drop-shadow-lg">Famous Products</h2>
        <Famous />
      </div>

      <div className="flex border w-11/12 h-12 bg-white m-auto mt-10">
        <div className="flex-1 mt-3 ml-1">
          <div className="overflow-hidden text-left whitespace-nowrap animate-marquee">
          <p>
  At this store, you can purchase a wide variety of items to meet all your needs. From everyday essentials and household goods to electronics, clothing, and unique gifts, our diverse selection ensures you&apos;ll find exactly what you&apos;re looking for. Whether you&apos;re shopping for yourself or searching for the perfect present, we have something for everyone. Enjoy the convenience of one-stop shopping with our extensive range of high-quality products.
</p>
 
          </div>
        </div>
      </div>

      <div>
        <h2 className="font-extrabold text-2xl mt-11 text-orange-500 ml-5 drop-shadow-lg">New Products</h2>
        <section className="container mx-auto p-10 md:py-12 px-0 md:p-8 md:px-0">
          <section className="md:mx-10 p-5 md:p-0 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-7">
            {data?.message.map((v, i) => (
              <Link
                key={i}
                href={`/singleproduct/${v._id}`}
                className="mx-3 bg-gray-100 rounded-lg overflow-hidden shadow-lg max-w-sm transform duration-500 hover:-translate-y-2"
              >
                <div className="relative">
                  <img
                    className="w-full h-56 object-cover"
                    src={v?.images[0] || "https://images.pexels.com/photos/7989741/pexels-photo-7989741.jpeg"}
                    alt={v.title || "Product Image"}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium mb-2 hover:text-orange-500 line-clamp-1">{v?.title}</h3>
                  <div className="flex items-center justify-between mt-5">
                    <div className="px-2 border-2 border-orange-200 rounded-md">{v?.category?.title}</div>
                    <span className="font-bold text-lg">RS.{v.price}</span>
                  </div>
                </div>
              </Link>
            ))}
          </section>
          <div className="flex mt-7 px-12">
            <button className="border w-full mx-auto font-bold bg-red-500 rounded-xl globalShadow border-red-500 text-2xl p-3">
              <Link href="/category">All Products</Link>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
