import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
// Components
import toast from "react-hot-toast";
// Hooks
import { useAuth } from "../../../app/hooks/useAuth";
// Services
import { authService } from "../../../app/services/auth/@index";
import { SignupParams } from "../../../app/services/auth/signup";
// Utils
import { LABEL_ERRORS } from "../../../app/utils/labelErrors";
// Validations
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().trim().nonempty(LABEL_ERRORS.EMPTY).min(2, LABEL_ERRORS.INVALID_NAME),
  email: z.string().nonempty(LABEL_ERRORS.EMPTY).email(LABEL_ERRORS.INVALID_EMAIL),
  password: z.string().nonempty(LABEL_ERRORS.EMPTY).min(8, LABEL_ERRORS.INVALID_PASSWORD),
});

type FormData = z.infer<typeof schema>;

export function useResgisterController() {
  const {
    formState: { errors },
    register,
    handleSubmit: hookFormHandleSubmit
  } = useForm<FormData>({
    // Validation is done in zodResolver
    resolver: zodResolver(schema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["signup"],
    mutationFn: async (data: SignupParams) => {
      return authService.signup(data);
    }
  });

  const { updateSignedIn } = useAuth();

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const { accessToken } = await mutateAsync(data);

      updateSignedIn(accessToken);
    } catch (msgError) {
      toast.error(`${msgError}`);
    }
  });

  return { isPending, errors, register, handleSubmit };
}
