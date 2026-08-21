import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <DatabaseStatus />
    </>
  );
}

function DatabaseStatus() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updatedAtText = "Carregando...";
  let databaseStatus;

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
    databaseStatus = (
      <>
        <div>Versão: {data.dependencies.database.version}</div>
        <div>
          Conexões abertas: {data.dependencies.database.opened_connections}
        </div>
        <div>
          Máximo de conexões: {data.dependencies.database.max_connections}
        </div>
      </>
    );
  }

  return (
    <>
      <h2>Status</h2>
      <div>Última Atualização: {updatedAtText}</div>

      <h2>Banco de Dados</h2>
      <div>{databaseStatus}</div>
    </>
  );
}
