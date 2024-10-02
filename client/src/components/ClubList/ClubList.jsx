import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import ClubCard from "./ClubCard"; // Assuming ClubCard is in the same folder
import { GET_ALL_CLUBS } from "../utils/queries/clubQueries";

const ClubList = () => {
    // Apollo Client's useQuery hook for fetching club data
    const { loading, error, data } = useQuery(GET_ALL_CLUBS);

    if (loading) return <div>Loading...</div>; // Show loading state
    if (error) return <div>Error: {error.message}</div>; // Show error state

    return (
        <ul>
            {/* Check if data and data.clubs exist before mapping */}
            {data?.clubs?.map((club) => (
                <li key={club._id}>
                    <Link to="/community">
                        <ClubCard club={club} />
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default ClubList;
