// src/components/EmailService.tsx
"use client";

export const sendEmail = async (formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  try {
    // Using EmailJS or a backend API endpoint
    // Option 1: Using a simple API route (we'll create this next)
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        to: formData.email, // Send confirmation to user
        from: 'thomasjj4u@gmail.com',
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }

    return await response.json();
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
};