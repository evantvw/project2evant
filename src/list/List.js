import { useContext, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Items from "../items/Items";
import { DarkMode } from "../context/DarkMode";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, getProductPending, getProducts } from "../fetchSlice";

const List = ({ search, filter, sort }) => {
  const dispatch = useDispatch();
  const products = useSelector(getProducts);
  const productPending = useSelector(getProductPending);
  const { isDarkMode } = useContext(DarkMode);

  useEffect(() => {
    async function getProducts() {
      try {
        await dispatch(fetchData({ filter, sort }));
      } catch (e) {
        console.log("error : ", e);
      }
    }
    getProducts();
  }, [filter, sort, dispatch]);

  return (
    <>
      {productPending ? (
        <div className="absolute left-1/2 top-1/2 lg:hidden">
          <CircularProgress size="1.5rem" color="inherit" />
        </div>
      ) : (
        <table className="ml-5 lg:hidden">
          <thead
            className={`${isDarkMode ? "text-gray-100" : "text-gray-600"}`}
          >
            {products.filter((product) =>
              product.title.toLowerCase().includes(search.trim().toLowerCase())
            ).length > 0 && (
              <tr className="border-b-2">
                <th scope="col" colSpan={2} className="py-2">
                  Product
                </th>
                <th scope="col" className="py-2">
                  Price
                </th>
                <th scope="col" className="py-2">
                  Category
                </th>
                <th scope="col" className="py-2">
                  Ratings
                </th>
                <th scope="col" className="py-2 pl-2">
                  Sold
                </th>
              </tr>
            )}
          </thead>

          <tbody
            className={`${isDarkMode ? "text-gray-100" : "text-gray-600"}`}
          >
            {products.length > 0 &&
              products
                .filter((product) =>
                  search.trim().toLowerCase() === ""
                    ? product
                    : product.title.toLowerCase().includes(search.toLowerCase())
                )
                .map((product) => <Items key={product.id} data={product} />)}
          </tbody>
        </table>
      )}
      {/* mobile view */}
      {productPending ? (
        <div className="hidden lg:block ml-36 mt-40">
          <CircularProgress size="1.5rem" color="inherit" />
        </div>
      ) : (
        <div className="hidden lg:block ml-5">
          {products.length > 0 &&
            products
              .filter((product) =>
                search.trim().toLowerCase() === ""
                  ? product
                  : product.title.toLowerCase().includes(search.toLowerCase())
              )
              .map((product) => <Items key={product.id} data={product} />)}
        </div>
      )}
    </>
  );
};

export default List;
