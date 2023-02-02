import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useSystem from "../../context/SysProvider";

const AddCourseToStudent = () => {
  const [courseName, setCourseName] = useState<string>("");
  const { addCourseStudent, courses } = useSystem();
  const { id } = useParams<{ id: string }>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if ([courseName].includes("")) {
      return toast.error("Todos los campos son obligatorios");
    }
    addCourseStudent(`${id}`, courseName);
  };

  return (
    <div className="container mx-auto">
      <div className="mt-10 md:mt-0 text-center">
        <p className="my-10 pt-10">Dar de alta materias </p>
        <form className="flex justify-center" onSubmit={handleSubmit}>
          <select onChange={(e) => setCourseName(e.target.value)}>
            <option value="">Selecciona una materia</option>
            {courses?.map((course) => (
              <option value={course._id} key={course._id}>{course.name}</option>
            ))}
          </select>
          <button className="bg-green-400 hover:bg-green-500 text-white px-2 py-1 rounded-md block">
            Agregar
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCourseToStudent;
