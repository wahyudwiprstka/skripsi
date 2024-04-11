import React from "react";

const Variant = ({
  variants,
  updateVariants,
}: {
  variants: any;
  updateVariants: any;
}) => {
  const handleVariantChange = (e: any, index: any) => {
    let { name, value } = e.target;
    let onChangeValue = [...variants];
    onChangeValue[index][name] = value;
    updateVariants(onChangeValue);
    console.log(variants);
  };

  const handleDeleteVariantInput = (index: any) => {
    let newArray = [...variants];
    console.log("newArray before deletion" + JSON.stringify(newArray));
    newArray.splice(index, 1);
    console.log("newarray after deletion" + JSON.stringify(newArray));
    updateVariants(newArray);
    console.log("variants = " + JSON.stringify(variants));
  };

  const handleAddVariantInput = () => {
    updateVariants([...variants, { name: "", qty: 0 }]);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex w-full justify-between">
          <label
            htmlFor="variants"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Varian Produk
          </label>
          <label
            htmlFor="qty"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Qty
          </label>
        </div>
      </div>
      {variants.map((variant: any, index: number) => (
        <div key={index}>
          <div className="mt-2 grid grid-cols-5 gap-2">
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="variant"
              value={variant.name}
              className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 col-span-4`}
              onChange={(e) => handleVariantChange(e, index)}
            />
            <input
              type="number"
              name="qty"
              autoComplete="quantity"
              value={variant.qty}
              className="rounded-md border-0 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 ring-1"
              onChange={(e) => handleVariantChange(e, index)}
            />
          </div>
          {variants.length > 1 && (
            <button
              type="button"
              onClick={() => handleDeleteVariantInput(index)}
              className="shadow bg-red-600 rounded-md text-white hover:bg-red-500 duration-150 px-4 py-1 mt-2"
            >
              -
            </button>
          )}
        </div>
      ))}
      {variants.length > 0 && (
        <button
          type="button"
          onClick={() => handleAddVariantInput()}
          className="mt-2 shadow px-2 py-1 text-white rounded-md bg-blue-600 hover:bg-blue-500 duration-150"
        >
          Tambah Varian
        </button>
      )}
    </div>
  );
};

export default Variant;
