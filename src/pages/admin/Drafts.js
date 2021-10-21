import AdminHeader from "../../components/AdminHeader";
import Thumbnail from "../../components/Thumbnail";
import Footer from "../../components/Footer";
import { useHistory } from 'react-router-dom';
import '../../css/pages/admin/Drafts.css'

const Drafts = function () {
    const history = useHistory();
    const goToDraft = () => {
        history.push('/admin/update')
    };
    return (
        <>
            <AdminHeader />
            <div className='wrapper'>
                <div className='drafts-header'>
                    <h1>Posts currently in drafts</h1>
                </div>
                <Thumbnail goToFunction={goToDraft} />
                <Thumbnail goToFunction={goToDraft} />
                <Thumbnail goToFunction={goToDraft} />
                <Thumbnail goToFunction={goToDraft} />
            </div>
            <Footer />
        </>
    );
}

export default Drafts;