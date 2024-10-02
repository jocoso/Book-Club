import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

import { GET_CLUB_BY_ID, GET_ALL_POSTS_OF_A_CLUB } from '../utils/queries';

const ClubPage = () => {
    const { _id } = useParams();
    const navigate = useNavigate(); // Hook for navigating between routes

    // Fetch the club data
    const { loading: clubLoading, error: clubError, data: clubData } = useQuery(GET_CLUB_BY_ID, {
        variables: { _id },
    });

    // Fetch the posts for the club
    const { loading: postsLoading, error: postsError, data: postsData } = useQuery(GET_ALL_POSTS_OF_A_CLUB, {
        variables: { clubId: _id },
    });

    if (clubLoading || postsLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>; // Centered loading state
    if (clubError) return <div className="text-red-500 text-center mt-10">Error: {clubError.message}</div>; // Club error state
    if (postsError) return <div className="text-red-500 text-center mt-10">Error: {postsError.message}</div>; // Posts error state

    const club = clubData?.club;
    const posts = postsData?.getAllPostsOfAClub || [];

    // Handler for navigating to the "Create Post" page
    const handleCreatePost = () => {
        navigate(`/communities/${_id}/create-post`);
    };

    return (
        <div className="container mx-auto px-4 py-10">
            {/* Back Link */}
            <Link to="/communities" className="text-indigo-600 hover:underline mb-6 block">Back to Communities</Link>

            {/* Club Information */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-10">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">{club.name}</h1>
                <p className="text-gray-700 mb-6">{club.description}</p>
                <p className="text-sm text-gray-600 mb-6">Created by: {club.founder.username}</p>
                <p className="font-semibold text-lg mb-4">Members: {club.memberCount}</p>

                {/* Post List */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Posts</h2>
                    <ul className="space-y-4">
                        {posts.length > 0 ? (
                            posts.map((post) => (
                                <li key={post._id} className="bg-gray-100 rounded-lg p-4 shadow-sm">
                                    <h3 className="font-bold text-lg">{post.title}</h3>
                                    <p className="text-gray-700">{post.content}</p>
                                    <p className="text-sm text-gray-500">Posted by {post.author.username}</p>
                                    <p className="text-sm text-gray-500">Created at: {new Date(post.createdAt).toLocaleString()}</p>
                                </li>
                            ))
                        ) : (
                            <div>No Posts to Show</div>
                        )}
                    </ul>
                </div>

                {/* Create a Post Button */}
                <button
                    onClick={handleCreatePost}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                    Create a Post
                </button>
            </div>
        </div>
    );
};

export default ClubPage;
