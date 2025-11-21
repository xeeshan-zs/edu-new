import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { GoArrowUpRight } from 'react-icons/go';
import { useNavigate } from 'react-router-dom'; // <--- 1. NEW IMPORT
import './CardNav.css';

const CardNav = ({
                     logo,
                     logoAlt = 'Logo',
                     items,
                     className = '',
                     ease = 'power3.out',
                     baseColor = '#1e293b',
                     menuColor,
                     buttonBgColor = '#66a1be',
                     buttonTextColor = '#ffffff',
                     platformName = 'EduConnect'
                 }) => {
    const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const navRef = useRef(null);
    const cardsRef = useRef([]);
    const tlRef = useRef(null);
    const navigate = useNavigate(); // <--- 2. INITIALIZE HOOK

    // Calculates the required height for the expanded navigation bar,
    // crucial for handling auto-calculated scroll height on mobile.
    const calculateHeight = () => {
        const navEl = navRef.current;
        if (!navEl) return 300;

        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        if (isMobile) {
            const contentEl = navEl.querySelector('.card-nav-content');
            if (contentEl) {
                // Save original styles to revert after measurement
                const wasPosition = contentEl.style.position;
                const wasHeight = contentEl.style.height;

                // Temporarily make content static to measure scroll height
                contentEl.style.position = 'static';
                contentEl.style.height = 'auto';

                const topBar = 70;
                const padding = 20;
                const contentHeight = contentEl.scrollHeight;

                // Revert styles
                contentEl.style.position = wasPosition;
                contentEl.style.height = wasHeight;

                return topBar + contentHeight + padding;
            }
        }
        // Desktop height (fixed)
        return 300;
    };

    // Creates the GSAP timeline for the expansion/collapse animation
    const createTimeline = () => {
        const navEl = navRef.current;
        if (!navEl) return null;

        gsap.set(navEl, { height: 70, overflow: 'hidden' });
        gsap.set(cardsRef.current, { y: 50, opacity: 0 });

        const tl = gsap.timeline({ paused: true });

        // Step 1: Animate height expansion
        tl.to(navEl, {
            height: calculateHeight,
            duration: 0.4,
            ease
        });

        // Step 2: Animate cards fading up and in
        tl.to(cardsRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease,
            stagger: 0.06
        }, '-=0.1');

        return tl;
    };

    useLayoutEffect(() => {
        const tl = createTimeline();
        tlRef.current = tl;

        return () => {
            tl?.kill();
            tlRef.current = null;
        };
    }, [ease, items]);

    // Handles resizing while the menu is open to recalculate the height
    useLayoutEffect(() => {
        const handleResize = () => {
            if (!tlRef.current) return;

            if (isExpanded) {
                const newHeight = calculateHeight();
                // Directly set the height if expanded to handle fluid resizing
                gsap.set(navRef.current, { height: newHeight });

                // Recreate the timeline to update its height logic
                tlRef.current.kill();
                const newTl = createTimeline();
                if (newTl) {
                    newTl.progress(1); // Jump to the end state
                    tlRef.current = newTl;
                }
            } else {
                // If collapsed, just ensure the timeline is recreated for the next open
                tlRef.current.kill();
                const newTl = createTimeline();
                if (newTl) {
                    tlRef.current = newTl;
                }
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isExpanded]);

    const toggleMenu = () => {
        const tl = tlRef.current;
        if (!tl) return;
        if (!isExpanded) {
            setIsHamburgerOpen(true);
            setIsExpanded(true);
            tl.play(0);
        } else {
            setIsHamburgerOpen(false);
            // Set callback to flip isExpanded *after* the animation finishes reversing
            tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
            tl.reverse();
        }
    };

    const setCardRef = i => el => {
        if (el) cardsRef.current[i] = el;
    };

    return (
        <div className={`card-nav-container ${className}`}>
            <nav
                ref={navRef}
                className={`card-nav ${isExpanded ? 'open' : ''}`}
                style={{ backgroundColor: baseColor }}
            >
                <div className="card-nav-top">
                    <div
                        className={`hamburger-menu ${isHamburgerOpen ? 'open' : ''}`}
                        onClick={toggleMenu}
                        role="button"
                        aria-label={isExpanded ? 'Close menu' : 'Open menu'}
                        tabIndex={0}
                        style={{ color: menuColor }}
                    >
                        <div className="hamburger-line" />
                        <div className="hamburger-line" />
                    </div>

                    <div className="logo-container">
                        <img src={logo} alt={logoAlt} className="logo" />
                        <span className="platform-name">{platformName}</span>
                    </div>

                    <button
                        type="button"
                        className="card-nav-cta-button"
                        style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
                        onClick={() => navigate('/login')} // <--- 3. CTA BUTTON HANDLER
                    >
                        Get Started
                    </button>
                </div>

                <div className="card-nav-content" aria-hidden={!isExpanded}>
                    {(items || []).map((item, idx) => (
                        <div
                            key={`${item.label}-${idx}`}
                            className="nav-card"
                            ref={setCardRef(idx)}
                            style={{
                                backgroundColor: item.bgColor,
                                color: item.textColor
                            }}
                        >
                            <div className="nav-card-label">{item.label}</div>
                            <div className="nav-card-links">
                                {item.links?.map((lnk, i) => (
                                    <a
                                        key={`${lnk.label}-${i}`}
                                        className="nav-card-link"
                                        href={lnk.href}
                                        aria-label={lnk.ariaLabel}
                                        onClick={lnk.onClick} // <--- 4. DROPDOWN LINK HANDLER
                                    >
                                        <GoArrowUpRight className="nav-card-link-icon" aria-hidden="true" />
                                        {lnk.label}
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </nav>
        </div>
    );
};

export default CardNav;