import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import apiCalls from "../helpers/apiCalls";
import SearchProductCard from "../components/SearchProductCard";

const SearchProduct = () => {
  const query = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSearchproduct = async () => {
    if (query.search === "") {
      setData([]);
    } else {
      setLoading(true);
      const responseData = await fetch(
        apiCalls.searchProduct.url + query.search
      );

      const actualData = await responseData.json();
      setLoading(false);
      setData(actualData.data);
    }
  };

  useEffect(() => {
    fetchSearchproduct();
  }, [query]);

  return (
    <div className="container mx-auto p-4 lg:px-8 ">
      {loading && <p className="text-lg text-center">Loading...</p>}

      <p className="text-lg font-semibold py-3">
        Search Results : {data.length}
      </p>

      {data.length === 0 && !loading && (
        <p className="bg-white text-lg text-center p-4">No Data Found....</p>
      )}

      {data.length !== 0 && !loading && (
        <SearchProductCard loading={loading} data={data} />
      )}
    </div>
  );
};

export default SearchProduct;
