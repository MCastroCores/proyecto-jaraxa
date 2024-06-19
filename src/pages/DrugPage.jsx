import { useParams } from "react-router-dom";

export const DrugPage = () => {
  const { drugGenericName } = useParams();

  return <div>{drugGenericName}</div>;
};
