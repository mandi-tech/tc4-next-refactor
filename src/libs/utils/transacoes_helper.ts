import dayjs from "dayjs";

/**
 * Parses and validates a currency value string/number into a valid number.
 * Supports both dot and comma as decimal separators.
 */
export const parseValorNumerico = (valor: string | number): number => {
  if (typeof valor === "number") return valor;
  if (!valor) return NaN;
  
  // Replace comma with dot for parsing
  const cleanValue = valor.replace(",", ".");
  return parseFloat(cleanValue);
};

/**
 * Gets the current user from localStorage.
 */
export const getCurrentUser = () => {
  if (typeof window === "undefined") return null;
  const userStr = localStorage.getItem("user");
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch (err) {
    console.error("Erro ao converter usuário do localStorage", err);
    return null;
  }
};

/**
 * Formats a date for the API (DD/MM/YYYY).
 */
export const formatarDataApi = (date: any): string => {
  if (!date) return "";
  return dayjs(date).format("DD/MM/YYYY");
};

/**
 * Converts a File object to a Base64 string.
 */
export const getBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
