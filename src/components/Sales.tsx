import Title from "./utils/Title";
import Item from "./utils/Item";
import { useGetProductsQuery } from "../api/products";

const Sales = ({ ifExists, endpoint: { title, items } }) => {
  const { data = [] } = useGetProductsQuery();

  console.log(data);

  return (
    <>
      <div className="nike-container">
        <Title title={title} />
        <div
          className={`grid items-center justify-items-center gap-7 lg:gap-5 mt-7  ${
            ifExists
              ? "grid-cols-3 xl:grid-cols-2 sm:grid-cols-1"
              : " grid-cols-4 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1"
          }`}
        >
          {items?.map((elem: any) => (
            <Item {...elem} key={elem.id} ifExists={ifExists} />
          ))}
          {data.length > 0 &&
            data.map(
              (elem: {
                name: string;
                categoryId: number;
                subCategoryId: number;
                brandId: number;
                price: number;
                discount: number;
                hasDiscount: boolean;
                isNew: boolean;
                properties: any[];
                media: any[];
              }) => {
                return (
                  <div className="flex items-center gap-5 from-indigo-700 to-indigo-700 shadow-lg shadow-indigo-500">
                    <div
                      className={`relative rounded p-3 hover:scale-105 transition-all duration-300 ease-in-out grid items-center `}
                    >
                      <img
                        src={import.meta.env.VITE_APP_FILES_URL + elem.media[0].src}
                        alt={`img/cartItem/${elem.name}`}
                        className="w-36 h-auto object-fill lg:w-28"
                      />
                      <div className="absolute right-1 top-1 blur-theme-effect bg-white/80 text-black text-xs px-1 rounded">
                        ${elem.price}
                      </div>
                    </div>
                    <div className="grid items-center gap-4">
                      <div className="grid items-center leading-none">
                        <h1 className=" font-medium text-lg text-slate-900 lg:text-sm">
                          {elem.name}
                        </h1>
                        <p className="text-sm text-slate-800 lg:text-xs">
                          {elem.categoryId}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
        </div>
      </div>
    </>
  );
};

export default Sales;
