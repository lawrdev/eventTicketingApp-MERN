import Divider from "@mui/material/Divider";

function Footer() {
  return (
    <>
      <footer id="footer" className="text-center text-black">
        <Divider />

        <div className="mt-4 pb-10 px-3 flex flex-wrap gap-2 justify-between">
          <p className="flex justify-center items-center">
            <span className="text-gray-700">Register for free</span>
            <button
              type="button"
              className="ml-2 inline-block px-6 py-2 border-2 border-purple-700 text-purple-700 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
            >
              Sign up!
            </button>
          </p>

          <div className="text-gray-700 font-vold text-sm">
            © 2021 Copyright
            <a
              className="text-gray-500 ml-2 text-sm"
              target="_blank"
              rel="noreferrer"
              href="https://google.com/"
            >
              LawrDev
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
