import React from "react";

const Footer = () => {
  let date = new Date();
  let year = date.getFullYear();
  const timeline = year > 2024 ? `- ${year}` : "";

  return (
    <footer className="bg-slate-200 bottom-0 left-0 right-0 ">
      <div className="container mx-auto p-3 lg:px-8 flex flex-col md:flex-row items-center justify-between ">
        <p className="font-bold">Made with ❤️ by Sunil Hooda</p>
        <p className="font-bold">Copyright © 2024 {timeline}</p>
      </div>
    </footer>
  );
};

export default Footer;
