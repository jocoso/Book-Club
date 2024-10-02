import clsx from "clsx";

const Title = ({ children, id, className = "", tier = 1, ...props }) => {
    const headers = [
        "font-bold text-5xl text-center",
        "font-bold text-4xl text-center",
        "font-bold text-3xl text-center",
        "font-bold text-2xl text-center",
    ];
    const validatedTier = tier > 0 && tier <= headers.length ? tier : 1;

    return (
        <div id={id} className={clsx(headers[validatedTier - 1], className)} {...props}>
            {children}
        </div>
    );
};

export default Title;
