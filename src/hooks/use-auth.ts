import { useMutation } from "@apollo/client/react";
import { 
  LOGIN_MUTATION, 
  LoginResponse, 
  LoginVariables, 
  CRIAR_USUARIO_MUTATION, 
  CriarUsuarioResponse, 
  CriarUsuarioVariables 
} from "@/graphql/mutations/auth";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const router = useRouter();

  const [loginMutation, { loading: loginLoading, error: loginError }] = useMutation<LoginResponse, LoginVariables>(LOGIN_MUTATION, {
    onCompleted: (data) => {
      if (typeof window !== "undefined") {
        localStorage.setItem("token", data.login.token);
        localStorage.setItem("user", JSON.stringify(data.login.usuario));
      }
      router.push("/");
    },
  });

  const [registerMutation, { loading: registerLoading, error: registerError }] = useMutation<CriarUsuarioResponse, CriarUsuarioVariables>(CRIAR_USUARIO_MUTATION, {
    onCompleted: () => {
      router.push("/login");
    },
  });

  const login = async (email: string, password: string) => {
    return await loginMutation({
      variables: { email, senha: password },
    });
  };

  const register = async (name: string, email: string, password: string) => {
    return await registerMutation({
      variables: { nome: name, email, senha: password },
    });
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    router.push("/login");
  };

  return {
    login,
    register,
    logout,
    loginLoading,
    loginError,
    registerLoading,
    registerError,
  };
};