import { Outlet } from "react-router-dom";
// Assets
import illustrationPng from "../../assets/images/illustration.png";
// Components
import { Logo } from "../components/Logo";

export function AuthLayout() {
  return (
    <div className="w-full h-full flex">
      <div className="w-full lg:w-1/2 px-2 gap-8 flex flex-col items-center justify-center">
        <Logo className="text-gray-500" />

        <div className="mt-16 w-full flex flex-col max-w-[504px] justify-center">
          <Outlet></Outlet>
        </div>
      </div>

      <div className="w-1/2 p-8 hidden lg:flex box-content justify-center items-center">
        <img
          src={illustrationPng}
          className="h-full max-w-[656px] max-h-[960px] object-cover"
        />
      </div>
    </div>
  );
}
