import { Link } from "react-router";

type headingType = {
  heading: string;
  subHeading: string;
  link: string;
  to: string;
};
const HeadingComponent = ({ heading, subHeading, link, to }: headingType) => {
  return (
    <div className="w-full flex flex-col justify-center">
      <h2 className="text-center text-4xl font-bold mb-3">{heading}</h2>
      <div className="flex gap-2 text-lg justify-center items-center">
        <h2>{subHeading}</h2>
        <Link to={to} className="text-blue-600 underline">
          {link}
        </Link>
      </div>
    </div>
  );
};

export default HeadingComponent;
