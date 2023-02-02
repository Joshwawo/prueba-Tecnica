import { Link, useParams } from "react-router-dom";
import useSystem from "../../context/SysProvider";
import { useEffect, useState } from "react";
import { formatDates } from "../../helpers/FormatDate";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StudentById = () => {
  const { getStudentById, student, loadingSys, deleteCourse } = useSystem();
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    getStudentById(String(id));
  }, []);

  // console.log(student?.course.length);

  const handleDelete = (id: string, name: string) => {
    toast(
      (t) => (
        <div className="divo">
          <p className=" text-gray-500 text-center pb-3">
            ¿Estas seguro que quieres eliminarlo? <strong> {name}</strong>{" "}
          </p>
          <div className="flex justify-center">
            <button
              onClick={() => {
                deleteCourse(id);
                toast.dismiss(id);
              }}
              className=" bg-red-400 hover:bg-red-600 px-1.5 py-1.5   text-white font-semibold rounded-md mx-2"
            >
              Eliminar
            </button>
            <button
              onClick={() => toast.dismiss(id)}
              className=" bg-orange-400 hover:bg-orange-300 px-1.5 py-1.5  text-white rounded-md mx-2"
            >
              Cancelar
            </button>
          </div>
        </div>
      ),
      {
        className: "bg-gray-100",
        autoClose: false,
        position: "top-center",
      }
    );
  };

  if (loadingSys) {
    return <Spinner />;
  }

  return (
    <div className="container mx-auto md:flex justify-around pt-5">
      <div className="text-xl text-gray-600">
        <p className="mb-2 text-gray8800 text-3xl">Detalles del estudiante:</p>
        <p className="">Alumno: <strong>{student?.name}</strong></p>
        <p>Apellido: <strong>{student?.lastName}</strong></p>
        <p>Matricula: {student?.userName}</p>
        <p>Sexo: {student?.sex}</p>
        <p>Correo: {student?.email}</p>
        <p>Fecha de nacimiento: {formatDates(`${student?.dateBirth}`)}</p>
        <div className="">
          {student?.course?.length > 0 ? (
            <div className="mt-10">
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="text-base">
                      <th scope="col" className="px-6 py-3">
                        Nombre materia
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Descripción
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Duración
                      </th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    {student?.course?.map((course) => (
                      <tr
                        className="bg-gray-100/80 border-b text-gray-700 font-semibold"
                        key={course?._id}
                      >
                        <td scope="row" className="px-6 py-4 ">
                          {course?.name}
                        </td>
                        <td scope="row" className="px-6 py-4">
                          {course?.description}
                        </td>
                        <td scope="row" className="px-6 py-4">
                          {course?.duration}
                        </td>
                        
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <p className="text-center text-2xl text-gray-700 mt-10">
              Este estudiante no esta inscrito en ninguna materia
              
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentById;
