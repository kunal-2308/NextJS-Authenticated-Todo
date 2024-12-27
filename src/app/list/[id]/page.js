export default async function listUser({ params }) {
  let { id } = await params;
  return (
    <>
      <div className="div-center flex justify-center items-center mt-20">
        <span className="text-2xl bg-orange-500 rounded p-4">{id}</span>
      </div>
    </>
  );
}
