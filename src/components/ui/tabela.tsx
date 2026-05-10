import { Table, TablePaginationConfig } from "antd";

export interface iTabelaProps {
  columns: any;
  dataSource: any;
  pagination?: TablePaginationConfig;
  titulo?: string;
}

export default function Tabela(props: iTabelaProps) {
  return (
    <section className="w-full flex flex-col gap-4">
      <h2 className="text-xl font-semibold text-secondaryForeground">
        {props.titulo}
      </h2>
      <Table
        columns={props.columns}
        dataSource={props.dataSource}
        pagination={props.pagination}
        className={`border-border border shadow-sm rounded-xl`}
      />
    </section>
  );
}
