const Footer = () => {
    return (
        <footer className="bg-gray-800 p-4 mt-10">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                {/* Footer Title / Logo */}
                <div className="text-white text-lg mb-4 md:mb-0">Book-Club</div>

                {/* Links */}
                

                {/* Copyright Notice */}
                <div className="text-white text-sm mt-4 md:mt-0">
                    &copy; {new Date().getFullYear()} Book-Club. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
