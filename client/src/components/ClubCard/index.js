// Untested
const ClubCard = ({club}) => {

    // Not a club? not a problem
    club = club?club:{error: "Club couldn't be displayed"}

    return (
        <>
            {!club.error ? (
                <div>
                    {/* Display club information */}
                    <h1>{club.name}</h1>
                    <p>{club.description}</p>
                    <p>Created by: {club.founder.username}</p>
                    <div>
                        {club?.img || "Default Image" }
                    </div>
                    <p>Members: {club.memberCount}</p>
                </div>
            ): (   // An error occurred 
                <div>
                    {/* Display error */}
                    {club.error}
                </div>
            )}
        </>
    );
};

export default ClubCard;
