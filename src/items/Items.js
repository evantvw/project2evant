const Items = ({ data }) => {
  return (
    <div>
      <img src={data.image} alt={data.title} />
      <h3>{data.title}</h3>
    </div>
  );
};

export default Items;
