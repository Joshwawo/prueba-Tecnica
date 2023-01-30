import { useState, useEffect } from "react";
import useAuth from "../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { clientAxios } from "../helpers/clienteAxios";
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { setAuth } = useAuth();

  const  navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Formulario enviado");

    if ([email, password].includes("")) {
      toast.error("Todos los campos son obligatorios");
      return;
    }

    try {
      const { data } = await clientAxios.post("/studen/login", {
        email,
        password,
      });

      setAuth({
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      // console.log(data)
      setAuth(data)
      data.isAdmin ? navigate('/inicio/maestros') : navigate('/inicio/alumnos')
      toast.success(`Bienvenido ${data.name}`, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
     
    } catch (error:any) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message)
    }
  };

  return (
    <div>
      <>
        <p className="text-blue-500 font-black text-6xl capitalize">
          Inciar sesión
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-10 bg-white shadow rounded-lg p-10 max-w-xl mx-auto 
          "
        >
          <div className="my-5">
            <label
              htmlFor="email"
              className=" uppercase text-gray-600 block text-xl font-bold"
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
          <div className="my-5">
            <label
              htmlFor="password"
              className=" uppercase text-gray-600 block text-xl font-bold"
            >
              Contraseña
            </label>
            <input
              type="password"
              placeholder="Introducce tu contraseña"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              autoComplete="current-password"
            />
          </div>
          <input
            type="submit"
            value="Iniciar sesión"
            className="bg-blue-700 uppercase w-full mb-5 py-3 text-white font-bold rounded hover:cursor-pointer hover:bg-blue-800 transition-colors"
          />
        </form>
      </>
    </div>
  );
};

export default Login;
