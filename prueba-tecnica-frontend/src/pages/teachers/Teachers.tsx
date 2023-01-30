import useSys from "../../context/SysProvider";

const Teachers = () => {
  const { students } = useSys();

  return (
    <div className="container mx-auto h-s">
      <p>Hola</p>
      <p>Bienvenido maestro</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {students?.map((studen) => (
          <div className="" key={studen._id}>
            <p>{studen.name}</p>
            <p>{studen.email}</p>
            <p></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teachers;
