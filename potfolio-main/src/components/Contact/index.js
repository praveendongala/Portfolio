import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Snackbar } from '@mui/material';
import axios from 'axios';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  @media (max-width: 960px) {
    padding: 0px;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1350px;
  padding: 0px 0px 80px 0px;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const Title = styled.div`
  font-size: 42px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 16px;
  }
`;

const ContactForm = styled.form`
  width: 95%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.card};
  padding: 32px;
  border-radius: 16px;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  margin-top: 28px;
  gap: 12px;
`;

const ContactTitle = styled.div`
  font-size: 24px;
  margin-bottom: 6px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const ContactInput = styled.input`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactInputMessage = styled.textarea`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactButton = styled.input`
  width: 100%;
  text-decoration: none;
  text-align: center;
  background: linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 100%);
  padding: 13px 16px;
  margin-top: 2px;
  border-radius: 12px;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 18px;
  font-weight: 600;
`;

const Contact = () => {
  const form = useRef();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    from_email: '',
    from_name: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({
    from_email: '',
    from_name: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform validation
    if (validate()) {
      const data = {
        from_email: formData.from_email,
        from_name: formData.from_name,
        subject: formData.subject,
        message: formData.message,
      };
      
      axios.post('https://portfolio-seven-flax-76.vercel.app/send', data)
        .then((response) => {
          setOpen(true);
          form.current.reset();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const validate = () => {
    const newErrors = {};

    // Email validation
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!formData.from_email) {
      newErrors.from_email = 'Email is required.';
    } else if (!emailRegex.test(formData.from_email)) {
      newErrors.from_email = 'Please enter a valid email address.';
    }

    // Name validation
    if (!formData.from_name) {
      newErrors.from_name = 'Name is required.';
    }

    // Subject validation
    if (!formData.subject) {
      newErrors.subject = 'Subject is required.';
    }

    // Message validation
    if (!formData.message) {
      newErrors.message = 'Message is required.';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container>
      <Wrapper>
        <Title>Contact</Title>
        <Desc>Feel free to reach out to me for any questions or opportunities!</Desc>
        <ContactForm ref={form} onSubmit={handleSubmit}>
          <ContactTitle>Email Me 🚀</ContactTitle>
          
          <ContactInput
            placeholder="Your Email"
            name="from_email"
            value={formData.from_email}
            onChange={handleChange}
          />
          {errors.from_email && <div style={{ color: 'red' }}>{errors.from_email}</div>}
          
          <ContactInput
            placeholder="Your Name"
            name="from_name"
            value={formData.from_name}
            onChange={handleChange}
          />
          {errors.from_name && <div style={{ color: 'red' }}>{errors.from_name}</div>}

          <ContactInput
            placeholder="Subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
          />
          {errors.subject && <div style={{ color: 'red' }}>{errors.subject}</div>}

          <ContactInputMessage
            placeholder="Message"
            rows="4"
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
          {errors.message && <div style={{ color: 'red' }}>{errors.message}</div>}

          <ContactButton type="submit" value="Send" />
        </ContactForm>

        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={() => setOpen(false)}
          message="Email sent successfully!"
          severity="success"
        />
      </Wrapper>
    </Container>
  );
};

export default Contact;
