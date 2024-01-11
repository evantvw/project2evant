const Items = ({ data }) => {
  return (
    // <li className="flex border border-gray-300 p-4 gap-5 items-center text-gray-600 cursor-pointer">
    //   <div>
    //     <img className="w-8" src={data.image} alt={data.title} />
    //   </div>
    //   <h3 className="w-3/5">{data.title}</h3>
    //   <h3>{`$${data.price}`}</h3>
    //   <h3>{data.category}</h3>
    // </li>
    <tr className="border-b">
      <td className="whitespace-nowrap px-6 py-4">
        <img className="w-8" src={data.image} alt={data.title} />
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <h3 className="w-3/5">{data.title}</h3>
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <h3>{`$${data.price}`}</h3>
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <h3>{data.category}</h3>
      </td>
    </tr>
  );
};

export default Items;
