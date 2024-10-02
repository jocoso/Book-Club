import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

import { GET_CLUB_BY_ID } from "../utils/queries";

const ClubPage = () => {
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_CLUB_BY_ID, {
        variables: { _id: id },
    });

    if (loading) return <div>Loading...</div>; // Show loading state
    if (error) return <div>Error: {error.message}</div>; // Show error state

    const club = data?.club;

    return (
        <div>
            <Link to="/communities">Back</Link>
            <h1>Club {id}</h1>
            <p>These are some of our communities</p>
        </div>
    );
};

export default ClubPage;
