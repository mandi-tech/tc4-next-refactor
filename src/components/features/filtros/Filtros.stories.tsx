import type { Meta, StoryObj } from "@storybook/react";
import { GET_CATEGORIAS } from "@/graphql/queries/categorias";
import Filtros from "./filtros";
import { MockedProvider } from "@apollo/client/testing/react";

const mockCategoriasSucesso = [
    {
        request: {
            query: GET_CATEGORIAS,
        },
        result: {
            data: {
                __typename: "Query",
                listarCategorias: [
                    { id: "1", categoria: "Alimentação", __typename: "Categoria" },
                    { id: "2", categoria: "Transporte", __typename: "Categoria" },
                    { id: "3", categoria: "Lazer", __typename: "Categoria" },
                    { id: "4", categoria: "Salário", __typename: "Categoria" },
                ],
            },
        },
    },
];

const meta: Meta<typeof Filtros> = {
    title: "Components/Features/Filtros",
    component: Filtros,
    parameters: {
        layout: "padded",
    },
    decorators: [
        (Story) => (
            <MockedProvider mocks={mockCategoriasSucesso}>
                <div style={{ maxWidth: "800px", margin: "0 auto" }}>
                    <Story />
                </div>
            </MockedProvider>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof Filtros>;

export const Padrao: Story = {
    args: {
        filtros: ["tipo", "categoria", "periodo"],
    },
    parameters: {
        nextjs: {
            navigation: {
                pathname: "/dashboard",
                searchParams: {},
            },
        },
    },
};

export const ComFiltrosAtivos: Story = {
    args: {
        filtros: ["tipo", "categoria", "periodo"],
    },
    parameters: {
        nextjs: {
            navigation: {
                pathname: "/dashboard",
                searchParams: {
                    tipo: "saida",
                    categoriaId: "1",
                    data_inicial: "01/05/2026",
                    data_final: "15/05/2026",
                },
                query: {
                    tipo: "saida",
                    categoriaId: "1",
                    data_inicial: "01/05/2026",
                    data_final: "15/05/2026",
                },
            },
        },
    },
};

export const ApenasPeriodo: Story = {
    args: {
        filtros: ["periodo"],
    },
    parameters: {
        nextjs: {
            navigation: {
                pathname: "/relatorios",
            },
        },
    },
};

export const CarregandoCategorias: Story = {
    args: {
        filtros: ["categoria"],
    },
    decorators: [
        (Story) => (
            <MockedProvider mocks={[]}>
                <Story />
            </MockedProvider>
        ),
    ],
};