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
  const listaCategorias = Array.from(
    new Map(
      [...tipoEntrada, ...tipoSaida].map((item) => [
        item.tipo,
        { label: item.tipo, value: item.key },
      ]),
    ).values(),
  );
  return (
    <div>
      <section className="flex flex-col gap-2 w-full mb-4">
        <div className="flex justify-end gap-3 w-full items-center">
          <Radio.Group buttonStyle="solid">
            <Radio.Button value="a">Entrada</Radio.Button>
            <Radio.Button value="b">Saída</Radio.Button>
          </Radio.Group>
          <SelectInput options={listaCategorias} placeholder="Categorias" />
          <RangeDateInput />
        </div>
      </section>
      <Tabela columns={colunasExtrato} dataSource={dataMock} />
    </div>
  );
}
