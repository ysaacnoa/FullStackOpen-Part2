/* eslint-disable react/prop-types */


export default function Filter ({ 
  filterPerson, 
  handleFilterPerson, 
  text }) {
  return (
    <>
      <p>{text}</p>
      <input value={filterPerson} onChange={handleFilterPerson} />
    </>
  );
}
