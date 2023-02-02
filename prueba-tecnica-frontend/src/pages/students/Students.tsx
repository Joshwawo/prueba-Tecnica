import React, { Fragment } from "react";
import useAuth from "../../context/AuthProvider";
import useSystem from "../../context/SysProvider";
import Spinner from "../../components/Spinner";

const Students = () => {
  const { auth } = useAuth();
  const { students, loadingSys } = useSystem();

  if(loadingSys) return <Spinner/>

  return (
    <div className="container mx-auto">
      <p className="text-2xl mb-10 text-center text-gray-800 font-semibold">
        Bienvenido alumno
      </p>
      <div className="space-y-5 px-10 mb-10   ">
        <p className="text-xl mb-4  text-gray-800 font-semibold text-center">
          Listado de todos los alumnos matriculados
        </p>

        {students.map((studentl) => {
          //TODO: cambiar a return implicito, despues de debuggear
          return (
            <div
              className="bg-slate-50/80 text-center  text-gray-800 font-medium hover:bg-slate-100 p-5  rounded-md"
              key={studentl._id}
            >
              <div className="text-lg inline-block text-start">
                <p className="">Nombre: {studentl.name}</p>
                <p className="">Apellido: {studentl.lastName}</p>
                <p className="">Matricula: {studentl.userName}</p>
                <p className="">Email: {studentl.email}</p>
                <p className="my-3 text-lg">Materias inscritas</p>
              </div>
              {studentl.course.length > 0 ? (
                <table className="bg-gray-50 mx-auto ">
                  <thead className="bg-gray-200/70">
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
                    {studentl.course.map((course) => {
                      return (
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
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <p>No hay materias inscritas para este alumno</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Students;
