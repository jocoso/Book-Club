import ClubList from "../components/ClubList/ClubList.jsx";

const CommunityPage = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center mb-6">Communities</h1>
            <p className="text-lg text-gray-700 text-center mb-8">
                Explore some of our amazing communities!
            </p>
            <div className="bg-white shadow-md rounded-lg p-6">
                <ClubList />
            </div>
        </div>
    );
};

export default CommunityPage;
