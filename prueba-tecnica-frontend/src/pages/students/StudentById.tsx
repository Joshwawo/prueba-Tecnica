import { useParams } from "react-router-dom";
import useSystem from "../../context/SysProvider";
import { useEffect, useState } from "react";
import { StudentPerfil } from "../../types/users";
import { clientAxios } from "../../helpers/clienteAxios";
import { formatDates } from "../../helpers/FormatDate";

const StudentById = () => {
  const [student, setStudent] = useState<StudentPerfil>({} as StudentPerfil);
  const [loadingSys, setLoadingsys] = useState<boolean>(false);

  // const { getStudentById, student, loadingSys } = useSystem();
  const { id } = useParams<{ id: string }>();
  // useEffect(() => {
  //   getStudentById(String(id));
  // }, []);

  useEffect(() => {
    const getStudentById = async () => {
      setLoadingsys(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          return;
        }
        const { data } = await clientAxios.get<StudentPerfil>(`/studen/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setStudent(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingsys(false);
      }
    };
    getStudentById();
  }, []);

  if (loadingSys) {
    return <p>Cargando...</p>;
  }

  console.log(student?.course?.length > 0 ? "Si " : "No hay materias");
  console.log(student?.dateBirth);

  return (
    <div className="container mx-auto">
      <p>Alumno: {student?.name}</p>
      <p>Apellido: {student?.lastName}</p>
      <p>Matricula: {student?.userName}</p>
      <p>Sexo: {student?.sex}</p>
      <p>Correo: {student?.email}</p>
      <p>Fecha de nacimiento: {formatDates(student?.dateBirth)}</p>
      <div className="mt-4">
        Materias:{" "}
        {student?.course?.length > 0
          ? student.course.map((course) => (
              <div className="" key={course._id}>
                <p>Materia: {course.name}</p>
                <p>Duracion: {course.duration}</p>
              </div>
            ))
          : "No tienes materias"}
      </div>
    </div>
  );
};

export default StudentById;
