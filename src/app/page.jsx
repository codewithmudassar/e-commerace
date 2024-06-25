import React from "react";
import Category from "@/components/Category";
import Carousel from "@/components/carousel";
import Link from "next/link";

const Home = async () => {
  async function getData() {
    const res = await fetch("http://localhost:3000/api/products");
    return res.json();
  }

  const data = await getData();
  console.log(data);
  function createMarkup(desc) {
    return { __html: desc };
  }
  var slides = [
    "https://picsum.photos/id/271/1210/300 ",
    "https://picsum.photos/id/279/1210/300 ",
    "https://picsum.photos/id/273/1210/300",
    "https://picsum.photos/id/274/1210/300 ",
    "https://picsum.photos/id/278/1210/300 ",
    "https://picsum.photos/id/276/1210/300 ",
  ];
  return (
    <div>
      <h1 className="text-5xl m-7 text-center font-bold text-orange-600">
        Amazon{" "}
      </h1>
      <div className=" max-w-full mx-24  border">
        <Carousel autoSlide={true}>
          {slides.map((s) => (
            <img src={s} alt="" />
          ))}
        </Carousel>
      </div>
      <div className=" flex border w-11/12 h-12 bg-white m-auto mt-10  ">
        <div>
          <Category />
        </div>
        <div className="flex-1 mt-3 ml-1">
          <marquee behavior="loop" direction="left">
            {" "}
            <p>
              At this store, you can purchase a wide variety of items to meet
              all your needs. From everyday essentials and household goods to
              electronics, clothing, and unique gifts, our diverse selection
              ensures you'll find exactly what you're looking for. Whether
              you're shopping for yourself or searching for the perfect present,
              we have something for everyone. Enjoy the convenience of one-stop
              shopping with our extensive range of high-quality products.
            </p>
          </marquee>
        </div>
      </div>
      {/* product   ....  .. . . . . .  */}

      <div>
        <section className="container  mx-auto p-10 md:py-12 px-0 md:p-8 md:px-0">
          <section className="p-5 md:p-0 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-7  ">
            {data?.message.map((v, i) => {
              return (
                <Link
                  href={`/singleproduct/${v._id}`}
                  className=" mx-3 bg-orange-100  rounded-lg overflow-hidden shadow-lg max-w-sm transform duration-500 hover:-translate-y-2"
                >
                  <div class="relative">
                    <img
                      className="w-full"
                      // src="https://images.pexels.com/photos/7989741/pexels-photo-7989741.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                      src={
                        v?.images[0] ||
                        "https://images.pexels.com/photos/7989741/pexels-photo-7989741.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                      }
                      alt="Product Image"
                    />
                  </div>
                  <div class="p-4">
                    <h3 class="text-lg font-medium mb-2">{v?.title}</h3>
                    <div
                      className=" text-xs line-clamp-2"
                      dangerouslySetInnerHTML={createMarkup(v?.desc)}
                    />
                    <div class="flex items-center justify-between mt-2">
                      <span class="font-bold text-lg"> RS.{v.price}</span>
                      <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                        Add to cart
                      </button>
                    </div>
                  </div>
                </Link>
              );
            })}
          </section>
        </section>
      </div>
    </div>
  );
};
export default Home;
