const ClubCard = ({ club }) => {
    // Default club object if none is provided
    const defaultClub = {
        error: "Club couldn't be displayed",
    };

    // Fallback to default club if club prop is not provided
    const currentClub = club || defaultClub;

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden p-6 max-w-full">
            {/* If there is no error, display club information */}
            {!currentClub.error ? (
                <div>
                    <h1 className="text-2xl font-bold mb-3 text-center">{currentClub.name}</h1>
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
                    <p className="text-gray-600 text-sm text-center mb-4">
                        Created by: {currentClub.founder?.username || "Unknown"}
                    </p>
                    <p className="text-gray-700 mb-4 text-center">{currentClub.description}</p>
                    <p className="font-semibold text-lg text-center">Members: {currentClub.memberCount || 0}</p>
                </div>
            ) : (
                // If there is an error, display the error message
                <div className="text-red-500 font-semibold text-center">{currentClub.error}</div>
            )}
        </div>
    );
};

export default ClubCard;
