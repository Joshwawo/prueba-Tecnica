import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useSystem from "../../context/SysProvider";

const AddStuden = () => {
  const [idx, setIdx] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState("");
  const [sex, setSex] = useState("");
  const [dateBirth, setDateBirth] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const params = useParams();

  const { student, submitStudent, getStudentById } = useSystem();

  useEffect(() => {
    if (params.id) {
      getStudentById(String(params.id));
      console.log("Entro al useEffect");
    }
  }, []);

  useEffect(() => {
    if (params.id !== undefined && student) {
      setIdx(student._id);
      setName(student.name);
      setLastName(student.lastName);
      setSex(student.sex);
      setDateBirth(student.dateBirth?.split("T")[0]);
      setUserName(student.userName);
      setEmail(student.email);
      setPassword(student.password);
    } else {
      setIdx(null);
      setName("");
      setLastName("");
      setSex("");
      setDateBirth("");
      setUserName("");
      setEmail("");
      setPassword("");
    }
  }, [params, student]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      [name, lastName, sex, dateBirth, userName, email, password].includes("")
    ) {
      return toast.error("Todos los campos son obligatorios");
    }

    const validString = /^[a-zA-Z\s]+$/;

    if (!validString.test(name)) {
      return toast.error("El nombre solo puede contener letras");
    }

    if (!validString.test(lastName)) {
      return toast.error("El apellido solo puede contener letras");
    }

    try {
      // toast.success(data.message);
      submitStudent({
        id: idx,
        name,
        lastName,
        sex,
        dateBirth,
        userName,
        email,
        password,
      });
      setIdx(null);
      // setName("");
      // setLastName("");
      // setSex("");
      // setDateBirth("");
      // setUserName("");
      // setEmail("");
      // setPassword("");

      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="pt-5 ">
      <h1 className="text-center text-3xl font-bold">
        {" "}
        {params.id ? "Actualizar" : "Agregar"} alumnos{" "}
      </h1>
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
            placeholder="Nombre del alumno"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>
        <div className="my-0.5">
          <label
            htmlFor="lastName"
            className=" uppercase text-gray-600 block  font-bold"
          >
            Apellido
          </label>
          <input
            type="text"
            placeholder="Apellido del alumno"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>
        <div className="my-0.5">
          <label
            htmlFor="userName"
            className=" uppercase text-gray-600 block  font-bold"
          >
            Nombre de usuario
          </label>
          <input
            type="text"
            placeholder="Nombre de usuario del alumno"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>
        <div className="my-0.5">
          <label
            htmlFor="email"
            className=" uppercase text-gray-600 block  font-bold"
          >
            Email
          </label>
          <input
            type="email"
            placeholder="Email de registro"
            id="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>
        <div className="my-0.5">
          <label
            htmlFor="password"
            className=" uppercase text-gray-600 block  font-bold"
          >
            Contraseña
          </label>
          <input
            type="password"
            placeholder="Una contraseña para el alumno"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            autoComplete="current-password"
          />
        </div>
        <div className="my-0.5">
          <label
            htmlFor="sex"
            className="uppercase text-gray-600 block  font-bold"
          >
            Sexo
          </label>
          <select
            id="sex"
            value={sex}
            onChange={(e) => setSex(e.target.value)}
            className="bg-gray-50 border mt-3  border-gray-300 text-gray-900  rounded-lg block w-full p-2.5 outline-none "
          >
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
          </select>
        </div>
        <div className="my-0.5">
          <label
            htmlFor="password"
            className=" uppercase text-gray-600 block  font-bold"
          >
            Fecha de nacimiento
          </label>
          <input
            type="date"
            placeholder="Fecha de nacimiento del alumno"
            id="dateBirth"
            value={dateBirth}
            onChange={(e) => setDateBirth(e.target.value)}
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50 mb-5"
            autoComplete="current-password"
          />
        </div>

        <input
          type="submit"
          value={params.id ? "Actualizar" : "Agregar"}
          className={`${ params.id ? 'bg-blue-700 hover:bg-blue-800' : 'bg-green-700 hover:bg-green-800'}  uppercase w-full mb-5 py-3 text-white font-bold rounded hover:cursor-pointer transition-colors`}
        />
      </form>
    </div>
  );
};

export default AddStuden;
