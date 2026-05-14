import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Radio,
  InputNumber,
} from "antd";
import Dragger from "antd/es/upload/Dragger";
import { InboxOutlined } from "@ant-design/icons";
import { tipoEntrada, tipoSaida } from "@/libs/types/iTransacoes";
import { iModalTransacao } from "@/libs/types/iModal";
import { useEffect, useMemo } from "react";
import dayjs from "dayjs";
import {
  GET_CATEGORIAS,
  CategoriasResponse,
} from "@/graphql/queries/categorias";
import { useQuery } from "@apollo/client/react";

export default function ModalTransacao(props: iModalTransacao) {
  const [form] = Form.useForm();

  const { data: categoriasData } = useQuery<CategoriasResponse>(GET_CATEGORIAS);

  const iconMapping = useMemo(() => {
    const allHardcoded = [...tipoEntrada, ...tipoSaida];
    return Object.fromEntries(
      allHardcoded.map((item) => [item.tipo, item.icone]),
    );
  }, []);

  const categoriasFiltradas = useMemo(() => {
    if (!categoriasData) return [];
    return categoriasData.listarCategorias.filter(
      (cat) => cat.tipo === props.tipoTransacao.toUpperCase(),
    );
  }, [categoriasData, props.tipoTransacao]);

  useEffect(() => {
    if (props.isModalOpen && props.initialData) {
      form.setFieldsValue({
        descricao: props.initialData.descricao,
        valor: props.initialData.valor,
        categoria: props.initialData.categoria,
        agendamento: props.initialData.data_agendamento
          ? dayjs(props.initialData.data_agendamento, "DD/MM/YYYY")
          : null,
      });
    } else {
      form.resetFields();
    }
  }, [props.isModalOpen, props.initialData, form]);

  return (
    <Modal
      title={
        <h3 className="text-lg font-bold">
          {props.tipo === "novo" ? "Nova" : "Editar"}{" "}
          {props.tipoTransacao === "entrada" ? "Receita" : "Despesa"}
        </h3>
      }
      closable={{ "aria-label": "Custom Close Button" }}
      open={props.isModalOpen}
      footer={null}
      onCancel={props.handleCancel}
      destroyOnHidden
      forceRender
    >
      <Form form={form} layout="vertical" onFinish={props.handleOk}>
        <Form.Item
          name="descricao"
          label="Descrição"
          rules={[
            { required: true, message: "Por favor, insira uma descrição." },
          ]}
        >
          <Input maxLength={200} />
        </Form.Item>
        <Form.Item
          name="valor"
          label="Valor"
          rules={[
            { required: true, message: "Por favor, insira um valor válido." },
          ]}
        >
          <InputNumber<number>
            controls={false}
            prefix="R$"
            placeholder="0,00"
            maxLength={20}
            className="w-[100%]!"
            min={0}
            step={0.01 as number}
            formatter={(value) => {
              if (!value) return "0,00";
              return new Intl.NumberFormat("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(value);
            }}
            parser={(value) => {
              if (!value) return 0;
              const cleanValue = value.replace(/\D/g, "");
              return (Number(cleanValue) / 100) as number;
            }}
            precision={2}
            decimalSeparator=","
          />
        </Form.Item>
        <Form.Item
          name="agendamento"
          label="Agendamento"
          rules={[{ required: true, message: "Por favor, insira uma data." }]}
        >
          <DatePicker
            placeholder="Selecione uma data"
            className="w-full!"
            format={"DD/MM/YYYY"}
          />
        </Form.Item>
        <Form.Item
          name="categoria"
          label="Categoria"
          rules={[
            { required: true, message: "Por favor, insira uma categoria." },
          ]}
        >
          <Radio.Group className="w-full">
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {categoriasFiltradas.map((item) => (
                <Radio.Button
                  key={item.id}
                  value={item.id}
                  className="flex flex-col items-center justify-center rounded-lg border-2 text-center transition-all"
                  style={{ height: "100%" }}
                >
                  <div className="text-2xl pt-2">
                    {iconMapping[item.categoria] || <InboxOutlined />}
                  </div>
                  <div className="text-md font-semibold">{item.categoria}</div>
                </Radio.Button>
              ))}
            </div>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Nota fiscal (opcional)"
          name="nota_fiscal"
          valuePropName="fileList"
          getValueFromEvent={(e: any) => {
            if (Array.isArray(e)) {
              return e;
            }
            return e?.fileList;
          }}
        >
          <Dragger
            name="nota_fiscal"
            multiple={false}
            beforeUpload={() => false}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="text-md">Upload da Nota Fiscal</p>
          </Dragger>
        </Form.Item>

        <div className="!w-full flex justify-between items-center gap-4">
          <Button variant="outlined" onClick={props.handleCancel}>
            Cancelar
          </Button>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={props.loading}>
              {props.tipo === "novo" ? "Salvar" : "Atualizar"}
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
}
