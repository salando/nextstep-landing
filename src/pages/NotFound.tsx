import { Link } from 'react-router-dom';
import { Section } from '../components/UI/Section';
import './NotFound.css';

export const NotFound = () => {
    return (
        <div className="page-content">
            <Section>
                <div className="not-found-container">
                    <h1 className="error-code">404</h1>
                    <h2 className="error-message">Page Not Found</h2>
                    <p className="error-desc">
                        The page you are looking for does not exist or has been moved.
                    </p>
                    <Link to="/" className="home-button">
                        Back to Home
                    </Link>
                </div>
            </Section>
        </div>
    );
};
