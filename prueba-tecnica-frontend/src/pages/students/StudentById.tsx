import { useParams } from "react-router-dom";
import useSystem from "../../context/SysProvider";
import { useEffect } from "react";
import { formatDates } from "../../helpers/FormatDate";
import Spinner from "../../components/Spinner";

const StudentById = () => {
  const { getStudentById, student, loadingSys } = useSystem();
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    getStudentById(String(id));
  }, []);

  if (loadingSys) {
    return <Spinner />;
  }

  return (
    <div className="container mx-auto">
      <p>Alumno: {student?.name}</p>
      <p>Apellido: {student?.lastName}</p>
      <p>Matricula: {student?.userName}</p>
      <p>Sexo: {student?.sex}</p>
      <p>Correo: {student?.email}</p>
      <p>Fecha de nacimiento: {formatDates(`${student?.dateBirth}`)}</p>
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
