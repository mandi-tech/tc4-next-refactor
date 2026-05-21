import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // Definição de páginas públicas (onde o usuário NÃO deve estar autenticado)
  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/novo_usuario");

  // Se o usuário não estiver autenticado e tentar acessar uma rota protegida
  if (!token && !isAuthPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Se o usuário já estiver autenticado e tentar acessar a página de login/cadastro
  if (token && isAuthPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|icon.svg|.*\\..*$).*)",
  ],
};
