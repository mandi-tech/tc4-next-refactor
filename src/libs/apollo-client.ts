import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  CombinedGraphQLErrors,
} from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";
import { ErrorLink } from "@apollo/client/link/error";
import { HttpLink } from "@apollo/client/link/http";
import { notification } from "antd";

const httpLink = new HttpLink({
  uri:
    process.env.NEXT_PUBLIC_API_URL ||
    "https://tc4-backend-graphql-production.up.railway.app/graphql",
});

const authLink = new SetContextLink((prevContext) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
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
      // Check for expiration or unauthorized errors
      if (
        message.includes("Sessão expirada") ||
        message.includes("Não autorizado")
      ) {
        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.href = "/login";
        }
      }

      notification.error({
        title: "Erro no GraphQL",
        description: message,
        placement: "topRight",
      });
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      );
    });
  } else {
    notification.error({
      title: "Erro de Rede",
      description:
        "Não foi possível conectar ao servidor. Verifique sua conexão.",
      placement: "topRight",
    });
    console.error(`[Network error]: ${error}`);
  }
});

export const client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});
