/* eslint-disable react/prop-types */
export function Course({ course }) {
  return (
    <>
      {course.map((course) => (
        <section key={course.id}>
          <Header  course={course} />
          <Content course={course}/>
        </section>
      ))}
    </>
  );
}

export function Header({ course }) {
  return <h1>{course.name}</h1>;
}

export function Content({course}) {
  return (
    <ul>
      {course.parts.map((part) => (
        <Part key={part.id*4} part={part}/>
      ))}
      <p>
        <strong>
          {`Total of
            ${course.parts.reduce(
              (accum, part) => (accum += part.exercises),
                0
              )}
          exercises`}
        </strong>
      </p>
    </ul>
  );
}

export function Part({part}){
  return (
    <li>{part.name} {part.exercises}</li>
  )
}