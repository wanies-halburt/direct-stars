import axios from "axios";
import { create } from "zustand";
import toast from "react-hot-toast";

const getAuthHeader = () => ({
  headers: {
    authorization: `${localStorage.getItem("alakeys-token")}`,
  },
});

const shopStore = create((set) => ({
  isLoading: false,
  products: [],
  cart: [],
  error: null,
  getAllProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.get(`/api/fetch-products`);
      set({ products: res?.data?.data, isLoading: false });
    } catch (err) {
      set({
        error: err.response.data?.message || "Failed to fetch products",
        isLoading: false,
      });
    }
  },
  getCart: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.get(`/api/get-cart`, getAuthHeader());
      set({ cart: res?.data?.data, isLoading: false });
    } catch (err) {
      set({
        error: err.response.data?.message || "Failed to fetch cart",
        isLoading: false,
      });
    }
  },
  addToCart: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(
        `/api/add-cart`,
        { productId: id },
        getAuthHeader()
      );
      await shopStore.getState().getCart();
      set({ isLoading: false });
      toast.success(res.data?.message || "Product added to cart");
    } catch (err) {
      set({
        error: err.response.data?.message || "Failed to add product to cart",
        isLoading: false,
      });
      toast.error(
        err.response.data?.message || "Failed to add product to cart"
      );
    }
  },
  increaseQty: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(
        `/api/add-cart`,
        { productId: id, action: "increment" },
        getAuthHeader()
      );
      await shopStore.getState().getCart();
      set({ isLoading: false });
      toast.success(res.data?.message || "Quantity updated");
    } catch (err) {
      set({
        error:
          err.response.data?.message || "Failed to update product quantity",
        isLoading: false,
      });
      toast.error(
        err.response.data?.message || "Failed to update product quantity"
      );
    }
  },
  decreaseQty: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(
        `/api/add-cart`,
        { productId: id, action: "decrement" },
        getAuthHeader()
      );
      await shopStore.getState().getCart();
      set({ isLoading: false });
      toast.success(res.data?.message || "Quantity updated");
    } catch (err) {
      set({
        error:
          err.response.data?.message || "Failed to update product quantity",
        isLoading: false,
      });
      toast.error(
        err.response.data?.message || "Failed to update product quantity"
      );
    }
  },

  deleteFromCart: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(
        `/api/add-cart`,
        { productId: id, action: "remove" },
        getAuthHeader()
      );
      await shopStore.getState().getCart();
      set({ isLoading: false });
      toast.success(res.data?.message || "Product removed from cart");
    } catch (err) {
      set({
        error:
          err.response.data?.message || "Failed to remove product from cart",
        isLoading: false,
      });
      toast.error(
        err.response.data?.message || "Failed to remove product from cart"
      );
    }
  },
}));

export default shopStore;
