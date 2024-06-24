import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

interface Product {
  id?: number;
  nome: string;
  descricao: string;
  valor: number;
  disponivel: boolean;
}

interface ProductListProps {
  products: Product[];
  onDeleteProduct: (index: number) => void;
  onEditProduct: (index: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  onDeleteProduct,
  onEditProduct,
}) => {
  const sortedProducts = [...products].sort((a, b) => a.valor - b.valor);

  const handleDelete = (index: number) => {
    const confirmDelete = window.confirm(
      "Você tem certeza que deseja deletar este produto?"
    );
    if (confirmDelete) {
      onDeleteProduct(index);
    }
  };

  return (
    <div>
      <h2>Listagem de Produtos</h2>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Valor</th>
            <th>Disponível</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map((product, index) => (
            <tr key={index}>
              <td>{product.nome}</td>
              <td>{product.valor}</td>
              <td>{product.disponivel ? "Sim" : "Não"}</td>
              <td>
                <FontAwesomeIcon
                  icon={faEdit}
                  onClick={() => onEditProduct(index)}
                  style={{
                    cursor: "pointer",
                    marginRight: "10px",
                    color: "blue",
                  }}
                />
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() => handleDelete(index)}
                  style={{ cursor: "pointer", color: "red" }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
