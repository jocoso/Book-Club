const ClubCard = ({ club }) => {
    // Default club object if none is provided
    const defaultClub = {
        error: "Club couldn't be displayed",
    };

    // Fallback to default club if club prop is not provided
    const currentClub = club || defaultClub;

    return (
        <div>
            {/* If there is no error, display club information */}
            {!currentClub.error ? (
                <div>
                    <h1>{currentClub.name}</h1>
                    <p>{currentClub.description}</p>
                    <p>Created by: {currentClub.founder?.username}</p>
                    <div>{currentClub.img || "Default Image"}</div>
                    <p>Members: {currentClub.memberCount}</p>
                </div>
            ) : (
                // If there is an error, display the error message
                <div>{currentClub.error}</div>
            )}
        </div>
    );
};

export default ClubCard;
