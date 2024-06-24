import React, { useState, useEffect } from "react";
import "./App.css";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";

interface Product {
  id?: number;
  nome: string;
  descricao: string;
  valor: number;
  disponivel: boolean;
}

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(true);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  const addProduct = (product: Product) => {
    let updatedProducts;
    if (editIndex !== null) {
      updatedProducts = products.map((p, index) =>
        index === editIndex ? product : p
      );
      setEditIndex(null);
    } else {
      updatedProducts = [...products, product];
    }
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setShowForm(false);
  };

  const deleteProduct = (index: number) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  const editProduct = (index: number) => {
    setEditIndex(index);
    setShowForm(true);
  };

  const viewList = () => {
    setShowForm(false);
  };

  return (
    <div>
      <h1>Cadastro e Listagem de Produtos</h1>
      {showForm ? (
        <ProductForm
          onAddProduct={addProduct}
          onViewList={viewList}
          editProduct={editIndex !== null ? products[editIndex] : null}
        />
      ) : (
        <div>
          <button id="show-form" onClick={() => setShowForm(true)}>
            Cadastrar Novo Produto
          </button>
          <ProductList
            products={products}
            onDeleteProduct={deleteProduct}
            onEditProduct={editProduct}
          />
        </div>
      )}
    </div>
  );
};

export default App;
