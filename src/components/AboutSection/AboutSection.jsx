import React from 'react';
import './AboutSection.css';

// IMPORTING THE IMAGES
import admissionPortal1Img from '../../assets/admission_portal_1.png';
import admissionPortal2Img from '../../assets/admission_portal_2.png';
import admissionPortal3Img from '../../assets/admission_portal_3.png';

const AboutSection = ({
                          subheading = "OUR STORY",
                          heading = "ABOUT EDUCONNECT",
                          description,
                          statValue = "30,000+",
                          statDescription = "A single place where schools, parents, teachers, and vendors can find each other and get things done with less confusion.",
                          statIcon = "📈"
                      }) => {
    // Default description if none is passed
    const defaultDescription = "EduConnect was built around a simple idea: schools, parents, teachers, and vendors should be able to find each other without the usual maze of visits, calls, and guesswork. The platform brings everything into one space — school admissions, teaching jobs, vendor services, and communication — so each part of the education cycle moves with a little more clarity. It isn’t trying to replace anyone’s work… just smooth the edges. Whether a parent needs nearby schools, a teacher wants openings that match their skills, a vendor hopes to connect with institutions, or a school needs an easier way to manage all of this, EduConnect gives them one shared place to start.";

    return (
        <section id="about" className="about-section">
            <div className="about-container">
                {/* Left Column: Visuals and Social Proof */}
                <div className="about-visuals">

                    {/* Visual Card 1: Main (admission_portal_2.png) */}
                    <div className="visual-card visual-card-main visual-card-1">
                        <img
                            src={admissionPortal2Img}
                            alt="Admissions Reports and Analytics Dashboard"
                            className="about-image main"
                        />
                    </div>

                    {/* Visual Card 2: Side-Top (admission_portal_1.png) */}
                    <div className="visual-card visual-card-side visual-card-2">
                        <img
                            src={admissionPortal1Img}
                            alt="Student Application Journey Map or Process Flow"
                            className="about-image side-top"
                        />
                    </div>

                    {/* Visual Card 3: Side-Bottom (admission_portal_3.png) */}
                    <div className="visual-card visual-card-bottom visual-card-3">
                        <img
                            src={admissionPortal3Img}
                            alt="Counselor and Student Communication Interface"
                            className="about-image side-bottom"
                        />
                    </div>
                </div>

                {/* Right Column: Stats, Text, and CTA */}
                <div className="about-content">
                    {/* Stat Card */}
                    <div className="about-stat-card">
                        <div className="stat-value">{statValue}</div>
                        <div className="stat-description">
                            <p>{statDescription}</p>
                            <span className="stat-chart-icon">{statIcon}</span>
                        </div>
                    </div>

                    <h3 className="about-subheading">{subheading}</h3>
                    <h2 className="about-heading">{heading}</h2>

                    {/* Description Text */}
                    <p className="about-description">
                        {description || defaultDescription}
                    </p>

                    <button className="btn about-cta-button">EXPLORE MORE</button>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;