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
        <div className="bg-white shadow-md rounded-xl px-12 py-16 flex flex-col gap-6 w-full max-w-md">
          <div className="flex flex-col items-center gap-6">
            <div className="bg-primary p-3 rounded-lg text-white">
              <Truck />
            </div>

            <p className="font-bold text-2xl">Fleet Logistic</p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase">Email</label>
              <input
                type="email"
                placeholder="email@mail.id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-100 border rounded-md px-4 py-2"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase">Password</label>
              <input
                type="password"
                placeholder="•••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-100 border rounded-md px-4 py-2"
              />
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary delay-75 transition"
            >
              Sign In
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

export default LoginPage;
