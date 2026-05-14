"use client";

import { tipoEntrada, tipoSaida } from "@/libs/types/iTransacoes";
import { DatePicker, Radio, Select, Spin } from "antd";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {
  GET_CATEGORIAS,
  CategoriasResponse,
} from "@/graphql/queries/categorias";
import { useQuery } from "@apollo/client/react";

dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;

export interface iFiltros {
  filtros?: string[];
}

export default function Filtros({
  filtros = ["tipo", "categoria", "periodo"],
}: iFiltros) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const tipo = searchParams.get("tipo");
  const categoriaId = searchParams.get("categoriaId");
  const dataInicial = searchParams.get("data_inicial");
  const dataFinal = searchParams.get("data_final");

  const updateURL = (novosParams: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(novosParams).forEach(([chave, valor]) => {
      if (valor) {
        params.set(chave, valor);
      } else {
        params.delete(chave);
      }
    });

    replace(`${pathname}?${params.toString()}`);
  };

  const onRadioChange = (e: any) => {
    const novoValor = e.target.value;
    updateURL({ tipo: novoValor === tipo ? null : novoValor });
  };

  const onDateChange = (dates: any, dateStrings: [string, string]) => {
    updateURL({
      data_inicial: dates ? dateStrings[0] : null,
      data_final: dates ? dateStrings[1] : null,
    });
  };

  const { data: categoriasData, loading: loadingCategorias } =
    useQuery<CategoriasResponse>(GET_CATEGORIAS);

  const listaCategorias =
    categoriasData?.listarCategorias.map((cat) => ({
      label: cat.categoria,
      value: cat.id,
    })) || [];

  return (
    <div className="flex justify-end gap-3 w-full items-center">
      {filtros.includes("tipo") && (
        <Radio.Group buttonStyle="solid" value={tipo}>
          <Radio.Button value="entrada" onClick={onRadioChange}>
            Entrada
          </Radio.Button>
          <Radio.Button value="saida" onClick={onRadioChange}>
            Saída
          </Radio.Button>
        </Radio.Group>
      )}

      {filtros.includes("categoria") && (
        <Select
          options={listaCategorias}
          placeholder="Categorias"
          allowClear
          value={categoriaId}
          onChange={(val) => updateURL({ categoriaId: val })}
          style={{ width: 200 }}
          loading={loadingCategorias}
          notFoundContent={loadingCategorias ? <Spin size="small" /> : null}
        />
      )}

      {filtros.includes("periodo") && (
        <RangePicker
          format="DD/MM/YYYY"
          placeholder={["Data início", "Data fim"]}
          onChange={onDateChange}
          value={
            dataInicial && dataFinal
              ? [
                  dayjs(dataInicial, "DD/MM/YYYY"),
                  dayjs(dataFinal, "DD/MM/YYYY"),
                ]
              : null
          }
        />
      )}
    </div>
  );
}
