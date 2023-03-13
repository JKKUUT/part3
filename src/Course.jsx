
const Header = ({ course }) => {
    return <h1>{course}</h1>;
  };

const Sisalto = ({ part }) => {
    const Part = ({ part }) => {
      return (
        <p>
          {part.name} {part.exercises}
        </p>
      );
    };
    return (
      <div>
        {part.map((part, i) => (
          <Part key={i} part={part} />
        ))}
      </div>
    );
  };


const Total = ({ part }) => {
    const total = part.reduce((tot, part) => tot + part.exercises, 0);
    return (
      <p>
        {`total of ${total} exercises`}
      </p>
    );
  };

const Course = ({ course }) => {
    return (
      <>
        <Header course={course.name} />
        <Sisalto part={course.parts} />
        <Total part={course.parts} />
      </>
    )
  }

export default Course