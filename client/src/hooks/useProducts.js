import { useState, useEffect } from "react";
import axiosInstance from "../api/axios";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axiosInstance.get("/products");
        setProducts(response.data);
      } catch (err) {
        setError(err.message || "Ошибка при загрузке продуктов");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};
