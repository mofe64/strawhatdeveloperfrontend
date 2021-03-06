import '../css/components/Project.css';

const Project = () => {
    return (
        <div className='project-thumbnail'>
            <div className='project-title'>
                <h2>Project title</h2>
            </div>
            <div className='project-desc'>
                <p> It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. </p>
            </div>
            <div className='project-link'>
                <a href='https://www.google.com'>Check it out here</a>
            </div>
        </div>
    );
};

export default Project;