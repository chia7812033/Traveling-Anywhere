"use client";

interface ClientProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

const Heading: React.FC<ClientProps> = ({ title, subtitle, center }) => {
  return (
    <div className={center ? "text-centet" : "text-start"}>
      <div
        className='
            text-2xl font-bold
        '
      >
        {title}
      </div>
      {subtitle && (
        <div className='font-light text-neutral-500 mt-2'>{subtitle}</div>
      )}
    </div>
  );
};

export default Heading;
