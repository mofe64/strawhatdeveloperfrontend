import AdminHeader from "../../components/AdminHeader";
import Thumbnail from "../../components/Thumbnail";
import Footer from "../../components/Footer";
import { useHistory } from 'react-router-dom';

const AllPosts = function () {
    const history = useHistory();
    const goToEdit = () => {
        history.push('/admin/update')
    };
    return (
        <>
            <AdminHeader />
            <div className='wrapper'>
                <div className='drafts-header'>
                    <h1>Latest Posts</h1>
                </div>
                <Thumbnail goToFunction={goToEdit} />
                <Thumbnail goToFunction={goToEdit} />
                <Thumbnail goToFunction={goToEdit} />
                <Thumbnail goToFunction={goToEdit} />
            </div>
            <Footer />
        </>
    );
}

export default AllPosts;