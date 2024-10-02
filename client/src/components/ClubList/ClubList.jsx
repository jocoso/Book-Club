import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import ClubCard from "../ClubCard/ClubCard.jsx";
import { GET_ALL_CLUBS } from "../../utils/queries";

const ClubList = () => {
    // Apollo Client's useQuery hook for fetching club data
    const { loading, error, data } = useQuery(GET_ALL_CLUBS);

    if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>; // Centered loading state
    if (error) return <div className="text-red-500 flex justify-center items-center h-screen">Error: {error.message}</div>; // Centered error state

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {/* Map through the clubs and pass the club data to ClubCard */}
                {data?.clubs?.map((club) => (
                    <Link key={club._id} to={`/communities/${club._id}`} className="transform hover:scale-105 transition-transform duration-300">
                        <ClubCard club={club} />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ClubList;
