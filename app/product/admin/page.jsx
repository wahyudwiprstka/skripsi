const AdminProduct = async () => {
  async function getProducts() {
    const res = await fetch("http://localhost:3000/api/product");
    console.log(res);
    return res.json();
  }
  const products = await getProducts();
  return (
    <div>
      <div className="overflow-x-auto">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr className="font-semibold text-black">
            <th>Nama Produk</th>
            <th>Harga</th>
            <th>Deskripsi</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {/* row 2 */}
          {products.map((product) => (
            <tr className="hover">
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.description}</td>
            <td>{product.image}</td>
            </tr>
          ))}
        </tbody>      
      </table>
    </div>
    </div>
  );
};


export default AdminProduct;
