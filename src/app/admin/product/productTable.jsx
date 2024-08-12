
import Deletebutton from "@/components/Deletepr";
import Link from "next/link";

async function getData() {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });
  return res.json();
}

const ProductTable = async () => {
  const data = await getData();
  
  // console.log(data?.message)
  return (
    <div>
      <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead class="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" class="px-6 py-3">
                Product name
              </th>
              <th scope="col" class="px-6 py-3">
                stock
              </th>
              <th scope="col" class="px-6 py-3">
                Category
              </th>
              <th scope="col" class="px-6 py-3">
                Price
              </th>
              <th scope="col" class="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.message.map((v, i) => {
              return (
                <tr key={i} className="bg-white border-b">
                  <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex items-center">
                  <div className="w-10 h-10 mr-3 border border-gray-100 rounded-full overflow-hidden">
                      <img
                        className="w-full h-full object-contain"
                        src={v.images[0] || "https://github.com/scriptwithahmad/u-shop-2.0/blob/main/public/user.jpeg?raw=true"}
                        alt="User Image"
                      />
                    </div>
                    {v?.title}
                  </th>
                  <td className="px-6 py-4">{v?.stock}</td>
                  <td className="px-6 py-4">{v?.category?.title}</td>
                  <td className="px-6 py-4">{v?.price}</td>
                  <td className="px-9 py-4">
                    <div className="flex items-center gap-4">
                      <Deletebutton id={v._id} />
                      <Link href={`/admin/product/${v._id}`}>
                        <i className="bx bxs-edit-alt"></i>
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
