import Link from "next/link";

const Title = () => {
  return (
    <Link
      href={"/"}
      className="text-xl md:text-2xl lg:text-3xl font-bold text-white whitespace-nowrap cursor-pointer"
      data-testid="header-title"
    >
      Art Collection
    </Link>
  );
};

export default Title;
