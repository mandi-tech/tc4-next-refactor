import dayjs from "dayjs";

export const parseValorNumerico = (valor: string | number): number => {
  if (typeof valor === "number") return valor;
  if (!valor) return NaN;

  const cleanValue = valor.replace(",", ".");
  return parseFloat(cleanValue);
};

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

export const formatarDataApi = (date: any): string => {
  if (!date) return "";
  return dayjs(date).format("DD/MM/YYYY");
};

export const getBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
