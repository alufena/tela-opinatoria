import { BrowserRouter as Router, Route } from 'react-router-dom';
import { FeedbackProvider } from './context/FeedbackContext';
import AboutIconLink from './components/AboutIconLink';
import AboutPage from './pages/AboutPage';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';
import FeedbackStats from './components/FeedbackStats';
import Header from './components/Header';

function App() {
    return (
        <FeedbackProvider>
            <Router>
                <Header />
                <div className="container">
                    <Route exact path="/">
                        <FeedbackForm />
                        {<FeedbackStats />}
                        {<FeedbackList />}
                    </Route>
                    <Route path="/about" component={AboutPage} />
                    <AboutIconLink text="Sobre min" />
                </div>
            </Router>
        </FeedbackProvider>
    );
}

export default App;
