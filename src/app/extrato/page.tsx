"use client";

import InputTexto from "@/components/input";
import RangeDateInput from "@/components/range_date";
import SelectInput from "@/components/select";
import Tabela from "@/components/tabela";
import { tipoEntrada, tipoSaida } from "@/types/iTransacoes";
import { colunasExtrato, dataMock } from "@/utils/tabela_transacao";
import { SearchOutlined } from "@ant-design/icons";
import { Input, Radio } from "antd";

export default function ExtratoPage() {
  const listaCategorias = [...tipoEntrada, ...tipoSaida].map((item) => ({
    label: item.tipo,
    value: item.tipo,
  }));
  return (
    <div>
      <section className="flex flex-col gap-2 w-full mb-4">
        <InputTexto
          size="large"
          placeholder="Busca por descrição"
          prefixo={<SearchOutlined />}
        />
        <div className="flex gap-2 w-full items-center">
          <Radio.Group buttonStyle="solid">
            <Radio.Button value="a">Entrada</Radio.Button>
            <Radio.Button value="b">Saída</Radio.Button>
          </Radio.Group>
          <SelectInput options={listaCategorias} placeholder="Categorias" />
          <RangeDateInput />
        </div>
      </section>
      <Tabela titulo="Extrato" columns={colunasExtrato} dataSource={dataMock} />
    </div>
  );
}
