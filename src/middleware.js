import { NextResponse } from "next/server";
import { verifyToken } from "@/utils/jwt";

const PUBLIC_ROUTES = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
];

// Ścieżki i wymagane role
const PROTECTED_ROUTES = {
  "/dashboard": ["admin", "employee", "physio"],
  "/patients": ["admin", "employee", "physio"],
  "/visits": ["admin", "employee", "physio"],
  "/appointments": ["admin", "employee"],
  "/employees": ["admin"],
  "/admin": ["admin"],
};

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Sprawdź, czy ścieżka jest publiczna
  if (PUBLIC_ROUTES.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Pobierz token z cookie
  const token = request.cookies.get("auth-token")?.value;

  // Jeśli nie ma tokena, przekieruj do logowania
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    // Zweryfikuj token i pobierz dane użytkownika
    const userData = await verifyToken(token);

    if (!userData || !userData.role) {
      // Nieprawidłowy token lub brak roli, przekieruj do logowania
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Sprawdź uprawnienia dla chronionych ścieżek
    for (const [route, roles] of Object.entries(PROTECTED_ROUTES)) {
      if (pathname.startsWith(route) && !roles.includes(userData.role)) {
        // Brak wymaganych uprawnień, przekieruj do dashboardu
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }

    // Wszystko w porządku, kontynuuj
    return NextResponse.next();
  } catch (error) {
    console.error("Błąd weryfikacji tokena:", error);
    // Błąd weryfikacji, przekieruj do logowania
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    // Wszystkie ścieżki z wyjątkiem statycznych plików i api
    "/((?!_next/static|_next/image|favicon.ico|api).*)",
  ],
};
