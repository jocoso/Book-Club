// src/components/User/UserComponent.jsx
import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_CLUBS } from "../../utils/queries/clubQueries";
import ClubCard from "../ClubCard";

const ClubList = () => {
    // Fetch all users using the GET_ALL_USERS query
    const { loading, error, data } = useQuery(GET_ALL_CLUBS);

    if (loading) return <p>Loading...</p>; // Display while loading data
    if (error) return <p>Error: {error.message}</p>; // Display on error

    return (
        <div>
            <ul>
                {/* Map through the users and display each one */}
                {data.clubs.map((club) => {
                    return (
                        <li key={club._id}>
                            <a href="/community">
                                <ClubCard club={club} />
                            </a>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default ClubList;
