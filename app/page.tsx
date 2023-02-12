"use client";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import AppContext from "@/context/AppContext";

export default function Home() {
  const { setUser } = useContext(AppContext);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    if (!errors.name) {
      router.push("/game");
      setUser(data.name);
    }
  };

  return (
    <main>
      <h1 className="text-center text-3xl font-bold py-5 text-white">
        Please enter your name
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className=" text-center">
        <input {...register("name", { required: true })} className="p-1" />
        <button type="submit" className=" bg-slate-500 p-1">
          Submit
        </button>
        {errors.name && (
          <p className=" text-red-500 pt-2">
            You need to input your name in order to continue
          </p>
        )}
      </form>
    </main>
  );
}
