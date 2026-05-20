// src/components/features/modals/ModalTransacao.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { GET_CATEGORIAS } from "@/graphql/queries/categorias";
import ModalTransacao from "./modal_transacao";
import { MockedProvider } from "@apollo/client/testing/react";

// Mock contendo categorias mistas de ENTRADA e SAÍDA
const mockCategoriasCompleto = [
    {
        request: {
            query: GET_CATEGORIAS,
        },
        result: {
            data: {
                __typename: "Query",
                listarCategorias: [
                    { id: "101", categoria: "Salário", tipo: "ENTRADA", __typename: "Categoria" },
                    { id: "102", categoria: "Investimentos", tipo: "ENTRADA", __typename: "Categoria" },
                    { id: "201", categoria: "Alimentação", tipo: "SAIDA", __typename: "Categoria" },
                    { id: "202", categoria: "Transporte", tipo: "SAIDA", __typename: "Categoria" },
                    { id: "203", categoria: "Lazer", tipo: "SAIDA", __typename: "Categoria" },
                ],
            },
        },
    },
];

const meta: Meta<typeof ModalTransacao> = {
    title: "Components/Features/ModalTransacao",
    component: ModalTransacao,
    parameters: {
        // Como modais renderizam em overlays (portals), o layout fullscreen evita duplicidade de scrollbars na janela de preview
        layout: "fullscreen",
    },
    decorators: [
        (Story) => (
            <MockedProvider mocks={mockCategoriasCompleto}>
                {/* Adicionar uma div de fundo ajuda a dar contraste para ver o overlay do Modal */}
                <div style={{ padding: "2rem", background: "#f0f2f5", minHeight: "100vh" }}>
                    <p style={{ textAlign: "center", color: "#8c8c8c" }}>O modal está renderizado abaixo</p>
                    <Story />
                </div>
            </MockedProvider>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof ModalTransacao>;

// 1. Criar uma Nova Receita (Entrada)
export const NovaReceita: Story = {
    args: {
        isModalOpen: true,
        tipo: "novo",
        tipoTransacao: "entrada",
        loading: false,
        handleCancel: () => console.log("Cancelado"),
        handleOk: async (values) => console.log("Salvar Nova Receita", values),
    },
};

// 2. Criar uma Nova Despesa (Saída)
export const NovaDespesa: Story = {
    args: {
        isModalOpen: true,
        tipo: "novo",
        tipoTransacao: "saida",
        loading: false,
        handleCancel: () => console.log("Cancelado"),
        handleOk: async (values) => console.log("Salvar Nova Despesa", values),
    },
};

// 3. Estado de Edição de uma transação existente (Preenchido com dados iniciais)
export const EditarDespesaPreenchida: Story = {
    args: {
        isModalOpen: true,
        tipo: "edicao",
        tipoTransacao: "saida",
        loading: false,
        initialData: {
            descricao: "Supermercado Semanal",
            valor: 350.75,
            categoria: "201",
            data_agendamento: "20/05/2026",
            nota_fiscal: "comprovante_fiscal.png",
            id: "",
            tipo: ""
        },
        handleCancel: () => console.log("Cancelado"),
        handleOk: async (values) => console.log("Atualizar Despesa", values),
    },
};

// 4. Estado de Loading ao clicar em Salvar/Atualizar
export const SalvandoDados: Story = {
    args: {
        ...NovaDespesa.args,
        loading: true,
    },
};