export default function MissionFrom() {
  return (
    <div>
      <fieldset>
        <legend className="ml-px p-2 bg-ultraViolet text-bgColor rounded-md">
          Add Missions
        </legend>
        <form className="p-12 flex flex-col border border-solid border-ultraViolet rounded-md">
          <input className="h-[1.80rem] pl-2 rounded-xl border border-solid border-ultraViolet focus:outline-none" />
          <button className="mt-8 py-2 bg-ultraViolet text-bgColor rounded-3xl">
            Add
          </button>
        </form>
      </fieldset>
    </div>
  );
}
