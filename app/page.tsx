"use client";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import AppContext from "@/context/AppContext";

type Inputs = {
  name: string;
};

// TODO: handle all of your any types
export default function Home() {
  const { setUser } = useContext(AppContext);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // TODO: does this matter the order, i.e. will router run before setstate
    router.push("/game");
    setUser(data.name);
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
        {/* should this be closer to input? */}
        {errors.name && (
          <p className=" text-red-500 pt-2">
            You need to input your name in order to continue
          </p>
        )}
      </form>
    </main>
  );
}
