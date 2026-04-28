"use client";

import { ChangeEvent, useState } from "react";
import styles from "./page.module.css";
import { listaExtratos, opcoesTransacao } from "../../public/assets/mock";
import { FormularioType } from "@/types/iFormulario";
import { adicionarTransacao } from "@/utils/transacao";
import { radii } from "@/styles/theme/radii";
import { palette } from "@/styles/theme/colors";
import { fontSizes } from "@/styles/theme/typography";

export default function Home() {
  const [valorInput, setValorInput] = useState<number>(0);
  const [descricao, setDescricao] = useState<string>("");
  const [valorSelect, setValorSelect] = useState<string>("");
  const [mostrarAlerta, setMostrarAlerta] = useState<boolean>(false);

  const userName = "Joana da Silva Oliveira";
  const firstName = userName.split(" ")[0];

  const valor = 1250.5;

  const [extratos, setExtratos] = useState(listaExtratos);

  const handleTransactionSubmit = (novaTransacao: FormularioType) => {
    const novosExtratos = adicionarTransacao(extratos, novaTransacao);
    setExtratos(novosExtratos);
  };

  const submeterTransacao = () => {
    const novaTransacao: FormularioType = {
      valor: valorInput,
      tipo: valorSelect,
      descricao: descricao,
    };

    handleTransactionSubmit(novaTransacao);

    setMostrarAlerta(true);

    setTimeout(() => {
      setMostrarAlerta(false);
    }, 3000);

    setValorInput(0);
    setDescricao("");
    setValorSelect("");
  };

  return <></>;
}
