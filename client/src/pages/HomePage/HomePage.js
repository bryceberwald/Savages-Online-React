import React from 'react';
import { Link } from 'react-router-dom'; 
import './HomePage.css';

function HomePage() {
  return (
    <div className="HomePageContainer">
      <header className="Header">
        <h1 className="Title">Savages Online</h1>
        <p className="Subtitle">Embark on a Legendary Journey</p>
      </header>
      <main className="MainContent">
        <section className="GameDescription">
          <h2 className="DescriptionTitle">Welcome to the World of Savages Online</h2>
          <p className="DescriptionText">
            Immerse yourself in the breathtaking world of Savages Online. Explore vast and 
            diverse landscapes, encounter mysterious creatures, and embark on epic quests 
            with players from around the globe.
          </p>
          <p className="DescriptionText">
            Customize your character, hone your skills, and become a legendary warrior in 
            this action-packed online adventure. Whether you seek fame, fortune, or glory, 
            the journey begins here.
          </p>
        </section>
        <section className="CTASection"><br />
        <Link to="/auth" className="PlayButton">Play Now</Link>
        </section>
      </main>
      <footer className="Footer">
        <p className="FooterText">&copy; 2023 Savages Online</p>
      </footer>
    </div>
  );
}

export default HomePage;