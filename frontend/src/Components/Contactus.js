import React from 'react'
import { Form } from 'react-router-dom'
import './Contactus.css';

export const Contactus = () => {
    return (
        <>
            <section class="banner">
                <h1>Get in Touch With Us</h1>
                <p>
                    We're here to answer any questions you may have.
                </p>
            </section>
            <section class="contact-form">
                <div class="form-container">
                    <h2>Your Details</h2>
                    <form action="#" method="POST">
                        <label for="name">Name: </label>
                        <input type="text" id="name" name="name" required />
                    </form>
                    <label for="email">Email: </label>
                    <input type="email" id="email" name="email" required />

                    <label for="phone">Phone: </label>
                    <input type="tel" id="phone" name="phone" />

                    <label for="message">Message: </label>
                    <textarea id="message" name="message" rows="4" required></textarea>

                    <button type="submit" class="submit-button">Submit</button>
                </div>
            </section>
        </>
    )
}
