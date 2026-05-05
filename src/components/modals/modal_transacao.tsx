import { Form, Input, Modal, Radio } from "antd";
import InputTexto from "../input";
import DateInput from "../date_input";
import Dragger from "antd/es/upload/Dragger";
import { InboxOutlined } from "@ant-design/icons";
import { tipoEntrada, tipoSaida } from "@/types/iTransacoes";
import { iModalTransacao } from "@/types/iModal";

export default function ModalTransacao(props: iModalTransacao) {
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
      onOk={props.handleOk}
      onCancel={props.handleCancel}
    >
      <Form>
        <Form.Item>
          <InputTexto label="Descrição" />
        </Form.Item>
        <Form.Item>
          <InputTexto label="Valor" prefixo="R$" />
        </Form.Item>
        <Form.Item>
          <DateInput label="Agendamento" placeholder="Selecione uma data" />
        </Form.Item>
        <Form.Item name="categoria">
          <p className="text-md font-semibold pb-2">Categoria</p>
          <Radio.Group className="w-full">
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {(props.tipoTransacao === "entrada"
                ? tipoEntrada
                : tipoSaida
              ).map((item) => (
                <Radio.Button
                  key={item.tipo}
                  value={item.tipo}
                  className="h-auto flex flex-col items-center justify-center p-4 rounded-lg border-2 text-center transition-all"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    padding: "10px 5px",
                  }}
                >
                  <div className="text-2xl mb-1">{item.icone}</div>
                  <div className="text-md font-semibold">{item.tipo}</div>
                </Radio.Button>
              ))}
            </div>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <p className="text-md font-semibold pb-2">Nota Fiscal (opcional)</p>

          <Dragger name="nota_fiscal" multiple={false}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="text-md">Upload da Nota Fiscal</p>
          </Dragger>
        </Form.Item>
      </Form>
    </Modal>
  );
}
