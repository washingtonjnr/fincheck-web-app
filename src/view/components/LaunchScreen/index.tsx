import { Transition } from "@headlessui/react";
import { Logo } from "../Logo";
import { Spinner } from "../Spinner";

type LaunchScreenProps = {
  isLoading: boolean;
}

export function LaunchScreen({ isLoading }: LaunchScreenProps) {
  return (
    <Transition
      show={isLoading}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="flex flex-col items-center justify-center gap-4 w-full h-full fixed top-0 left-0 bg-teal-900">
        <Logo className="text-white" />

        <Spinner className="w-4 h-4" />
      </div>
    </Transition>
  );
}
