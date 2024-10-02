import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_POST } from "../../utils/mutations";

const AddPostForm = ({ clubId, authorId, onPostCreated }) => {
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        blob: 0,
        media: [],
    });

    const [addPost, { loading, error }] = useMutation(ADD_POST, {
        onCompleted: () => {
            // Call the callback function after the post is successfully created
            if (onPostCreated) {
                onPostCreated();
            }
        },
    });

    // Handle form input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("clubId:", clubId, "authorId:", authorId); // Debugging line

        try {
            await addPost({
                variables: {
                    title: formData.title,
                    content: formData.content,
                    club: clubId, // Ensure clubId is passed correctly
                    author: authorId, // Ensure authorId is passed correctly
                    media: formData.media.length
                        ? formData.media.split(",")
                        : [],
                    blob: parseInt(formData.blob, 10),
                },
            });
        } catch (err) {
            console.error("Error adding post:", err);
        }
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Create a New Post</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label
                        htmlFor="title"
                        className="block text-lg font-semibold mb-2"
                    >
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-md"
                        placeholder="Enter post title"
                    />
                </div>

                <div>
                    <label
                        htmlFor="content"
                        className="block text-lg font-semibold mb-2"
                    >
                        Content
                    </label>
                    <textarea
                        id="content"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-md"
                        placeholder="Enter post content"
                    />
                </div>

                <div>
                    <label
                        htmlFor="media"
                        className="block text-lg font-semibold mb-2"
                    >
                        Media (comma-separated URLs)
                    </label>
                    <input
                        type="text"
                        id="media"
                        name="media"
                        value={formData.media}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md"
                        placeholder="Enter media URLs separated by commas"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                    disabled={loading}
                >
                    {loading ? "Submitting..." : "Create Post"}
                </button>

                {error && (
                    <p className="text-red-500 mt-2">Error: {error.message}</p>
                )}
            </form>
        </div>
    );
};

export default AddPostForm;
