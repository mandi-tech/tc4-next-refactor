import CryptoJS from "crypto-js";

// Chave secreta de criptografia (preferencialmente definida em variáveis de ambiente)
const SECRET_KEY = process.env.NEXT_PUBLIC_CRYPTO_KEY || "bytebank-super-secret-crypto-key-2026!";

/**
 * Criptografa um dado qualquer e retorna em formato string
 */
export const encrypt = (data: any): string => {
  try {
    const stringData = typeof data === "string" ? data : JSON.stringify(data);
    return CryptoJS.AES.encrypt(stringData, SECRET_KEY).toString();
  } catch (error) {
    console.error("Erro ao criptografar dados:", error);
    return "";
  }
};

/**
 * Descriptografa uma string encriptada e tenta retornar o formato original (string ou objeto parsed)
 */
export const decrypt = <T = any>(ciphertext: string | null): T | null => {
  if (!ciphertext) return null;
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
    if (!decryptedText) return null;

    try {
      return JSON.parse(decryptedText) as T;
    } catch {
      return decryptedText as unknown as T;
    }
  } catch (error) {
    console.error("Erro ao descriptografar dados (possível adulteração ou chave inválida):", error);
    return null;
  }
};

/**
 * Define um item criptografado no localStorage
 */
export const setSecureItem = (key: string, value: any): void => {
  if (typeof window === "undefined") return;
  const encryptedValue = encrypt(value);
  if (encryptedValue) {
    localStorage.setItem(key, encryptedValue);
  }
};

/**
 * Lê e descriptografa um item do localStorage
 */
export const getSecureItem = <T = any>(key: string): T | null => {
  if (typeof window === "undefined") return null;
  const encryptedValue = localStorage.getItem(key);
  return decrypt<T>(encryptedValue);
};

/**
 * Remove um item do localStorage
 */
export const removeSecureItem = (key: string): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(key);
};

/**
 * Helpers nativos para manipulação de Cookies (leitura no Servidor/Middleware)
 */
export const setCookie = (name: string, value: string, days = 7): void => {
  if (typeof window === "undefined") return;
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "; expires=" + date.toUTCString();
  
  // Define o cookie de forma segura com SameSite=Strict e Secure
  const secureFlag = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=${encodeURIComponent(value)}${expires}; path=/; SameSite=Strict${secureFlag}`;
};

export const getCookie = (name: string): string | null => {
  if (typeof window === "undefined") return null;
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
  }
  return null;
};

export const removeCookie = (name: string): void => {
  if (typeof window === "undefined") return;
  document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Strict;`;
};
