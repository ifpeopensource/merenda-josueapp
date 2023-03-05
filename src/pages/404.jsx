export function PageNotFound() {
  return (
    <div className="min-h-screen bg-primary-900 text-neutral-50 flex flex-col gap-2 items-center justify-center">
      <h1 className="text-3xl font-bold px-2 text-center">
        Página Não Encontrada
      </h1>
      <h2 className="text-2xl bg-green-800 py-2 px-4 rounded-lg">
        Erro <code>404</code>
      </h2>
      <a href="/" className="text-xl hover:underline">
        Voltar para a página inicial
      </a>
    </div>
  );
}
