import React, { useContext, useEffect } from 'react'
import logo from './notes.png'
import "./About.css"
const About = () => {
    return (
        <>
            <div>
                <section class="about">
                    <h1>About Us</h1>
                    <p>
                        GeeksforGeeks is a leading platform...
                    </p>
                    <div class="about-info">
                        <div class="about-img">
                        <img src={logo} alt="Logo" />
                        </div>
                        <div>
                            <p> Note taking is one of those universal but intensely personal things. Everyone has a note-taking method of some kind, whether it's as simple as writing down a grocery list or phone number or as systematic as typing up detailed book summaries or meeting minutes. For some people, notes are just text—maybe with a few headings and bullets; for others, they're essentially scrapbooks with elaborate doodles and images. But however you take notes, there's an app out there that can handle all your weird quirks, obscure preferences, and note-taking needs. You just might need to look for it.

                                But first, the big caveat. You can write notes anywhere: on the back of a napkin, envelope, important bill, or even in a notebook. It's kind of similar with apps: you can stick notes into pretty much any old app, even if it's not really designed for them. Example: Google Docs isn't a great notes app, but I have notes about this article you're reading now in the Google Doc I'm working from.

                                Turn ideas into action
                                Automate your note-taking
                                So for this list, I didn't look at every app that could be used to take notes, every app I've personally used to take notes, or even every business collaboration tool that claimed it was a notes app—I was only interested in apps that were explicitly designed to be notes apps. I also only really considered general-purpose personal note-taking apps.
                            </p>
                            <button className='aboutbutton'>Read More...</button>
                        </div>
                    </div>
                </section>
                <section class="team">
                    <h1>Meet Our Team</h1>
                    <div class="team-cards">

                        {/* <!-- Cards here -->
            <!-- Card 1 --> */}

                        <div class="card">
                            <div class="card-img">

                            </div>
                            <div class="card-info">
                                <h2 class="card-name">Jane</h2>
                                <p class="card-role">CEO and Founder</p>
                                <p class="card-email">jane@example.com</p>
                                <p><button class="aboutbutton">Contact</button></p>
                            </div>
                        </div>

                        {/* <!-- Card 2 --> */}

                        <div class="card">
                            <div class="card-img">
                            </div>
                            <div class="card-info">
                                <h2 class="card-name">Miller</h2>
                                <p class="card-role">Co-Founder</p>
                                <p class="card-email">Miller@example.com</p>
                                <p><button class="aboutbutton">Contact</button></p>
                            </div>
                        </div>

                        {/* <!-- Card 3 --> */}

                        <div class="card">
                            <div class="card-img">

                            </div>
                            <div class="card-info">
                                <h2 class="card-name">Joe</h2>
                                <p class="card-role">Co-Founder</p>
                                <p class="card-email">Joe@example.com</p>
                                <p><button class="aboutbutton">Contact</button></p>
                            </div>
                        </div>
                    </div>
                </section>
                <footer>
                    <p>&copy; 2023 GeeksforGeeks. All Rights Reserved.</p>
                </footer>
            </div>
        </>
    )
}

export default About