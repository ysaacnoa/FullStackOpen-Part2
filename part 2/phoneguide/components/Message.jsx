/* eslint-disable react/prop-types */



export default function Message({ message, type }) {
  if (!message) return null;

  const messageStyles = {
    color: type === 'error' ? 'red' : 'green',
    fontSize: '2rem',
    padding: '1rem',
    borderRadius: '.5rem',
    backgroundColor: type === 'error' ? '#f6d4e3' : '#dfe8e3',
  };

  return (
    <div style={messageStyles}>
      {message}
    </div>
  );
}