
import React from 'react'

const Category = async () => {

    async function getData() {
        const res = await fetch("http://localhost:3000/api/categories")
    
        return res.json()
      }
    
      const data = await getData()
    
      console.log(data?.message)
  return (
  <div>
      <select
        id="category"
        className=" border-white bg-white  pl-2 pr-4 capitalize  font-bold p-2 m-1"
      >
        <option selected="" className="ml-2">
          Category
        </option >
        {data?.message?.map((v, i) => {
          return (
            <>
              <option className='w-2/12'  key={i} value={v?._id}>
                {v?.title}
              </option>
            </>
          );
        })}
      </select>

  </div>

  )
}

export default Category
