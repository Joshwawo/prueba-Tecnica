import { useParams } from "react-router-dom";
import useAuth from "../../context/AuthProvider";
import useSystem from "../../context/SysProvider";
import { useEffect } from "react";

const StudenPerfil = () => {
  const { id } = useParams<{ id: string }>();
  const { getStudentById, student, loadingSys } = useSystem();

  useEffect(() => {
    getStudentById(String(id));
  }, []);
  console.log(student);
  // console.log(id);

  return (
    <div className="container mx-auto">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore,
        ratione.
      </p>
    </div>
  );
};

export default StudenPerfil;
