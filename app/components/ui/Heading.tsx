"use client";

interface ClientProps {
  title: string;
  center?: boolean;
}

const Heading: React.FC<ClientProps> = ({ title, center }) => {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <div
        className='
            text-2xl font-bold
        '
      >
        {title}
      </div>
    </div>
  );
};

export default Heading;
