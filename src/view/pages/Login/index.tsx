import { Link } from "react-router-dom";
// Controllers
import { useLoginController } from "./useLoginController";
// Components
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

export function Login() {
  const {
    isPending,
    errors,
    register,
    handleSubmit,
  } = useLoginController();

  return (
    <>
      <header className="gap-4 flex flex-col items-center">
        <h1
          className="text-2xl font-bold tracking-[-0.5px]"
        >
          Log in to your account
        </h1>

        <p className="space-x-2">
          <span className="text-gray-700 tracking-[-0.5px]">
            New here?
          </span>

          <Link
            to="/register"
            className="font-medium text-teal-900 tracking-[-0.5px]"
          >
            Create an account
          </Link>
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="mt-16 flex flex-col gap-4 px-10"
      >
        <Input
          type="email"
          placeholder="Email"
          error={errors.email?.message}
          {...register("email")}
        />

        <Input
          type="password"
          placeholder="Password"
          error={errors.password?.message}
          {...register("password")}
        />

        <Button
          type="submit"
          className="mt-2"
          isLoading={isPending}
        >
          Login
        </Button>
      </form>
    </>
  );
}
