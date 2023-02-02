import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useSystem from "../../context/SysProvider";

const AddCourse = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [duration, setDuration] = useState<string>("");

  const { addCourse } = useSystem();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if ([name, description, duration].includes("")) {
      return toast.error("Todos los campos son obligatorios");
    }
    const validName = /^[a-zA-Z0-9 ]+$/;
    if (!validName.test(name)) {
      return toast.error("El nombre solo puede contener letras y numeros");
    }
    if (!validName.test(description)) {
      return toast.error("La descripcion solo puede contener letras y numeros");
    }

    addCourse({ name, description, duration });
    setName("");
    setDescription("");
    setDuration("");
  };

  return (
    <div className="pt-5 ">
      <h1 className="text-center text-3xl font-bold"> {"Agregar Materia"}</h1>
      <form
        className="mt-5 bg-white shadow rounded-lg p-10 max-w-xl mx-auto mb-5"
        onSubmit={handleSubmit}
      >
        <div className="my-0.5">
          <label
            htmlFor="name"
            className=" uppercase text-gray-600 block  font-bold"
          >
            Nombre
          </label>
          <input
            type="text"
            placeholder="Nombre de la materia"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>
        <div className="my-0.5">
          <label
            htmlFor="description"
            className=" uppercase text-gray-600 block  font-bold"
          >
            Descripción
          </label>
          <input
            type="text"
            placeholder="Description de la materia"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>

        <div className="my-0.5">
          <label
            htmlFor="duration"
            className="uppercase text-gray-600 block  font-bold"
          >
            Duración
          </label>
          <select
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="bg-gray-50 border mt-3  border-gray-300 text-gray-900  rounded-lg block w-full p-2.5 outline-none "
          >
            <option value="">Selecciona el periodo</option>
            <option value="4 meses">4 Meses</option>
            <option value="6 meses">6 Meses</option>
          </select>
        </div>

        <input
          type="submit"
          value={"Agregar materia"}
          className={` mt-5 uppercase w-full mb-5 py-3  bg-green-700 hover:bg-green-800 text-white font-bold rounded hover:cursor-pointer transition-colors`}
        />
      </form>
    </div>
  );
};

export default AddCourse;
