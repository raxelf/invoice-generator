import Head from "next/head";
import Cookies from "js-cookie";
import api from "@/utils/axios";
import axios from "axios";
import toast from "react-hot-toast";

import { Truck } from "lucide-react";
import { useState, FormEvent } from "react";
import { useRouter } from "next/router";
import { LoginResponse } from "@/types/auth";

const LoginPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const loginPromise = api
      .post<LoginResponse>("/login", { email, password })
      .then((res) => {
        Cookies.set("token", res.data.data.token, {
          expires: 1,
          sameSite: "Lax",
        });

        router.push("/");
        return res;
      });

    toast.promise(loginPromise, {
      loading: "Signing in...",
      success: "Login successful!",
      error: (err) => {
        if (axios.isAxiosError(err)) {
          return err.response?.data?.message ?? "Login failed";
        }
        return "Unexpected error";
      },
    });
  };

  return (
    <>
      <Head>
        <title>Login | Fleet Logistic</title>
      </Head>

      <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white shadow-xl shadow-gray-200/50 rounded-2xl border border-gray-100 px-8 py-12 flex flex-col gap-8 w-full max-w-md">
          <div className="flex flex-col items-center gap-4">
            <div className="bg-primary p-4 rounded-2xl text-white shadow-lg shadow-primary/20">
              <Truck size={32} />
            </div>

            <div className="text-center">
              <h1 className="font-bold text-2xl text-gray-900 tracking-tight">Fleet Logistic</h1>
              <p className="text-gray-500 text-sm mt-1">Sign in to manage your shipments</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-5 text-gray-700">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="email@mail.id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-50 border-none rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-gray-300"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                Password
              </label>
              <input
                type="password"
                placeholder="•••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-50 border-none rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-gray-300"
              />
            </div>

            <button
              type="submit"
              className="mt-2 w-full px-4 py-4 bg-primary text-white rounded-xl font-bold hover:bg-secondary shadow-lg shadow-primary/30 transition-all active:scale-[0.98]"
            >
              Sign In
            </button>
          </form>

          <p className="text-center text-xs text-gray-400">
            &copy; 2026 Fleet Logistic. All rights reserved.
          </p>
        </div>
      </main>
    </>
  );
};


export default LoginPage;
