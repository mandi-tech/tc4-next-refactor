"use client";

import React from "react";
import { Table as AntdTable, type TableProps } from "antd";

export interface TableComponentProps<RecordType = any> {
  columns: TableProps<RecordType>["columns"];
  dataSource: TableProps<RecordType>["dataSource"];
  pagination?: TableProps<RecordType>["pagination"];
  title?: string;
  loading?: boolean;
}

export default function Table<RecordType extends object = any>({
  columns,
  dataSource,
  pagination,
  title,
  loading = false,
}: TableComponentProps<RecordType>) {
  return (
    <section className="gap-md flex w-full flex-col">
      {title && <h2 className="text-foreground text-xl font-semibold tracking-tight">{title}</h2>}
      <div className="border-border bg-background-secondary overflow-hidden rounded-xl border shadow-sm">
        <AntdTable
          columns={columns}
          dataSource={dataSource}
          pagination={pagination}
          loading={loading}
          className="bg-transparent"
          bordered={false}
        />
      </div>
    </section>
  );
}
