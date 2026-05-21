import { useMutation } from "@apollo/client/react";
import {
  LOGIN_MUTATION,
  LoginResponse,
  LoginVariables,
  CRIAR_USUARIO_MUTATION,
  CriarUsuarioResponse,
  CriarUsuarioVariables,
} from "@/graphql/mutations/auth";
import { useRouter } from "next/navigation";
import { setSecureItem, removeSecureItem, setCookie, removeCookie } from "@/libs/utils/secure-store";
import { currentUserVar } from "@/libs/apollo-client";

export const useAuth = () => {
  const router = useRouter();

  const [loginMutation, { loading: loginLoading, error: loginError }] = useMutation<
    LoginResponse,
    LoginVariables
  >(LOGIN_MUTATION, {
    onCompleted: (data) => {
      if (typeof window !== "undefined") {
        setSecureItem("token", data.login.token);
        setSecureItem("user", data.login.usuario);
        setCookie("token", data.login.token, 7); // Expira em 7 dias
        currentUserVar(data.login.usuario); // Atualiza reativamente
      }
      router.push("/");
    },
  });

  const [registerMutation, { loading: registerLoading, error: registerError }] = useMutation<
    CriarUsuarioResponse,
    CriarUsuarioVariables
  >(CRIAR_USUARIO_MUTATION, {
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
      removeSecureItem("token");
      removeSecureItem("user");
      removeCookie("token");
      currentUserVar(null); // Limpa reativamente
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
