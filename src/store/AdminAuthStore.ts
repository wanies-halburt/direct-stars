import { type AdminUser, SubjectProps } from './../types/Admin';
import axios from "axios";
import Cookies from "js-cookie";
import { create } from "zustand";
import toast from "react-hot-toast";
import { CreateAdminPayload } from '@/app/(admin)/admin/(others-pages)/members/Admin.helpers';
import { CreateSubjectPayload } from '@/app/(admin)/admin/(others-pages)/subjects/Subject.helpers';

interface AdminAuthState {
  user: AdminUser | null;
  members: AdminUser[];
  token: string | null;
  loading: boolean;
  error: string | null;
  subjects: SubjectProps[];
  
  // Methods
  addNewAdmin: (payload: CreateAdminPayload) => Promise<boolean>;
  getAllAdmins: () => Promise<void>;
  getAllSubjects: () => Promise<void>;
  login: (credentials: { email: string; password: string }) => Promise<boolean>;
  loadFromStorage: () => void;
  logout: () => void;
  setAdminUserData: (data: AdminUser) => void;
  getAdminUserProfile: () => Promise<AdminUser | undefined>;
  createSubject: (payload: CreateSubjectPayload) => Promise<boolean>;
}


const getAuthHeader = () => ({
  headers: {
    authorization: `${localStorage.getItem("directstars_admin_token")}`,
  },
});
export const useAdminAuthStore = create<AdminAuthState>((set) => ({
  user: null,
  members: [],
  token: null,
  loading: false,
  error: null,
  subjects: [],

  // Register API
  addNewAdmin: async ({ email, role, phone, firstName, lastName }: CreateAdminPayload) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post(`/api/register-admin`, {
        email,
        role,
        phone,
        firstName,
        lastName,
      }, getAuthHeader());
      const store = useAdminAuthStore.getState() as { getAllAdmins: () => Promise<void> };
      await store.getAllAdmins();
      set({
        loading: false,
      });
      toast.success(
        res?.data?.message ??
          "User has been added"
      );
      return true;
    } catch (err: Error | unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error.response?.data?.message ?? "Failed to register user");
      set({
        error: error.response?.data?.message || "Registration failed",
        loading: false,
      });
      return false;
    }

  }, 
   getAllAdmins: async () => {    set({ loading: true, error: null });    try {  
        
    const res = await axios.get("/api/get-all-admin", getAuthHeader());
      set({ members: res?.data?.data, loading: false });
    } catch (err: Error | unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      set({
        error: error.response?.data?.message || "Failed to fetch all admins list",
        loading: false,
      });
    }
  },
  createSubject: async (subjectData: CreateSubjectPayload) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post(`/api/add-subject`, subjectData, getAuthHeader());
      const store = useAdminAuthStore.getState() as { getAllSubjects: () => Promise<void> };
      await store.getAllSubjects();
      set({
        loading: false,
      });
      toast.success(
        res?.data?.message ??
          "Subject has been added"
      );
      return true;
    } catch (err: Error | unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error.response?.data?.message ?? "Failed to register user");
      set({
        error: error.response?.data?.message || "Registration failed",
        loading: false,
      });
      return false;
    }
  },
  getAllSubjects: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get("/api/fetch-subjects", getAuthHeader());
      set({ subjects: res?.data?.data, loading: false });
    } catch (err: Error | unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      set({
        error: error.response?.data?.message || "Failed to fetch all subjects list",
        loading: false,
      });
    }
  },
  // Login API
  login: async ({ email, password }: {email: string, password: string}) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post(`/api/login-admin`, {
        email,
        password,
      });
      localStorage.setItem("directstars_admin_token", res.data.data.token);
      localStorage.setItem("directstars_admin_user", JSON.stringify(res.data.data.user));
      Cookies.set("directstars_admin_token", res?.data?.data.token, {
        expires: 7,
        sameSite: "Strict",
      });
      set({
        user: res.data.data.user,
        loading: false,
        token: res.data.data.token,
      });
      toast.success("Login successful");
      return true;
    } catch (err: Error | unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error.response?.data?.message ?? "Login Failed");
      set({
        error: error.response?.data?.message || "Login failed",
        loading: false,
      });
      return false;
    }
  },
  // forgetPassword: async ({ email }) => {
  //   set({ loading: true, error: null });
  //   try {
  //     const res = await axios.post(`/api/forget-password`, {
  //       email,
  //     });
  //     set({
  //       loading: false,
  //     });
  //     toast.success(res.data.message ?? "OTP has been sent to your email");
  //     return true;
  //   } catch (err) {
  //     toast.error(err.response.data?.message ?? "an error occured");
  //     set({
  //       error: err.response.data?.message || "email verification failed",
  //       loading: false,
  //     });
  //     return false;
  //   }
  // },
  // resetPassword: async ({ email, otp, password, confirmPassword }) => {
  //   set({ loading: true, error: null });
  //   try {
  //     const res = await axios.post(`/api/reset-password`, {
  //       email,
  //       otp,
  //       password,
  //       confirmPassword,
  //     });
  //     set({
  //       loading: false,
  //     });
  //     toast.success(res.data.message ?? "Password has been reset");
  //     return true;
  //   } catch (err) {
  //     toast.error(err.response.data?.message ?? "an error occured");
  //     set({
  //       error: err.response.data?.message || "An error occurred",
  //       loading: false,
  //     });
  //     return false;
  //   }
  // },

  loadFromStorage: () => {
    const token = localStorage.getItem("directstars_admin_token");
    const user = localStorage.getItem("directstars_admin_user");

    if (token && user) {
      set({ token, user: JSON.parse(user) });
    }
  },
  // Logout
  logout: () => {
    localStorage.removeItem("directstars_admin_user");
    Cookies.remove("directstars_admin_token");
    localStorage.removeItem("directstars_admin_token");
    set({ user: null, token: null });
    window.location.replace("/admin-login");
  },
  setAdminUserData: (data: AdminUser) => set({ user: data }),

  getAdminUserProfile: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`/api/get-admin-user`, getAuthHeader());
      set({
        user: res.data.data,
        loading: false,
      });
      localStorage.setItem("directstars_admin_user", JSON.stringify(res.data.data));
      return res.data.data;
    } catch (err) {
      console.error(err);
    }
  },
}));