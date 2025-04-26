import axios from "axios";
import Cookies from "js-cookie";
import { create } from "zustand";
import { BASE_URL } from "@/utils";
import toast from "react-hot-toast";

export const useProjectStore = create((set) => ({
  loading: false,
  error: null,
  projects: [],

  // Fetch projects
  getProjects: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${BASE_URL}/protected/project`);
      set({
        projects: res.data, // Update state with the fetched projects
        loading: false,
      });
    } catch (err) {
      set({
        error: err.response?.data?.message || "An error occurred",
        loading: false,
      });
    }
  },

  // Create a new project
  createProject: async ({ payload }) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post(`${BASE_URL}/protected/project`, {
        ...payload,
      });
      set({
        loading: false,
      });
      console.log(res);
    } catch (err) {
      console.error(err);
      set({
        error: err.response?.data?.message || "an error occurred",
        loading: false,
      });
    }
  },

  // Edit a project
  editProject: async (id, payload) => {
    set({ loading: true, error: null });
    try {
      await axios.put(`${BASE_URL}/protected/project/${id}`, payload);
      toast.success("Project updated successfully");
      await useProjectStore.getState().getProjects(); // Refetch projects
      set({ loading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || "An error occurred",
        loading: false,
      });
    }
  },

  // Delete a project
  deleteProject: async (id) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`${BASE_URL}/protected/project/${id}`);
      toast.success("Project deleted successfully");
      await useProjectStore.getState().getProjects(); // Refetch projects
      set({ loading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || "An error occurred",
        loading: false,
      });
    }
  },
}));
