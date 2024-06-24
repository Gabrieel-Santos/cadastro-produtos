import React, { useState, useEffect } from "react";

interface ProductFormProps {
  onAddProduct: (product: Product) => void;
  onViewList: () => void;
  editProduct: Product | null;
}

interface Product {
  id?: number;
  nome: string;
  descricao: string;
  valor: number;
  disponivel: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({
  onAddProduct,
  onViewList,
  editProduct,
}) => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState<string>("");
  const [disponivel, setDisponivel] = useState("sim");

  useEffect(() => {
    if (editProduct) {
      setNome(editProduct.nome);
      setDescricao(editProduct.descricao);
      setValor(editProduct.valor.toString());
      setDisponivel(editProduct.disponivel ? "sim" : "não");
    }
  }, [editProduct]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || !descricao || valor === "") {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    const product: Product = {
      nome,
      descricao,
      valor: parseFloat(valor),
      disponivel: disponivel === "sim",
    };
    onAddProduct(product);
    setNome("");
    setDescricao("");
    setValor("");
    setDisponivel("sim");
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setValor(value);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="nome">Nome do Produto:</label>
      <br />
      <input
        type="text"
        id="nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <br />
      <br />
      <label htmlFor="descricao">Descrição do Produto:</label>
      <br />
      <input
        type="text"
        id="descricao"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
      />
      <br />
      <br />
      <label htmlFor="valor">Valor do Produto (R$):</label>
      <br />
      <input
        type="text"
        id="valor"
        value={valor}
        onChange={handleValueChange}
      />
      <br />
      <br />
      <label htmlFor="disponivel">Disponível para Venda:</label>
      <br />
      <select
        id="disponivel"
        value={disponivel}
        onChange={(e) => setDisponivel(e.target.value)}
      >
        <option value="sim">Sim</option>
        <option value="não">Não</option>
      </select>
      <br />
      <br />
      <button type="submit">
        {editProduct ? "Atualizar Produto" : "Cadastrar Produto"}
      </button>
      <button id="view-list" type="button" onClick={onViewList}>
        Ver Lista
      </button>
    </form>
  );
};

export default ProductForm;
