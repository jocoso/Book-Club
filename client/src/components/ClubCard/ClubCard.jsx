const ClubCard = ({ club }) => {
    // Default club object if none is provided
    const defaultClub = {
        error: "Club couldn't be displayed",
    };

    // Fallback to default club if club prop is not provided
    const currentClub = club || defaultClub;

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6 max-w-sm mx-auto">
            {/* If there is no error, display club information */}
            {!currentClub.error ? (
                <div>
                    <h1 className="text-2xl font-bold mb-4">{currentClub.name}</h1>
                    <p className="text-gray-700 mb-4">{currentClub.description}</p>
                    <p className="text-sm text-gray-600 mb-4">
                        Created by: {currentClub.founder?.username || "Unknown"}
                    </p>
                    {/* Display image if available, otherwise show placeholder */}
                    <div className="mb-4">
                        {currentClub.img ? (
                            <img
                                src={currentClub.img}
                                alt={currentClub.name}
                                className="w-full h-48 object-cover rounded-lg"
                            />
                        ) : (
                            <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-lg">
                                <span className="text-gray-500">No Image Available</span>
                            </div>
                        )}
                    </div>
                    <p className="font-semibold text-lg">Members: {currentClub.memberCount || 0}</p>
                </div>
            ) : (
                // If there is an error, display the error message
                <div className="text-red-500 font-semibold text-center">{currentClub.error}</div>
            )}
        </div>
    );
};

export default ClubCard;
