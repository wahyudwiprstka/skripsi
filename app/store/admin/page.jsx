const AdminStore = async () => {
  async function getStores() {
    const res = await fetch("http://localhost:3000/api/store");
    console.log(res);
    return res.json();
  }
  const stores = await getStores();
  return (
    <div>
      <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Description</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {/* row 2 */}
          {stores.map((store) => (
            <tr className="hover">
            <td>{store.name}</td>
            <td>{store.address}</td>
            <td>{store.description}</td>
            <td>{store.phonenumber}</td>
            </tr>
          ))}
        </tbody>      
      </table>
    </div>
    </div>
  );
};


export default AdminStore;
