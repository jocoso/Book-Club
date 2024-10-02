import { useParams, useNavigate } from "react-router-dom";
import PostForm from "../components/PostForm"; // Assuming AddPostForm is in the components folder

const CreatePostPage = () => {
    const { _id } = useParams(); // Get the club ID from the URL
    const navigate = useNavigate(); // Use navigate to redirect after post creation

    const handlePostCreated = () => {
        // Redirect to the club page after the post is successfully created
        navigate(`/communities/${_id}`);
    };

    return (
        <div className="container mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-6">Create a New Post</h1>
            {/* Pass the clubId and authorId to AddPostForm */}
            <PostForm
                clubId={_id}
                authorId="64dfb9206a9f5c0012c90c01"
                onPostCreated={handlePostCreated}
            />
        </div>
    );
};

export default CreatePostPage;
