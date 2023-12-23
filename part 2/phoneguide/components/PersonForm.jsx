/* eslint-disable react/prop-types */


export default function PersonForm ({
  addPerson,
  newName,
  handleName,
  newPhone,
  handlePhone,
}){
  return (
    <form onSubmit={addPerson}>
      <div>
        name:
        <input value={newName} onChange={handleName} />
        <br />
        phone:
        <input value={newPhone} onChange={handlePhone} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}