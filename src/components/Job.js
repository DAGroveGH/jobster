import { FaBriefcase, FaCalendarAlt, FaLocationArrow } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Job';
import { useDispatch } from 'react-redux';
import JobInfo from './JobInfo';
import moment from 'moment/moment';

const Job = ({
    _id,
    position,
    company,
    jobLocation,
    jobType,
    createdAt,
    status,
}) => {
    const dispatch = useDispatch();
    const date = moment(createdAt).format('MMM do, YYYY');

    return (
        <Wrapper>
            <header>
                <div className="main-icon">{company.charAt(0)}</div>
                <div className="info">
                    <h5>{position}</h5>
                    <p>{company}</p>
                </div>
            </header>
            <div className="content">
                <div className="content-center">
                    <JobInfo
                        icon={<FaLocationArrow />}
                        text={jobLocation}
                    ></JobInfo>
                    <JobInfo icon={<FaCalendarAlt />} text={date}></JobInfo>
                    <JobInfo icon={<FaBriefcase />} text={jobType}></JobInfo>

                    <div className={`status ${status}`}>{status}</div>
                </div>
                <footer>
                    <div className="actions">
                        <Link
                            to="/add-job"
                            onClick={() => console.log('edit')}
                            className="btn edit-btn"
                        >
                            Edit
                        </Link>
                        <button
                            type="button"
                            onClick={() => console.log('delete')}
                            className="btn delete-btn"
                        >
                            delete
                        </button>
                    </div>
                </footer>
            </div>
        </Wrapper>
    );
};

export default Job;
