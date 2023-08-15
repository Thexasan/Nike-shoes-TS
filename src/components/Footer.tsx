import React from "react";

interface FooterProps {
  footerAPI: {
    titles: any;
    links: any;
  };
}

const Footer: React.FC<FooterProps> = ({ footerAPI }) => {
  const { titles, links } = footerAPI;

  return (
    <>
      <footer className="bg-theme pt-7 pb-5">
        <div className="nike-container text-slate-200">
          <div className="grid items-start grid-cols-3 max-w-2xl w-full m-auto md:max-w-none md:gap-5">
            {titles.map((elem: any) => (
              <div key={elem.id} className="grid items-center">
                <h1 className="text-lg lg:text-base md:text-sm uppercase font-semibold">
                  {elem.title}
                </h1>
              </div>
            ))}
            {links.map((list: any) => (
              <ul key={list.id} className="grid items-center gap-1">
                {list.map((elem: any) => (
                  <li key={elem.id} className="text-sm sm:text-xs">
                    {elem.link}
                  </li>
                ))}
              </ul>
            ))}
          </div>
          <div className="mt-5 text-center">
            <p className="text-sm md:text-center">
              Copyright
              <sup className="text-base font-bold">&copy;</sup> Husenov Hasan 
              Nike Shops{" "}
              <span className="font-semibold">Internet-Shop</span>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
