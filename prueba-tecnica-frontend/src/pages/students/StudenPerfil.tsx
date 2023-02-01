import { useParams } from "react-router-dom";
import useAuth from "../../context/AuthProvider";
import useSystem from "../../context/SysProvider";
import { useEffect } from "react";

const StudenPerfil = () => {
  const { id } = useParams<{ id: string }>();
  const { getStudentById, student, loadingSys } = useSystem();
  console.log("Componente StudentPerfil.tsx");

  useEffect(() => {
    getStudentById(String(id));
  }, []);
  console.log(student)
  // console.log(id);

  return <div>StudenPerfil</div>;
};

export default StudenPerfil;
