import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

import { GET_CLUB_BY_ID } from "../utils/queries";

const ClubPage = () => {
    const { _id } = useParams();
    const { loading, error, data } = useQuery(GET_CLUB_BY_ID, {
        variables: { _id },
    });

    if (loading) return <div>Loading...</div>; // Show loading state
    if (error) return <div>Error: {error.message}</div>; // Show error state

    const club = data?.club;

    return (
        <div>
            <Link to="/communities">Back</Link>
            <h1>{club.name}</h1>
            <p>{club.description}</p>
            <p>Created by: {club.founder.username}</p>
            {club.posts&&club.posts.map((post) => {
                return(<li key={post._id}>
                    {post.title}
                    {post.content}
                </li>);
            })}
            <p>Members: {club.memberCount}</p>
            <button>
                Create a Post
            </button>
        </div>
    );
};

export default ClubPage;
