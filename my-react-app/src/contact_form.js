import React, { useState } from 'react';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function ContactForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [city, setCity] = useState('');
    const [message, setMessage] = useState('');
    const [formStatus, setFormStatus] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = {
            name: name,
            email: email,
            contact: contact,
            city: city,
            message: message
        };

        const response = await fetch("http://localhost:4001/submit-contact", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            setFormStatus('Form submitted successfully!');
            setName('');
            setEmail('');
            setContact('');
            setCity('');
            setMessage('');
        } else {
            setFormStatus('Failed to submit the form.');
        }
    }

    return (
        <div className="contact-page">
            <div className="banner">
                <img src="Images/cake-2.jpg" className="img-fluid" alt="Delicious cake" />
            </div>
            <div className="contact-form-container container-fluid pt-5 pb-5">
                <h1 className="text-center font-weight-bold pb-1 text-pink">Contact Us</h1>
                <h4 className="text-center font-weight-light mb-5">Feel Free to Contact Us</h4>
                <div className="row justify-content-center">
                    <div className="col-lg-8 col-md-10 col-sm-12 col-12">
                        <form onSubmit={handleSubmit} className="p-4 bg-light rounded shadow">
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputName4">Name</label>
                                    <input type="text" name="Name" className="form-control" id="inputName4" placeholder="Enter Your Name" value={name} onChange={(e) => setName(e.target.value)} required />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail4">Email</label>
                                    <input type="email" name="Email" className="form-control" id="inputEmail4" placeholder="Enter Your Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputContact4">Contact</label>
                                    <input type="tel" name="Contact" className="form-control" id="inputContact4" placeholder="Enter Your Contact No." value={contact} onChange={(e) => setContact(e.target.value)} required />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputCity4">City</label>
                                    <input type="text" name="City" className="form-control" id="inputCity4" placeholder="Enter Your City" value={city} onChange={(e) => setCity(e.target.value)} required />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputMessage">Message</label>
                                <textarea name="Message" className="form-control" id="inputMessage" placeholder="Enter your message here" value={message} onChange={(e) => setMessage(e.target.value)} rows="4" required></textarea>
                            </div>
                            <button type="submit" className="shop-now-btn btn-block">Send Message</button>
                        </form>
                        {formStatus && <p className="form-status text-center mt-3">{formStatus}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactForm;
