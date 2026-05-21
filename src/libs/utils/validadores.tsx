export const validarEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validarNomeCompleto = (nome: string): boolean => {
  const nomeLimpo = nome.trim();
  const partes = nomeLimpo.split(/\s+/);
  return partes.length >= 2 && partes.every((p) => p.length >= 2);
};

export const validarSenha = (senha: string): boolean => {
  const temSeisDigitos = senha.length >= 6;
  const temLetraMinuscula = /[a-z]/.test(senha);
  const temLetraMaiuscula = /[A-Z]/.test(senha);
  const temNumero = /[0-9]/.test(senha);
  const temCaractereEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(senha);

  return (
    temSeisDigitos && temLetraMinuscula && temLetraMaiuscula && temNumero && temCaractereEspecial
  );
};
