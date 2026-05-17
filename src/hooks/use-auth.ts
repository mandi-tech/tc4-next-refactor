import { useMutation } from "@apollo/client/react";
import { LOGIN_MUTATION, LoginResponse, LoginVariables, CRIAR_USUARIO_MUTATION, CriarUsuarioResponse, CriarUsuarioVariables } from "@/graphql/mutations/auth";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const router = useRouter();

  const [loginMutation, { loading, error }] = useMutation<LoginResponse, LoginVariables>(LOGIN_MUTATION, {
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

  const login = async (email: string, senha: string) => {
    return await loginMutation({
      variables: { email, senha },
    });
  };

  const registrar = async (nome: string, email: string, senha: string) => {
    return await registerMutation({
      variables: { nome, email, senha },
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
    registrar,
    logout,
    loginLoading: loading,
    loginError: error,
    registerLoading,
    registerError,
  };
};
