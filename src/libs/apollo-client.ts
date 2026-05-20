import { ApolloClient, InMemoryCache, ApolloLink, CombinedGraphQLErrors } from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";
import { ErrorLink } from "@apollo/client/link/error";
import { HttpLink } from "@apollo/client/link/http";
import antdStatic from "./utils/antd-static";
import { createHttpLink } from "@apollo/client";

const apiUri = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/graphql";

const httpLink = createHttpLink({
  uri: apiUri,
});

const authLink = new SetContextLink((prevContext) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return {
    headers: {
      ...prevContext.headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const errorLink = new ErrorLink(({ error }) => {
  if (CombinedGraphQLErrors.is(error)) {
    error.errors.forEach(({ message, locations, path }) => {
      if (message.includes("Sessão expirada") || message.includes("Não autorizado")) {
        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.href = "/login";
        }
      }

      const sanitizedMessage = message.includes("Internal server error")
        ? "Ocorreu um erro interno no servidor. Tente novamente mais tarde."
        : message;

      antdStatic.notification?.error({
        title: "Erro no GraphQL",
        description: sanitizedMessage,
        placement: "topRight",
      });
      console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
    });
  } else {
    antdStatic.notification?.error({
      title: "Erro de Rede",
      description: "Não foi possível conectar ao servidor. Verifique sua conexão.",
      placement: "topRight",
    });
    console.error(`[Network error]: ${error}`);
  }
});

export const client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});
